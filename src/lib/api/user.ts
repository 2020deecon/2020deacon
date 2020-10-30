import getClient from "./client";
import parseError from "./parseError";

export interface Login {
    id: string;
    password: string;
}
export interface SignUp extends Login {
    name: string;
    email: string;
}
function User() {
    const Login = async ({ id, password }: Login) => {
        getClient().post('/auth', { id: id, pw: password }).then(res => {
            console.log(res.data.access_token);
            return res.data.access_token;
        }).catch(err => {
            console.log(err)
            throw parseError(err);
        })
    }
    const signUp = ({ id, password, email, name }: SignUp) => {
        console.log({ id, password, email, name });

        getClient().post('/register', { id: id, pw: password, email: email, name: name }).then(res => {
            console.log(res.data);
            return res.data;
        }).catch(err => {
            throw parseError(err);
        })
    }
    return { Login, signUp };
}
export default User;