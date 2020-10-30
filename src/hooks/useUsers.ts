import { useDispatch, useSelector } from "react-redux";
import { useCallback } from "react";
import Userslice from "../store/slices/user";
import User, { Login, SignUp } from "../lib/api/user";

function UseUser() {
    // const dispatch = useDispatch();

    const Login = ({ id, password }: Login) => {
        User().Login({ id, password });
    };
    const SignUp = ({ id, password, name, email }: SignUp) => {
        User().signUp({ id, password, name, email });
    }
    return { Login, SignUp };
}
export default UseUser;