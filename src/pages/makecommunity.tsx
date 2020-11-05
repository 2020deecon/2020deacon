import React, { useState } from 'react';
import Layout from "../components/layout";
import styled from "styled-components";
import { useHistory } from "react-router-dom"
import Input from "../components/UI/Input";
import { useForm } from "react-hook-form";
import Button from "../components/UI/Button";
function Makecommunity() {
  const history = useHistory()
  const [title, setTitle] = useState("")
  const [text, setText] = useState("")
  const [type, setType] = useState("question");

  function Upload(data: any) {
    history.replace("/");
  }
  const { register, handleSubmit, errors } = useForm({
    mode: "onChange",
  });

  return (
    <Layout>
      <Wrap>
        <form onSubmit={handleSubmit(Upload)}>
          <TitleWrap>
            <Title>게시판 등록</Title>
          </TitleWrap>
          <TitleLine></TitleLine>
          <Input
            type="text"
            name="title"
            placeholder="제목 ( 4 ~ 20 )"
            style={{ margin: "21px 0px 7px 0px" }}
            ref={register({
              required: "제목을 입력해주세요."
            })}
          />

          <Input
            type="text"
            name="type"
            placeholder="타입 ( quession, debate )"
            style={{ margin: "21px 0px 7px 0px" }}
            value={type}
            onChange={(e) => setType(e.target.value)}
            ref={register({
              required: "타입을 정해주세요"
            })}

          />
          <InputText
            rows={25}
            placeholder="내용"
            name="contents"
            style={{ margin: "7px 0px" }}
            ref={register({
              required: "내용을 작성해주세요!"
            })}
          />
          <Button>등록</Button>
        </form>
      </Wrap>
    </Layout>
  );
}

const Title = styled.div`
  font-size: 28px;
  font-family: "NanumSRB";
  display: flex;
  justify-content: center;
  align-items: center;
`

const TitleLine = styled.div`
  width: 100%;
  height: 100%;
  border-top: 1.5px solid black;
  margin-top: 5px;
  display: flex;
`
const TitleWrap = styled.div`
  display: flex;
  min-height: 28px;
  width: 100%;
  justify-content: flex-start;
`
const Wrap = styled.div`
  width: 100%;
  padding: 0% 5%;
  & > form {
    max-width: 800px;
    display: flex;
    /* justify-content: center; */
    align-items: center;
    flex-direction: column;
    margin: 0px auto;
    & > *:nth-child(1) {
      margin: 55px 0px 0px 0px;
    }
  }
`
const InputText = styled.textarea`
  width: 100%;
  box-sizing: border-box;
  font-size: 1rem;
  padding: 8px 10px;
  border-radius: 4px;
  border: solid 1px #cecece;
  resize: none;
  &:focus {
    outline: 0;
  }
`
// const Button = styled.div`
//   width: 100%;
//   height: 40px;
//   border-radius: 4px;
//   border: solid 1px #cecece;
//   margin-top: 7px;
//   margin-bottom: 50px;
//   background-color: #0f204b;
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   color: white;
//   font-family: "NanumSRB";
// `

export default Makecommunity;

