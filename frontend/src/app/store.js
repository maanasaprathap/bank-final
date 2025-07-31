import { configureStore } from "@reduxjs/toolkit";
import accountReducers from "../features/accounts/accountSlice";
import pageReducers from "../features/page/pageSlice";
import cardReducers from "../features/card/cardSlice";
import userReducers from "../features/users/usersSlice";
import transactionsReducers from "../features/transactions/transactionsSlice";

export const store = configureStore(
    {
        reducer: {
            accounts: accountReducers,
            pages: pageReducers,
            cards: cardReducers,
            user: userReducers,
            transactions: transactionsReducers
        },
    }
)
