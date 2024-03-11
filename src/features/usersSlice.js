import { createAsyncThunk, createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import axios from 'axios'



const USERS_URL = `${import.meta.env.VITE_SERVER_URL}/users`;


const initialState = {
    user: null,
    status: 'idle',
    error: null
}



export const fetchUser = createAsyncThunk('users/fetchUser', async () => {
    try {
        const response = await axios.get(`${USERS_URL}/user`, {
            validateStatus: function (status) {
                return status >= 200 && status < 500
            },
            withCredentials: true
        })
        return response.data
    } catch (error) {
        console.log(error.response, 'errr');
        return error
    }
})

const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        setUser(state, action) {
            state.user = action.payload
        },
        setUserState(state, action) {
            state.status = action.payload
        }
    },
    extraReducers(builder) {
        builder.addCase(fetchUser.pending, (state, action) => {
            state.status = 'loading'
        }).addCase(fetchUser.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.user = action.payload
        }).addCase(fetchUser.rejected, (state, action) => {
            state.status = 'failed'
            state.error = action.error.message
        })
    }
})



export function getUser() {
    return useSelector(state => state.users.user)
}
export function getUserError() {
    return useSelector(state => state.users.error)
}
export function getUserStatus() {
    return useSelector(state => state.users.status)
}


export const { setUser, setUserState } = usersSlice.actions

export default usersSlice.reducer