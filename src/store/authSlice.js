import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    status : false,
    userData: null
}

const authSlice = createSlice({
    name:"auth",
    initialState,
    redicers : {
        logIn(state , action){
            state.staus = true;
            state.userData=action.payload.userData;
        },
        logOut(state , action){
            state.stutus=false;
            state.userData = null;
        }
    }
});

export const {logIn , logOut }=authSlice.actions;
export default authSlice.reducer;