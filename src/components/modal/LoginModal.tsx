import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import { RootState } from "../../store/reducers";
import { useHistory } from "react-router-dom";

import Button from "../UI/Button";
import Modal from "../UI/Modal";
import Input, { WrapInput } from "../UI/Input";
import { Login, getUser } from "../../store/slices/auth";
import useModal from "../../hooks/useModal";
import { useDispatch, useSelector } from "react-redux";
function LoginModal() {
  const { register, handleSubmit } = useForm();
  const { error, pending, isLogin } = useSelector(
    (state: RootState) => state.auth
  );
  const dispatch = useDispatch();

  useEffect(() => {
    setTimeout(() => {
      isLogin && closed();
      history.replace("/");
    }, 10000)
    // window.location.reload();
  }, [isLogin, dispatch])

  const { closed } = useModal("login");
  const history = useHistory();

  function OnSubmit(data: any) {
    // alert("test");
    dispatch(Login(data));
    // window.location.reload();
  }
  return (
    <Modal title="로그인" modalname="login">
      <Wrap>
        <form onSubmit={handleSubmit(OnSubmit)}>
          <WrapInput fieldName="아이디">
            <Input type="text" name="id" ref={register({ required: true })}
            />
          </WrapInput>
          <WrapInput fieldName="비밀번호">
            <Input
              type="password"
              name="password"
              ref={register({ required: true })}
            />
          </WrapInput>
          <Button disabled={pending}>{!pending ? "로그인" : "로그인중"} </Button>
        </form>
      </Wrap>
    </Modal>
  );
}
const Wrap = styled.div``;
export default LoginModal;
