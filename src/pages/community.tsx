import React, { useState } from "react";
import Layout from "../components/layout";
import styled from "styled-components";
import Input from "../components/UI/Input";
import Button from "../components/UI/Button";

import viewport from "../constants/viewport";
import colors from "../constants/colors";
import { Icon } from "../lib/images";

function Community() {
  const [click, setclick] = useState([
    { click: false, what: "질문" },
    { click: false, what: "잡담" },
    { click: false, what: "문제집" },
  ]);
  return (
    <Layout title="community">
      <Wrap>
        <SearchBox>
          <div>
            <Input type="text" />

            <div className="searchIcon">
              <button>
                <img src={Icon.search} />
              </button>
            </div>
          </div>
        </SearchBox>
        <Categorys>
          <Button
            onClick={(e) =>
              setclick(
                click.map((data) =>
                  data.what === "질문"
                    ? { click: !data.click, what: data.what }
                    : data
                )
              )
            }
            className={click[0].click ? "click" : ""}
          >
            질문
          </Button>
          <Button
            onClick={(e) =>
              setclick(
                click.map((data) =>
                  data.what === "잡담"
                    ? { click: !data.click, what: data.what }
                    : data
                )
              )
            }
            className={click[1].click ? "click" : ""}
          >
            잡담
          </Button>
          <Button
            onClick={(e) =>
              setclick(
                click.map((data) =>
                  data.what === "문제집"
                    ? { click: !data.click, what: data.what }
                    : data
                )
              )
            }
            className={click[2].click ? "click" : ""}
          >
            문제집
          </Button>
        </Categorys>
        <Results></Results>
      </Wrap>
    </Layout>
  );
}
const Results = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid ${colors.border};
  border-radius: 50px;
  margin-top: 1rem;
  width: 100%;
  height: 75%;
`;
const SearchBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${colors.border};
  border-radius: 50px;
  width: 100%;
  max-width: 300px;
  & > div {
    margin: 10px 5px;
    display: flex;
    justify-content: center;
    border-radius: 50px;
    background: ${colors.white};
    & > input {
      background: ${colors.white};
    }
    & > .searchIcon {
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 50%;
      & > button {
        display: flex;
      }
    }
  }
`;
const Categorys = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 30px;
  width: 100%;
  & > button {
    max-width: 100px;
    margin: 0px 10px;
  }
  & > .click {
    color: ${colors.primary};
    background: ${colors.border};
  }
`;
const Wrap = styled.div`
  display: flex;
  /* justify-content: center; */
  align-items: center;
  flex-direction: column;
  margin: 0px auto;
  padding: 0px 80px;
  max-width: ${viewport.desktop};
  height: 100%;
`;
export default Community;
