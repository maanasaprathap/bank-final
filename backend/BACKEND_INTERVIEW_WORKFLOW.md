# Backend Deep-Dive: What Happens, End-to-End

This document explains the backend system flow in practical order (startup → auth → money movement), and highlights interview-worthy points you can discuss.

## 1) Runtime and Stack Overview

- **Framework**: Spring Boot 3.3.2, Java 21, Spring Web, Spring Security, Spring Data JPA.
- **Database**: PostgreSQL (with Hibernate `ddl-auto=update`).
- **Auth**: Stateless JWT auth (custom JWT filter + Spring Security chain).
- **Domain**: Users, multi-currency accounts, cards, and transactions.
- **External dependency**: Currency API rates fetched every 12 hours.

## 2) Startup Workflow (What Happens First)

1. `IobankApplication.main()` boots Spring and component scanning.
2. `AppConfig` wires core beans:
   - `UserDetailsService` from `UserRepository`.
   - `PasswordEncoder` as BCrypt.
   - `AuthenticationProvider` as DAO provider.
   - `AuthenticationManager` from Spring auth config.
   - `RestTemplate` for HTTP calls.
   - `ScheduledExecutorService` (1 thread) for periodic jobs.
3. `SecurityConfig` builds HTTP security:
   - CORS open to `*`.
   - CSRF disabled.
   - `/user/auth` and `/user/register` are public.
   - all other routes require authentication.
   - custom JWT filter is inserted before username/password filter.
   - session policy is stateless.
4. `ExchangeRateScheduleTaskRunnerComponent` runs at startup and schedules rate refresh every 12 hours.

## 3) Authentication and Authorization Flow

### Register (`POST /api/v1/user/register`)

1. `UserController.registerUser()` receives `UserDto`.
2. `UserService.registerUser()` maps DTO → `User`:
   - password encoded with BCrypt.
   - default role list: `USER`.
   - default tag: `io_<username>`.
3. User saved in DB via `UserRepository`.

### Login (`POST /api/v1/user/auth`)

1. `UserController.authenticateUser()` accepts credentials.
2. `UserService.authenticateUser()`:
   - loads user with `UserDetailsService`.
   - authenticates username/password through `AuthenticationManager`.
   - issues JWT through `JwtService.generateToken()`.
3. Controller returns user body and sets `Authorization: Bearer <jwt>` response header.

### Secured Request Handling

1. Client sends `Authorization: Bearer <jwt>`.
2. `JwtAuthenticationFilter`:
   - checks header exists.
   - validates token expiration/signature via `JwtService`.
   - extracts username (subject).
   - loads user and sets authentication in `SecurityContext`.
3. Controller methods can now access authenticated principal via `Authentication`.

## 4) Core Business Workflows

## A) Account Creation (`POST /api/v1/accounts`)

1. Controller reads authenticated `User`.
2. `AccountService.createAccount()` delegates to `AccountHelper.createAccount()`.
3. Helper checks if account type already exists for user.
4. Generates unique 10-digit account number.
5. Creates account with:
   - starter balance = `1000`
   - owner = current user
   - currency code/symbol/label
6. Saves account.

## B) Transfer Between Accounts (`POST /api/v1/accounts/transfer`)

1. Sender account located by sender currency code + sender UID.
2. Receiver account located by recipient account number.
3. `AccountHelper.performTransfer()`:
   - validates sufficient sender funds for `amount * 1.01`.
   - deducts sender by amount + 1% fee.
   - credits receiver by amount.
   - persists both accounts.
   - writes two transactions:
     - sender `WITHDRAW` (fee 1%)
     - receiver `DEPOSIT` (fee 0)
4. Returns sender-side transaction.

## C) Currency Conversion (`POST /api/v1/accounts/convert`)

1. Validates:
   - `fromCurrency != toCurrency`
   - both accounts belong to user
   - amount > 0
   - enough balance
2. Reads in-memory rates from `ExchangeRateService`.
3. Computes:
   - `converted = (toRate / fromRate) * amount`
4. Applies balances:
   - debit source by `amount * 1.01`
   - credit destination by `converted`
