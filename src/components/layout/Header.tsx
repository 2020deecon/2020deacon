import React, { useState, useEffect } from "react";
import styled, { css } from "styled-components";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom"

import viewport from "../../constants/viewport";
import colors from "../../constants/colors";

import Headding from "../UI/Headding";
import Button from "../UI/Button";
import Ul, { Li } from "../UI/Ul";

import useLogin from "../../hooks/useLogin";
import useModal from "../../hooks/useModal";
import { getuserToken } from "../../lib/token";
import {Icon} from "../../lib/images";
function Header() {
  const [params, setparams] = useState(window.location.pathname);
  const [scrollpos, setscrollpos] = useState(0);
  const login = useLogin();
  const history = useHistory();
  const [id, setid] = useState(getuserToken());
  const [onofflinks,setonofflinks] = useState(false);
  const [onOffHeader, setOnOffHeader] = useState(true);
  const { Open } = useModal("login");

  useEffect(() => {
    if (id === null && login.isLogin === true) {
      setTimeout(() => {
        window.location.reload();
      }, 1000);
      return;
    }
  }, [id]);

  useEffect(() => {
    setparams(window.location.pathname);
    setOnOffHeader(true);
  }, [window.location.pathname])

  window.onscroll = function () {
    if (0 < scrollpos && scrollpos < 7) window.setTimeout(500);
    if (scrollpos > window.pageYOffset * 0.01) {
      setOnOffHeader(true);
    } else {
      setOnOffHeader(false);
    }
    setscrollpos(window.pageYOffset * 0.01);
  };
  window.addEventListener("resize", function(event) {
    setonofflinks(document.body.clientWidth <= 800);
      // Number(viewport.mobile));
    console.log(document.body.clientWidth + ' wide by ' + document.body.clientHeight+' high');
})
  
  const Blogin = () => {
    return (
      <>
        <Button css={buttoncss} onClick={
          ()=>{
            history.replace("/login");
          }
          
          }>로그인</Button>
        <Button css={buttoncss}>
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
    <Wrap state={onOffHeader}>
      <LeftHeader>
        <Title>
          <Headding tag="h2" tagStyle="h3">
            <Link to="/">
              <Title1>connec</Title1>
            <Title2>Text</Title2>
            </Link>
          </Headding>
        </Title>

        <Ul>
          <Li clicked={params === "/makeproblem"} onClick={() => {
            if (!login.isLogin) {
              alert("로그인 후 이용하세요");
              history.replace("/");
            }
          }
          }>
            <b>
              <Link to="/makeproblem">{onofflinks ? <img src={Icon.add} alt=""/> : "문제만들기"}</Link>
            </b>
          </Li>
          <Li clicked={params === "/makeworkbook"} onClick={() => {
            if (!login.isLogin) {
              alert("로그인 후 이용하세요");
              history.replace("/");
            }
          }}>
            <b>
              <Link to="/makeworkbook">
              {onofflinks ? <img src={Icon.workbook} alt=""/> : "문제집만들기"}
                </Link>
            </b>
          </Li>
          <Li clicked={params === "/mypage"} onClick={() => {
            if (!login.isLogin) {
              alert("로그인 후 이용하세요");
              history.replace("/");
            }
          }}>
            <b>
              <Link to="/mypage">
              {onofflinks ? <img src={Icon.user} alt=""/> : "마이 페이지"}
                </Link>
            </b>
          </Li>
          <Li clicked={params === "/community"}>
            <b>
              <Link to="/community">
              {onofflinks ? <img src={Icon.community} alt=""/> : "커뮤니티"}
                </Link>
            </b>
          </Li>
        </Ul>
      </LeftHeader>
      <RightHeader islogin={false}>
        {!login.token ? Blogin() : Flogin()}
      </RightHeader>
    </Wrap >
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
  color: ${colors.title};
  font-weight:600;
  &>h2>a{
    display: flex;
  }
`;
const Title1= styled.div`
font-weight: 600;
`;
const Title2= styled.div`
font-weight: 700;
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
const buttoncss = css`
border-radius:5px;
`;
export default Header;
