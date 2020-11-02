import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import User from "../../lib/api/user";
import { setToken, getToken, setuseToken, getuserToken, delToken } from "../../lib/token";

interface AuthType {
    token: string | null;
    isLogin: boolean;
    pending: boolean;
    error?: string;
    id: string | null;
    logout: () => void;
}
export const Login = createAsyncThunk(
    "auth/Login",
    async ({ id, password }: { id: string; password: string }) => {
        const token = await User().Login({ id, password });
        setToken(token);
        setuseToken(id);

        return token;
    }
);

const initialState: AuthType = {
    token: getToken(),
    isLogin: !!getToken(),
    pending: false,
    id: getuserToken(),
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