5. Saves both accounts and creates two tx records:
   - source `CONVERSION` with 1% fee
   - destination `DEPOSIT` with no fee

## D) Card Issuance and Card Ledger Flow

### Create Card (`POST /api/v1/card/create?amount=...`)

1. Enforces minimum amount >= 2.
2. Requires user to already have USD account.
3. Validates USD funds.
4. Deducts requested amount from USD account.
5. Creates unique 16-digit card number + CVV.
6. Stores card with initial card balance = `amount - 1` (implicit $1 setup charge).
7. Creates transaction records for account/card operations.

### Card Credit (`POST /api/v1/card/credit?amount=...`)

- Debits USD account by amount, credits card balance, writes account/card transactions.

### Card Debit (`POST /api/v1/card/debit?amount=...`)

- Debits card balance by amount, credits USD account, writes account/card transactions.

## E) Transaction Query (`GET /api/v1/transactions...`)

- Uses pagination via `page` query param.
- Page size fixed at 10.
- Sorted by `createdAt` ascending.
- Can query:
  - all user tx
  - by card id
  - by account id

## 5) Data Model Relationships

- `User`:
  - one-to-many accounts
  - one-to-many transactions
  - one-to-one card
  - implements `UserDetails` for Spring Security integration
- `Account`:
  - many-to-one owner
  - one-to-many transactions
- `Card`:
  - one-to-one owner
  - one-to-many transactions
- `Transaction`:
  - many-to-one owner
  - optional many-to-one account
  - optional many-to-one card

## 6) Important Interview Notes (Talk Track)

## Strengths you can highlight

- Clean layering: controller → service → helper/repository.
- Stateless auth with JWT and custom request filter.
- Domain workflows model realistic banking operations (fees, conversion, dual-entry style tx logging).
- Scheduled external integration for exchange rates.
- Pageable transaction retrieval.

## Tradeoffs / Risks you should proactively mention

1. **Security secret management**: JWT secret and fallback currency API key are in app properties; this should move to secure env/secret manager in production.
2. **CORS policy**: currently wildcard origin/method/header; should be restricted by environment.
3. **Validation gaps**: some card paths don’t re-check negative balances strongly; DTO validation annotations could be added (`@Valid`, `@NotNull`, etc.).
4. **Error handling style**: many `orElseThrow()` and generic exceptions; global exception handler (`@ControllerAdvice`) would improve API consistency.
5. **Monetary precision**: business logic uses `double`; finance-grade systems should use `BigDecimal` + currency-aware rounding rules.
6. **Concurrency & consistency**: balance updates are transactional, but high-contention cases may need optimistic/pessimistic locking and idempotency keys.
7. **Auditability**: transaction model has basic fields; regulated environments require richer audit logs, immutable ledger strategy, and trace IDs.
8. **Ordering semantics**: transaction listing sorted ascending by created date; many UIs prefer descending.

## Good interview storytelling format

When asked "How did your backend process a transfer?" use this concise pattern:

1. Authn/authz context established from JWT.
2. Locate sender + receiver account records.
3. Validate owner and sufficient funds including fee.
4. Update balances atomically in transaction boundary.
5. Persist two transaction records for traceability.
6. Return sender-side transaction payload to caller.

## 7) Quick Endpoint Map (Context Path `/api/v1`)

- Public:
  - `POST /user/register`
  - `POST /user/auth`
- Protected:
  - `GET/POST /accounts`
  - `POST /accounts/transfer`
  - `POST /accounts/convert`
  - `GET /accounts/rates`
  - `POST /accounts/find`
  - `GET /card`
  - `POST /card/create`
  - `POST /card/credit`
  - `POST /card/debit`
  - `GET /transactions`
  - `GET /transactions/c/{cardId}`
  - `GET /transactions/a/{accountId}`

## 8) Suggested Next Improvements (If You’re Asked "What next?")

- Add request DTO validation + uniform error responses.
- Switch money values to `BigDecimal`.
- Add account-level locking/idempotency for transfer/convert endpoints.
- Add OpenAPI/Swagger and integration tests (happy-path + edge cases).
- Externalize all secrets and tighten CORS.
- Add observability: structured logs, request IDs, metrics for rate fetches and transfers.
