import { configureStore } from '@reduxjs/toolkit';
import authSlice from './authSlice';

const store =configureStore({
    reducers :{
        auth : authSlice,
        //if contain export more of the slice
    }
});

export default store;