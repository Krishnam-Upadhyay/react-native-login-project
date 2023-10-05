
import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../Screens/counterSlice'
export const store = configureStore({
  reducer: {
    counter: counterReducer,
    
  },
})

