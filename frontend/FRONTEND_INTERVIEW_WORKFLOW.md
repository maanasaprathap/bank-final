# Frontend Deep-Dive: Workflow + Technical Notes for Interviews

This document explains how the frontend works end-to-end, and gives practical interview talking points.

## 1) Stack and Runtime Overview

- **Framework/runtime**: React 18 + Create React App.
- **Routing**: `react-router-dom` with `createBrowserRouter` plus nested dashboard routes.
- **State management**: Redux Toolkit (`createSlice`, `createAsyncThunk`) with one centralized store.
- **HTTP layer**: Axios wrapper with environment-based base URL (`REACT_APP_IOBANK_SERVER_API_URL`).
- **UI libs**: Tailwind utility classes + `react-icons`.

## 2) App Bootstrap Workflow

1. `src/index.js` mounts `<App />` in `React.StrictMode`.
2. `App.js` creates top-level routes (`/`, `/login`, `/signup`, `/successful`, `/dashboard/*`).
3. Redux `Provider` wraps router with a store containing slices for:
   - user
   - accounts
   - cards
   - transactions
   - page/UI controls (spinner/navbar)

## 3) Routing and Access Control

### Route model

- `/` → redirect component.
- `/dashboard/*` → protected route wrapper.
- `/login`, `/signup`, `/successful` → public auth pages.

### Protection model

- `ProtectedRoute` checks `sessionStorage.getItem('user')`.
- If user is missing, navigation is redirected to `/login`.
- If present, dashboard is rendered.

### Dashboard subroutes

Dashboard renders nested pages under `/dashboard`:
- home
- accounts
- payments
- transactions
- cards
- settings
- profile
- convert

## 4) Authentication Flow (Frontend Perspective)

### Login flow

1. User enters credentials in `Login`.
2. `authenticateUser` thunk calls `POST /user/auth`.
3. On success:
   - reads `authorization` header from response
   - stores JWT token in `sessionStorage.access_token`
   - stores user object in `sessionStorage.user`
   - sets user slice status to `SUCCESS`
4. UI spinner/state transitions then navigate user to `/dashboard`.

### Registration flow

1. `Register` captures form data.
2. `validateUser` performs client-side validation (required fields, email format, password checks).
3. On valid form, `registerUser` thunk posts to `/user/register`.
4. On success, page navigates to `/successful`.

## 5) Data Fetching and Dashboard Initialization

When `Dashboard` mounts, it immediately dispatches:
- `fetchAccounts()`
- `fetchTransactions(0)`
- `fetchCard()`

This preloads key widgets so Home/Account/Card pages can render without waiting for page-specific fetches.

## 6) API Layer Pattern

- `src/api/api.js` creates one axios instance using:
  - `baseURL` from environment
  - 5-second timeout
  - JSON content type header
- Exposes helper methods (`get/post/put/delete/patch`).
- Each thunk usually builds auth headers from `sessionStorage.access_token` and passes them per request.

## 7) Redux Slice Architecture

## A) `usersSlice`

Responsibilities:
- authentication and registration async thunks
- status lifecycle (`IDLE`, `PENDING`, `SUCCESS`, `FAILED`)
- hydrated initial user from `sessionStorage`

Interview angle:
- separation between auth API effects and UI reactions (`useEffect` on status in pages).

## B) `accountSlice`

Responsibilities:
- fetch/create accounts
- recipient lookup (`/accounts/find`)
- transfer funds
- fetch exchange rates
- currency conversion
- maintain selected recipient + rates + transactional status

Extra UX behavior:
- enriches fetched account objects with country flag image assets by currency code.

## C) `cardSlice`

Responsibilities:
- create card
- credit/debit card
- fetch card
- maintain card transaction list + operation status
- attach visual card image to fetched card payload

## D) `transactionsSlice`

Responsibilities:
- fetch transaction pages
- keep transactions list and status

Note:
- fetched transactions are sorted in client state before rendering.

## E) `pageSlice`

Responsibilities:
- global spinner visibility
- mobile nav open/close toggle
- spinner delay constant

This gives globally shared UI state across many pages/components.

## 8) Feature Workflows (What Happens on User Actions)

## A) Account creation

- Account page opens `NewAccount` modal.
- User selects a currency not already owned.
- `createAccount` thunk posts to `/accounts`.
- UI closes form on success, refreshes account list, resets status.

## B) Transfer/withdraw to another account

