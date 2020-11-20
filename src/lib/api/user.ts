import getClient from "./client";
import parseError from "./parseError";
import { getToken, setToken, setuseToken, delToken } from "../token";
import {toast } from 'react-toastify';
export interface Login {
    id: string;
    password: string;
}
export interface SignUp extends Login {
    name: string;
    email: string;
}
function User() {
    // const Login = ({ id, password }: Login) => {
    //     try {
    //         getClient().post('/auth', { id: id, pw: password });
    //         // setToken(data.data.access_token);
    //         // return data.data.access_token;
    //     }
    //     catch (err) {
    //         throw parseError(err);
    //     }
    // }
    const Login = async ({ id, password }: Login) => {
        try {
            const data = await getClient().post('/auth', { id: id, pw: password });
            console.log
            (data.data);
            if (data.data.access_token) {
                setToken(data.data.access_token)
                toast.success("로그인 성공");
                window.location.reload();
            }
            else
                toast.error("로그인 실패");
        }
        catch (err) {
            throw parseError(err);
        }
    }

    const signUp = ({ id, password, email, name }: SignUp) => {
        getClient().post('/register', { id: id, pw: password, email: email, name: name }).then(res => {
            return res.data;
        }).catch(err => {
            throw parseError(err);
        })
    }
    const Userget = async () => {
        try {
            const data = await getClient().get('/user');
            
            if (data.data.code !== 200)
                delToken();
            else
                setuseToken(data.data.id);
            return data.data;
        }
        catch (err) {
            throw parseError(err);
        }
    }
    return { Login, signUp, Userget };
}
export default User;