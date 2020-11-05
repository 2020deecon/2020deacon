import React, { useState } from 'react';
import Layout from "../components/layout";
import styled from "styled-components";
import { useHistory } from "react-router-dom"
import Input from "../components/UI/Input";
import { useForm } from "react-hook-form";
import Button from "../components/UI/Button";
import Make from "../lib/api/make";
import colors from "../constants/colors";

function Makecommunity() {
  const history = useHistory()
  const [type, setType] = useState("question");
  const [img, setimg] = useState("");
  function Upload(data: any) {
    Make().MakeCommunity({ ...data, image: img });
    history.replace("/");
  }
  const { register, handleSubmit } = useForm({
    mode: "onChange",
  });

  function Setimg() {
    const image: HTMLInputElement = document.getElementById(
      "bin"
    ) as HTMLInputElement;
    //input tag
    //img tag
    if (image.files![0]) {
      const reader = new FileReader();
      reader.onload = function (e?: any) {
        // image_section.src = e.target.result;
        setimg(e.target.result);//base64incoding
      };
      reader.readAsDataURL(image.files![0]);
    }
  }
  return (
    <Layout>
      <Wrap>
        <form onSubmit={handleSubmit(Upload)}>
          <TitleWrap>
            <Title>게시판 등록</Title>
            <label>
              <input
                type="file"
                name="uploadImg"
                accept="image/jpeg,image/png" //파일 형식 지정
                id="bin"
                onChange={(e) => {
                  Setimg();
                }}
                ref={register({
                  required: false,
                })}
                style={{ display: "none" }}
              />
              <div style={{ background: colors.border, borderRadius: "50px", textAlign: "center" }}>{!img ? "이미지 선택하기" : "이미지 선택완료"}</div>
            </label>
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
            name="text"
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
  font-family: 'Nanum Gothic Coding', monospace;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight:600;
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

