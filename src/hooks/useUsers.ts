import { useDispatch, useSelector } from "react-redux";
import { useCallback } from "react";
import Userslice from "../store/slices/user";
import User, { Login, SignUp } from "../lib/api/user";

function UseUser() {
    const Login = ({ id, password }: Login) => {
        User().Login({ id, password });
    };
    
    const SignUp = ({ id,age, password, name, email }: SignUp) => {
        User().signUp({ id,age, password, name, email });
    }
    const checkToken =()=>{
        User().Userget();
    }
    return { Login, SignUp,checkToken };
}
export default UseUser;