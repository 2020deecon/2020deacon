import React, { useState, useEffect } from "react";
import Layout from "../components/layout";
import styled from "styled-components";
import Input from "../components/UI/Input";
import Button from "../components/UI/Button";
import { useHistory } from "react-router-dom";

import viewport from "../constants/viewport";
import colors from "../constants/colors";
import { Icon } from "../lib/images";
import Item from "../components/views/viewcommunity";
import Get from "../lib/api/get";


function Community() {
  const history = useHistory();
  const [Items, setItems] = useState<any[]>([]);
  const [click, setclick] = useState([
    { click: true, what: "question" },
    { click: true, what: "debate" },
  ]);
  useEffect(() => {
    Get().Getallcommunity().then(res => {
      console.log(res);
      setItems(res);
    }).catch(err => console.log(err));
  }, []);
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
                  data.what === "question"
                    ? { click: !data.click, what: data.what }
                    : data
                )
              )
            }
            className={click[0].click ? "click" : ""}
          >
            question
          </Button>
          <Button
            onClick={(e) =>
              setclick(
                click.map((data) =>
                  data.what === "debate"
                    ? { click: !data.click, what: data.what }
                    : data
                )
              )
            }
            className={click[1].click ? "click" : ""}
          >
            debate
          </Button>
          <button id="writebutton" onClick={() => history.replace("/makecommunity")}>
            글쓰기
          </button>
        </Categorys>

        <Results>
          {Items.map(item => {
            return (
              <div onClick={() => history.replace("/viewCommunity/" + item.id)}>
                <Item title={item.title} contents={item.text} Written={item.type} />
              </div>)
          })}
          {/* 
          <Item title="test" contents="이게이렇게 어떻게 나옴?" />
          <Item title="test" contents="이게이렇게 어떻게 나옴?" />
          <Item title="test" contents="이게이렇게 어떻게 나옴?" />
          <Item title="test" contents="이게이렇게 어떻게 나옴?" />
          <Item title="test" contents="이게이렇게 어떻게 나옴?" />
          <Item title="test" contents="이게이렇게 어떻게 나옴?" />
          <Item title="test" contents="이게이렇게 어떻게 나옴?" />
          <Item title="test" contents="이게이렇게 어떻게 나옴?" />
          <Item title="test" contents="이게이렇게 어떻게 나옴?" /> */}
        </Results>
      </Wrap>
    </Layout>
  );
}
const Results = styled.div`
  display: flex;
  flex-direction: column;
  border-top: 3px solid ${colors.border};
  overflow-y: scroll;
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
  position: relative;
  &>#writebutton{
    position: absolute;
    right:20px;
    bottom:0;
    font-size:18px;
    font-weight:600;
    color:${colors.primary};
    transition: color 0.5s;
    &:hover {
      color:${colors.border};
    }
  }
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
  align-items: center;
  flex-direction: column;
  margin: 0px auto;
  padding: 0px 80px;
  max-width: ${viewport.desktop};
  height: 100%;
`;
export default Community;
