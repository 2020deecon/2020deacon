import React, { useState, useEffect } from "react";
import Layout from "../components/layout";
import styled, { css } from "styled-components";
import { Icon } from "../lib/images";
import viewport from "../constants/viewport";
import colors from "../constants/colors";
import { useForm } from "react-hook-form";
import Result from "../components/Serch/getData";
import Button from "../components/UI/Button";
import Slider from "react-slick";
import Headding from "../components/UI/Headding";

interface Workbooks {
  pid: string;
  title: string;
  img: string;
}
interface answers {
  Sortanswer?: string;
  answers?: string[5];
}

function MakePWorkbook() {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  const [workbook, setworkbook] = useState<Workbooks[]>([]);
  const [answers, setanswers] = useState<answers[]>([]);
  const [title, settitle] = useState("");

  const { handleSubmit } = useForm();

  function update({ pid, title, img }: Workbooks) {
    setworkbook(workbook => [...workbook, { pid, title, img }]);

  }
  function delupdate(pid: string) {
    setworkbook(workbook.filter(data => data.pid !== pid));
  }

  // eslint-disable-next-line jsx-a11y/alt-text
  const SearchIcon = <img src={Icon.search} width="24px" height="24px" />;

  function OnSubmit(data: any) { }
  return (
    <Layout>
      <Wrap>
        <SearchFrom>
          <form onSubmit={handleSubmit(OnSubmit)}>
            <select>
              <option value="국어">국어</option>
              <option value="영어">영어</option>
              <option value="수학">수학</option>
              <option value="과학">과학</option>
            </select>
            <input type="text" onChange={e => settitle(e.target.value)} />
            <div id="search" style={{ display: "flex", alignItems: "center" }}>
              <input type="text" />
              <div style={{ padding: "5px", display: "flex" }}>
                {SearchIcon}
              </div>
            </div>
            <Result User={false} update={update} delupdate={delupdate} />
            <Button css={ButtonCss}>완성</Button>
          </form>

        </SearchFrom>
        <SliderWrap>
          <Slider {...settings}>
            <Problems>
              <Headding tag="h6" tagStyle="h5">{title}</Headding>
              {workbook.length > 0 ? workbook.map((data) => <Items key={data.pid}>{data.title}
                <img src={data.img} alt="" /></Items>) : "문제를 선택해서 문제집을 만들어 보세요!"}
            </Problems>
            <Problems>
              <Headding tag="h6" tagStyle="h5">{title} 답지</Headding>
              {answers.length > 0 ? answers.map((data) => <Items ></Items>) : "문제를 선택해서 문제집을 만들어 보세요!"}
            </Problems>
          </Slider>
        </SliderWrap>
      </Wrap>
    </Layout>
  );
}

const Wrap = styled.div`
  display: flex;
  flex-flow: row;
  justify-content:space-around;
  max-width: ${viewport.desktop};
  padding: 0px 40px;
  margin: 0px auto;
  height: calc(100vh - 76px);
`;
const SearchFrom = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px 40px;
  border: 1px solid ${colors.border};
  border-radius: 20px;
  min-width: 300px;
  height: 90%;
  margin-right:30px;
  & > form > #search {
    padding: 0px 5px 0px 15px;
    background: ${colors.border};
    border-radius: 20px;
  }
`;
const Problems = styled.div`
font-family: 'Noto Sans KR', sans-serif;
  display: flex;
  flex-flow: row wrap;
  align-items: center;
  justify-content: center;
  height: 100%;
  border: 1px solid ${colors.gray};
  text-align: center;
  &>div{
    margin:1%;
    max-width:50px;
    /* width:30%; */
    max-height:50px;
    /* height:30%; */
    border: 1px solid ${colors.gray};
  }
  &:focus{
    outline: 0;
  }
`;

const Items = styled.div`
display:flex;
justify-content: center;
flex-direction: column;
`;
const SliderWrap = styled.div`
display:flex;
justify-content: center;
align-items: center;
max-width:100%;
overflow-x:hidden;
&>div{
  width:100%;
  /* height:90%; */
}
/* &>{
  
} */
`;
const ButtonCss = css`
  margin-top:30px;
`;
export default MakePWorkbook;
