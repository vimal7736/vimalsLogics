import { configureStore } from '@reduxjs/toolkit'

import transactionsReducer from './transactionsSlice'
import userReducer from './userSlice'
import uiReducer from './uiSlice'

export const store = configureStore({
    reducer:{
        user: userReducer,
        transactions: transactionsReducer,
        ui:uiReducer
    }
    
})