import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../api/api";

const initialState = {
    user: JSON.parse(sessionStorage.getItem('user')), 
    status: 'IDLE',
    error: null
}

export const authenticateUser = createAsyncThunk("user/autheticate", async (userDetails) =>{
         try{
                const {data, error, headers} = await api.post('/user/auth', userDetails)
                if(error) throw error;
                const { authorization } = headers
                sessionStorage.setItem('access_token', authorization)
                console.log(`authorization header: ${JSON.stringify(headers)}`)
                console.log(`JWT token value ${authorization}`)
                console.log(`Data value ${data}`)
                sessionStorage.setItem('user', JSON.stringify(data))
                return data
            } catch(err) {
                console.log(err.message)
                throw err
         }
    }
)

export const registerUser = createAsyncThunk("user/register", async (userDetails) => {
    try {
            const{data, error} = await api.post('/user/register', userDetails)
            if(error) throw error;
            return data
        } catch(err) {
            console.log(err.message)
            throw err
        }
    }
)

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
            state.status = 'SUCCESS';
        },
        setUserError: (state, action) => {
            state.error = action.payload;
            state.status = 'ERROR';
        },
        resetStatus: (state) => {
            state.status = 'IDLE'
        }
    },
    extraReducers(builder) {
        builder.addCase(authenticateUser.pending, (state) => {
                    state.status = 'PENDING'
                })
                .addCase(authenticateUser.fulfilled, (state, action) => {
                    state.user = action.payload
                    console.log(action.payload)
                    state.status = 'SUCCESS'
                })
                .addCase(authenticateUser.rejected, (state) => {
                    state.status = 'FAILED'
                })
                .addCase(registerUser.pending, (state) => {
                    state.status = 'PENDING'
                })
                .addCase(registerUser.fulfilled, (state) => {
                    state.status = 'SUCCESS'
                })
                .addCase(registerUser.rejected, (state) =>{ 
                    state.status = 'FAILED'
                })
    }
})

export const { setUser, setUserError, resetStatus } = userSlice.actions;

export const fetchedUser = state => state.user.user
export const fetchStatus = state => state.user.status
export default userSlice.reducer;