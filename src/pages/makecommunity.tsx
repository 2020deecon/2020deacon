import React, { useState,useEffect } from 'react';
import Layout from "../components/layout";
import styled from "styled-components";
import { useHistory } from "react-router-dom"
import Input from "../components/UI/Input";
import Button from "../components/UI/Button";
import Make from "../lib/api/make";
import colors from "../constants/colors";
import Image from "../lib/images";

import User from '../hooks/useUsers';
import { getToken } from '../lib/token';
import { toast } from 'react-toastify';
import Get from '../lib/api/get';
function Makecommunity() {
  const history = useHistory()
  const beforelogin = () => toast.error('로그인 후 이용하세요!');
  const [type, setType] = useState("question");
  const [img, setimg] = useState("");
  const [search, setSearch] = useState("");

  const [title,setTitle]=useState("");
  const [Text,setText] = useState("");
  const [ problemItems, setproblemItems]= useState<any[]>([]);
  const [write_id, setwrite_id]=useState("");
	useEffect(() => {
		User().checkToken();
		if (!getToken()) {
			beforelogin();
			history.replace('/');
		}
  }, []);
  
  function Upload() {
    if(title==="" || img==="" || Text==="")
      return;
    Make().MakeCommunity({ title:title, image: img,text:Text,type,problemId:write_id});
    history.replace("/");
    toast.success("커뮤니티 완성");
  }
  function Select(){
    Get().GetSearchProblem(search).then(res => {
      console.log(res);
      if(res.length>1)
        setproblemItems(res);
      else if(res.length===1){
        setimg(res[0].image);
        setwrite_id(res[0].id);
      }
    }).catch(err => console.log(err));
  }

  function Setimg() {
    const image: HTMLInputElement = document.getElementById(
      "bin"
    ) as HTMLInputElement;
    //input tag
    const image_section: HTMLImageElement = document.getElementById(
      "image_section"
    ) as HTMLImageElement;
    //img tag
    if (image.files![0]) {
      const reader = new FileReader();
      reader.onload = function (e?: any) {
        image_section.src = e.target.result;
        setimg(e.target.result);//base64incoding
      };
      reader.readAsDataURL(image.files![0]);
    }
  }

  return (
    <Layout>
      <Wrap>
        <div>
          <TitleWrap>
            <Title>게시판 등록</Title>
          </TitleWrap>
          <TitleLine/>
          <Input
            type="text"
            name="title"
            placeholder="제목 ( 4 ~ 20 )"
            style={{ margin: "21px 0px 7px 0px" }}
            // ref={register({
            //   required: "제목을 입력해주세요."
            // })}
            onChange={e=>setTitle(e.target.value)}
          />
          <select onChange={(e) => setType(e.target.value)} value={type}>
            <option value="quession">quession</option>
            <option value="debate">debate</option>
          </select>
          <Input
            type="text"
            placeholder="넣을 문제명을 입력한뒤 enter키를 눌러주세요!"
            style={{ margin: "21px 0px 7px 0px" }}
            onChange={e=>setSearch(e.target.value)}
            onKeyDown={(e) =>{
              if(e.key === 'Enter')
                Select();
            }}
          />
          <ProblemsWrap>
            {problemItems.map((item)=><ProblemsItem onClick={() =>{
                setimg(item.image);
                setwrite_id(item.id);
            }}>
              {item.title}
              <img src={item.image} alt=""/>
            </ProblemsItem>)}
          </ProblemsWrap>

          <div style={{ width: "100%", margin: "21px 0px 7px" }}>
            <label>
              <input
                type="file"
                name="uploadImg"
                accept="image/jpeg,image/png" //파일 형식 지정
                id="bin"
                onChange={(e) => {
                  Setimg();
                }}
                // ref={register({
                //   required: false,
                // })}
                style={{ display: "none" }}
              />
              <div style={{ background: colors.border, borderRadius: "50px", display: "flex", alignItems: "center", justifyContent: "center", height: "35px",cursor:"pointer" }}>{!img ? "이미지 선택하기" : "이미지 선택완료"}</div>
            </label>
          </div>
          <label htmlFor="bin">
            <img
              style={{ maxWidth: "500px", maxHeight: "250px",cursor:"pointer" }}
              id="image_section"
              src={img}
            />
          </label>
          <InputText
            rows={25}
            placeholder="내용"
            name="text"
            style={{ margin: "7px 0px" }}
            // ref={register({
            //   required: "내용을 작성해주세요!"
            // })}
            onChange={e=>setText(e.target.value)}
          />
          <Button onClick={() =>{Upload();}}>등록</Button>
        </div>
      </Wrap>
    </Layout >
  );
}
const ProblemsWrap= styled.div`
  display: flex;
  justify-content: space-between;
  width:100%;
`;
const ProblemsItem= styled.div`
  display: flex;
  flex-direction: column;
  cursor: pointer;
  &>img{
    max-width: 300px;
    max-height: 300px;
  }
`;

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
  & > div {
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

