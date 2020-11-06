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
import Item from "../components/views/viewproblem";
import useHistory from "react-router-dom";
import make from "../lib/api/make";
import Get from "../lib/api/get";

interface Workbooks {
  pid: string;
  title: string;
  img: string;
  answer?: string | string[];
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
  const [category, setcategory] = useState("국어");
  const [title, settitle] = useState("");
  const [search, setSearch] = useState("");
  const { handleSubmit, register } = useForm();

  function update({ pid, title, img }: Workbooks) {
    Get().GetsomeofProblems({ id: pid }).then(res => {
      setworkbook(workbook => [...workbook, { pid, title, img, answer: res.answer }]);
    }).catch(err => console.log(err));

  }

  function delupdate(pid: string) {
    // alert(pid);
    setworkbook(workbook.filter(data => data.pid !== pid));
  }

  // eslint-disable-next-line jsx-a11y/alt-text
  const SearchIcon = <img src={Icon.search} width="24px" height="24px" />;

  function OnSubmit(data: any) {
    make().MakeWorkbook({ title, problems: workbook.map((data) => data.pid), category });
  }
  return (
    <Layout>
      <Wrap>
        <SearchWrap onSubmit={handleSubmit(OnSubmit)}>
          <select onChange={e => setcategory(e.target.value)}>
            <option value="국어">국어</option>
            <option value="영어">영어</option>
            <option value="수학">수학</option>
            <option value="과학">과학</option>
          </select>
          <div className="search" style={{ display: "flex", alignItems: "center", height: "50px" }}>
            <input type="text" name="title" placeholder="제목을 입력하세요" onChange={e => settitle(e.target.value)}
              ref={register({
                required: "제목을 입력해주세요",
              })} />
          </div>

          <div className="search" style={{ display: "flex", alignItems: "center" }}>
            <input type="text" placeholder="문제을 검색하세요" onChange={e => setSearch(e.target.value)} />
            <div style={{ padding: "5px", display: "flex" }}>
              {SearchIcon}
            </div>
          </div>
          <Result update={update} delupdate={delupdate} category={category} nowids={workbook.map(data => data.pid)} search={search} />
          <Button css={ButtonCss}>완성</Button>
        </SearchWrap>

        <SliderWrap>
          <Slider {...settings}>

            <Problems>
              <Headding tag="h6" tagStyle="h5">{title}</Headding>
              <PItem workbook={workbook} />
            </Problems>

            <Problems>
              <Headding tag="h6" tagStyle="h5">{title} 답지</Headding>
              <ol style={{ display: "flex", flexFlow: "column wrap", alignItems: "center", fontSize: "18px" }}>
                {workbook ? workbook.map((data) => <li >{data.answer}</li>) : "문제를 선택해서 문제집을 만들어 보세요!"}
              </ol>
            </Problems>
          </Slider>
        </SliderWrap>
      </Wrap>
    </Layout>
  );
}
interface Test {
  workbook: Workbooks[];
}
function PItem({ workbook }: Test) {
  return (
    <>
      <div>
        {workbook.length > 0 ? workbook.map((data) => <Item key={data.pid} title={data.title} src={data.img} size="medium" />
        ) : "문제를 선택해서 문제집을 만들어 보세요!"}
      </div>
    </>
  )
}
const Wrap = styled.div`
  display: flex;
  flex-flow: row;
  justify-content:space-around;
  align-items:center;
  max-width: ${viewport.desktop};
  padding: 0px 40px;
  margin: 0px auto;
  height: calc(100vh - 76px);
`;

const SearchWrap = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px 40px;
  border: 1px solid ${colors.border};
  border-radius: 20px;
  max-width: 300px;
  width:100%;
  /* height: calc(100vh - 76px); */
  height: 90%;
  margin-right:30px;
  /* position: relative; */
  &  > .search {
    padding: 0px 5px 0px 15px;
    margin:5px 0px;
    font-size:13px;
    background: ${colors.border};
    border-radius: 20px;
  }
`;

const Problems = styled.div`
font-family: 'Noto Sans KR', sans-serif;
display: flex;
text-align:center;
flex-direction: column;
height:100%;
&>div{
  overflow-y:scroll;
  height:800px;
  display: flex;
  justify-content: space-around;
  flex-flow: row wrap;
}
  &:focus{
    outline: 0;
  }
`;

const SliderWrap = styled.div`
display:flex;
justify-content: center;
align-items: center;
max-width:100%;
overflow-x:hidden;
height: calc(100vh - 76px);
&>div{
  width:100%;
  height:90%;
  border: 1px solid ${colors.gray};
  &>div{
    height:100%;
  }
}
`;

const ButtonCss = css`
  margin-top:30px;
  /* position:absolute; */
  /* bottom:10%; */
  /* max-width:80%; */
  border-radius:30px;
`;

export default MakePWorkbook;