- `Withdraw` form gathers:
  - source currency account
  - recipient account number
  - amount
- Recipient account lookup can auto-trigger when account number reaches 10 digits.
- On transfer submit:
  - local balance check prevents obvious overdraft
  - `transferFunds` thunk posts to `/accounts/transfer`
  - accounts refresh + status cleanup + form close.

## C) Currency conversion

- Convert page fetches rates if not loaded.
- User selects source/target currencies and amount.
- UI computes preview conversion value with current rate map.
- Convert button dispatches `/accounts/convert` thunk.
- On success, account balances are refreshed and user is navigated back to dashboard.

## D) Card lifecycle

### Create card
- `CreateCard` requires existing USD account.
- Submits amount via `/card/create?amount=...`.

### Fund card
- `CardFundForm` sends `/card/credit?amount=...`.

### Withdraw from card
- `CardWithdrawForm` sends `/card/debit?amount=...`.

Across card actions:
- spinner + async status drive user feedback and post-action refreshes.

## E) Transactions display

- `Transaction` component consumes `transactions` slice and renders a responsive table.
- Home and Account pages embed this component to keep transaction visibility near balance workflows.

## 9) Technical Aspects to Mention in Interviews

## Strengths

1. **Clear separation of concerns**: API wrapper, slices, pages, and presentational components are separated.
2. **Predictable async model**: `createAsyncThunk` + status-driven UI side effects.
3. **Route protection**: simple auth guard around dashboard routes.
4. **Reusable global UI state**: spinner/navbar state centralized in `pageSlice`.
5. **Modular features**: account/card/transaction domains are isolated in their own slices.

## Tradeoffs / Improvements

1. **Token storage**: storing JWT in `sessionStorage` is simple but still exposed to XSS; hardened production apps often use httpOnly cookies and stronger CSP.
2. **Error model**: many thunks throw generic errors; user-facing error messages can be made more consistent with a dedicated error slice/toast system.
3. **State typing**: plain JS is flexible, but TypeScript would improve safety for DTOs and async payloads.
4. **Validation**: registration has local validation, but transfer/convert/card forms can use a shared schema approach (e.g., Zod/Yup) for consistency.
5. **Derived data side effects**: some `useMemo` paths currently trigger state updates; those should move to `useEffect` to keep memoization pure.
6. **Auth bootstrap**: route guard checks only `sessionStorage.user`; adding token expiry checks would make client auth behavior stricter.
7. **Testing depth**: project scripts are present, but stronger coverage with RTL/integration tests for auth + money movement would improve confidence.

## 10) Interview Storytelling Cheatsheet

If asked “Walk me through the frontend architecture”, a strong answer:

1. App boots with router + Redux provider.
2. Protected dashboard routes are gated via session-based auth check.
3. Dashboard prefetches accounts, transactions, and card state.
4. Feature pages dispatch domain thunks to backend endpoints.
5. Slice statuses (`PENDING/SUCCESS/FAILED`) control spinner, navigation, and feedback.
6. Shared components (nav/header/section containers/forms) keep UI composable.

If asked “How does a transfer happen in the UI?”

1. User opens Withdraw modal from account page.
2. Frontend resolves recipient account before enabling amount input.
3. Performs immediate client guardrails (e.g., amount vs visible balance).
4. Dispatches transfer thunk with auth header.
5. Refreshes accounts and transactions after completion.
6. Closes modal and resets slice/UI status.

## 11) Quick File Map for Discussion

- App shell and routing:
  - `src/index.js`
  - `src/App.js`
  - `src/pages/ProtectedRoute.js`
  - `src/pages/Dashboard.js`
- API + store:
  - `src/api/api.js`
  - `src/app/store.js`
- Feature state:
  - `src/features/users/usersSlice.js`
  - `src/features/accounts/accountSlice.js`
  - `src/features/card/cardSlice.js`
  - `src/features/transactions/transactionsSlice.js`
  - `src/features/page/pageSlice.js`
- Key UI workflows:
  - `src/pages/Login.js`
  - `src/pages/Register.js`
  - `src/pages/dashboard/Account.js`
  - `src/components/account/NewAccount.js`
  - `src/components/account/Withdraw.js`
  - `src/pages/dashboard/Convert.js`
  - `src/pages/dashboard/Card.js`
  - `src/components/card/CreateCard.js`
  - `src/components/card/CardFundForm.js`
  - `src/components/card/CardWithdrawForm.js`
  - `src/pages/dashboard/Transaction.js`
