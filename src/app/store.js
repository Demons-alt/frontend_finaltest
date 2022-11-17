import { configureStore } from '@reduxjs/toolkit';
// import counterReducer from '../features/counter/counterSlice';
import Userinfo from '../features/Userinfo'

export const store = configureStore({
  reducer: {
    user : Userinfo
  }
});
