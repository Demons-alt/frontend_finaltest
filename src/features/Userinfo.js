import { createSlice } from "@reduxjs/toolkit";

const Userinfo = createSlice({
    name : "user",
    initialState : {
        email : "",
        password : "",
        nik : "",
        address : "",
        phone_number : "",
        join_date : "",
        role : "",
        project : ""
    },
    reducers: {
        store : (state, action) => {
            state.email = action.payload.email
            state.password = action.payload.password
            state.nik = action.payload.nik
            state.address = action.payload.address
            state.phone_number = action.payload.phone_number
            state.join_date = action.payload.join_date
            state.role = action.payload.role
            state.project = action.payload.project
        }

    }
})
export const {store} = Userinfo.actions
export default Userinfo.reducer