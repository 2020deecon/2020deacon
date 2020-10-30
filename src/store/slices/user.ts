import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
    id: "",
    email: "",
    name: "",
}
export type user = keyof typeof initialState;

const Userslice = createSlice({
    name: "user",
    initialState,
    reducers: {
        Setuser(state, action: PayloadAction<{ id: string; email: string; name: string }>) {
            state = action.payload;
        }
    }
});

export default Userslice;