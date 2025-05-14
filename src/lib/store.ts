import { configureStore } from '@reduxjs/toolkit'
import modalReducer from './features/modals/modalSlice'
import userReducer from './features/user/userSlice'
export const makeStore = () => {
  return configureStore({
    reducer: {
        modals:modalReducer,
        user:userReducer
    },
  })
}

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']