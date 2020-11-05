import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import getClient from "../../lib/api/client";
import User from "../../lib/api/user";
import { setToken, getToken, setuseToken, getuserToken, delToken } from "../../lib/token";

interface AuthType {
    token: string | null;
    isLogin: boolean;
    pending: boolean;
    error?: string;
    logout: () => void;
}
export const Login = createAsyncThunk(
    "auth/Login",
    ({ id, password }: { id: string; password: string }) => {
        // alert("test");
        // getClient().post('/auth', { id: id, pw: password })
        //     .then(res => {
        //         // console.log(res)
        //         // console.log(res.data.access_token)
        //         const token = res.data.access_token
        //         setToken(token)
        //         // window.location.reload();

        //     })
        //     .catch(err => console.log(err));
        User().Login({ id, password });

        // setToken(token);
        // return token;
    }
);
export const getUser = createAsyncThunk(
    "auth/getUser",
    () => {
        // alert("Test");
        User().Userget();
        // return Test;
    }
)

const initialState: AuthType = {
    token: getToken(),
    isLogin: !!getToken(),
    pending: false,
    logout: () => delToken(),
};
const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
    },
    extraReducers(builder) {
        builder.addCase(Login.pending, (state, action) => {
            state.pending = true;
            delete state.error;
        });
        builder.addCase(Login.fulfilled, (state, action: any) => {
            state.token = action.payload;
            state.isLogin = true;
            state.pending = false;
        });
        builder.addCase(Login.rejected, (state, action: any) => {
            state.error = action.error.message;
            state.pending = false;
        });
    },
});

export default authSlice;
