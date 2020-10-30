import React, { useState } from "react";
import Layout from "../components/layout";
import styled, { css } from "styled-components";
import viewport from "../constants/viewport";
import Button from "../components/UI/Button";
import colors from "../constants/colors";
import { Icon } from "../lib/images";
import Input, { WrapInput } from "../components/UI/Input";

type What = "나만의 문제" | "나만의 문제집" | "구독한 자료";
type Sort = "flex" | "grid";
function Mypage() {
  const [what, setwhat] = useState<What>("나만의 문제");
  const [sort, setsort] = useState<Sort>("flex");
  return (
    <Layout>
      <Wrap>
        <div className="select_form">
          <Button
            color={colors.primary}
            back={colors.white}
            hov={colors.gray}
            onClick={() => setwhat("나만의 문제")}
            css={ButtonCss}
            className={what === "나만의 문제" ? "click" : ""}
          >
            나만의 문제
          </Button>
          <Button
            color={colors.primary}
            back={colors.white}
            hov={colors.gray}
            onClick={() => setwhat("나만의 문제집")}
            css={ButtonCss}
            className={what === "나만의 문제집" ? "click" : ""}
          >
            나만의 문제집
          </Button>

          <Button
            color={colors.primary}
            back={colors.white}
            hov={colors.gray}
            onClick={() => setwhat("구독한 자료")}
            css={ButtonCss}
            className={what === "구독한 자료" ? "click" : ""}
          >
            구독한 자료
          </Button>
        </div>
        <div className="select_data">
          <div className="data_sort">
            <div className="searchBox">
              <Input type="text" />
              <img src={Icon.search} alt="" />
            </div>
            <div className="sortBox">
              <button onClick={() => setsort("flex")} className={sort === "flex" ? "click" : ""}>
                <img src={Icon.list} alt="" />
              </button>
              <button onClick={() => setsort("grid")} className={sort !== "flex" ? "click" : ""}>
                <img src={Icon.grid} alt="" />
              </button>
            </div>

          </div>

          <div className={sort === "flex" ? "flex" : "grid"}>
            <Items></Items>
          </div>
        </div>
      </Wrap>
    </Layout>
  );
}
interface Click { }
const Wrap = styled.div`
  max-width: ${viewport.desktop};
  padding: 0px 40px;
  margin: 0px auto;
  display: flex;
  align-items: center;
  height: calc(100vh - 76px);
  & > div {
    display: flex;
    flex-flow: column wrap;
    border: 1px solid ${colors.gray};
    height: 100%;
    max-height: 95%;
  }
  & > .select_form {
    min-width: 300px;
    & > .click {
      background: ${colors.gray};
      border: ${colors.gray};
      color: ${colors.white};
    }
  }
  & > .select_data {
    border-left: none;
    width: 100%;
    
    & > .data_sort {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 40px;
      border-bottom: 1px solid ${colors.gray};
      position: relative;
      &>.searchBox{
        display:flex;
        background: ${colors.border};
        border-radius:20px;
        &>img{
          margin-right: 10px;
        }
      }
      &>.sortBox{
        position:absolute;
        right:0;
      & > .click {
          background: ${colors.gray};
          border: ${colors.gray};
          color: ${colors.white};
        }
      & > button:hover {
          background: ${colors.gray};
        }
      }
      
      
    }
    & > .flex {
      display: flex;
      flex-flow: row wrap;
    }
    & > .gird {
    }
  }
`;

const ButtonCss = css`
  border-radius: 0px;
`;

const Items = styled.div`
  display: flex;
  flex-direction: column;
`;
export default Mypage;
