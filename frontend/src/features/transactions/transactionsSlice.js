import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import api from "../../api/api"


const initialState = {
    transactions: [],
    status:  'IDLE'
}

export const fetchTransactions = createAsyncThunk("transactions/fetch", async (pageNumber) => {
    try {
        const headers = {Authorization: `${sessionStorage.getItem('access_token')}`}
        const { data, error } = await api.get(`/transactions?page=${pageNumber}`, headers)
        console.log(data)
        if (error) throw error
        return data
    } catch (error) {
        throw new Error(error.message);
    }
})

export const transactionSlice = createSlice({
    name: 'transactions',
    initialState,
    reducers: {
        addTransaction: (state, action) => {
            state.transactions.push(action.payload);
            state.status = 'SUCCESS'
        }
    },
    extraReducers(builder) {
        builder
           .addCase(fetchTransactions.pending, (state) => {
                state.status = 'PENDING'
            })
           .addCase(fetchTransactions.fulfilled, (state, action) => {
                state.transactions = action.payload.sort((a, b) => {
                    const dateA = new Date(a.initiated)
                    
                    const dateB = new Date(b.initiated)
                    return dateA - dateB
                }) 
                state.status = 'SUCCESS'
            })
           .addCase(fetchTransactions.rejected, (state, action) => {
                console.error('Error:', action.error.message)
                state.status = 'ERROR'
            })
    }
})

export const { addTransaction } = transactionSlice.actions

export const fetchTransactionsList = state => state.transactions.transactions
export const fetchTransactionStatus = (state) => state.transactions.status

export default transactionSlice.reducer