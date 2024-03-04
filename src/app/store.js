import { configureStore } from '@reduxjs/toolkit'
import notesReducer from '../features/notesSlice'
import usersReducer from '../features/usersSlice'
export const store = configureStore({
    reducer: {
        notes: notesReducer,
        users: usersReducer
    }
})