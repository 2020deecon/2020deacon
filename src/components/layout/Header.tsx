import React, { useState, useEffect } from "react";
import styled, { css } from "styled-components";
import viewport from "../../constants/viewport";
import Headding from "../UI/Headding";
import colors from "../../constants/colors";
import Button from "../UI/Button";
import Ul, { Li } from "../UI/Ul";
import { Link } from "react-router-dom";
import useLogin from "../../hooks/useLogin";
import useModal from "../../hooks/useModal";
import { getuserToken } from "../../lib/token";

function Header() {
  const [params, setparams] = useState(window.location.pathname);
  const [scrollpos, setscrollpos] = useState(0);
  const login = useLogin();
  const [id, setid] = useState(getuserToken());
  const [onOff, setOnOff] = useState(true);
  const { Open } = useModal("login");

  useEffect(() => {
    setparams(window.location.pathname);
    setOnOff(true);
  }, [window.location.pathname])

  window.onscroll = function () {
    if (0 < scrollpos && scrollpos < 7) window.setTimeout(500);
    if (scrollpos > window.pageYOffset * 0.01) {
      setOnOff(true);
    } else {
      setOnOff(false);
    }
    setscrollpos(window.pageYOffset * 0.01);
  };

  const Blogin = () => {
    return (
      <>
        <Button onClick={Open}>로그인</Button>
        <Button>
          <Link to="/signup">회원가입</Link>
        </Button>
      </>)
  }

  const Flogin = () => {
    return (
      <>
        <UserName>{id != "undefined" && id != null ? id + "님" : ""}</UserName>
        <Button onClick={() => { login.logout(); window.location.reload() }}>
          <Link to="/">로그아웃</Link>
        </Button>
      </>
    )
  }

  return (
    <Wrap state={onOff}>
      <LeftHeader>
        <Title>
          <Headding tag="h2" tagStyle="h3">
            <Link to="/">connec
            <div style={{ color: colors.primary }}>text</div>
            </Link>
          </Headding>
        </Title>
        <Ul>
          <Li clicked={params === "/makeproblem"}>
            <b>
              <Link to="/makeproblem">문제만들기</Link>
            </b>
          </Li>
          <Li clicked={params === "/makeworkbook"}>
            <b>
              <Link to="/makeworkbook">문제집만들기</Link>
            </b>
          </Li>
          <Li clicked={params === "/mypage"}>
            <b>
              <Link to="/mypage">마이 페이지</Link>
            </b>
          </Li>
          <Li clicked={params === "/community"}>
            <b>
              <Link to="/community">커뮤니티</Link>
            </b>
          </Li>
        </Ul>
      </LeftHeader>
      <RightHeader islogin={false}>
        {!login.isLogin ? Blogin() : Flogin()}
      </RightHeader>
    </Wrap>
  );
}

const Wrap = styled.div<{ state: boolean }>`
  position: fixed;
  top: 0px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 auto;
  padding: 10px 30px;

  height: 76px;
  z-index: 100;
  float: left;
  background: ${colors.white};
  @media (max-width: ${viewport.desktop}) {
    padding: 10px 20px;
  }
  transition: transform 0.33s ease;
  ${({ state }) => {
    return state
      ? css`
          transform: translateY(0);
        `
      : css`
          transform: translateY(-90%);
        `;
  }}
`;
const UserName = styled.div`
  height: 100%;
  font-weight: bold;
  font-size:20px;
  margin-right:20px;
  width:100%;
`;
const Title = styled.div`
  color: ${colors.border};
  /* width: 100%; */
  &>h2>a{
    display: flex;
  }
  
`;
const LeftHeader = styled.div`
  display: flex;
  align-items: center;
  /* float: left; */
  width: 100%;
  & > ul {
    width: 100%;
    max-width: 600px;

    @media (max-width: ${viewport.mobile}) {
      /* padding: 10px 20px; */
      padding-left: 0px;
    }
  }
`;
interface RightHeaderprops {
  islogin: boolean;
}
const RightHeader = styled.div<RightHeaderprops>`
  display: flex;
  align-items:center;
  width: 100%;
  max-width: 300px;
  ${({ islogin }) =>
    islogin &&
    css`
      max-width: 200px;
    `}
  padding: 0 30px;
  & > button:first-child {
    margin-right: 20px;
  }
`;
export default Header;
