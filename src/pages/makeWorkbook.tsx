import React, { useState } from "react";
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
        <SearchWrap>
          <form onSubmit={handleSubmit(OnSubmit)}>
            <select>
              <option value="국어">국어</option>
              <option value="영어">영어</option>
              <option value="수학">수학</option>
              <option value="과학">과학</option>
            </select>

            <input type="text" name="title" placeholder="문제집 이름을 입력하세요" onChange={e => settitle(e.target.value)} />

            <div id="search" style={{ display: "flex", alignItems: "center" }}>
              <input type="text" placeholder="찾고있는 문제을 검색하세요" />
              <div style={{ padding: "5px", display: "flex" }}>
                {SearchIcon}
              </div>
            </div>
            <Result User={false} update={update} delupdate={delupdate} />
            <Button css={ButtonCss}>완성</Button>
          </form>
        </SearchWrap>

        <SliderWrap>
          <Slider {...settings}>
            <Problems>
              <Headding tag="h6" tagStyle="h5">{title}</Headding>
              <div>
                {workbook.length > 0 ? workbook.map((data) => <Item key={data.pid} title={data.title} src={data.img} size="medium" />
                ) : "문제를 선택해서 문제집을 만들어 보세요!"}
              </div>
            </Problems>
            <Problems>
              <Headding tag="h6" tagStyle="h5">{title} 답지</Headding>
              {/* {answers.length > 0 ? answers.map((data) => <Items ></Items>) : "문제를 선택해서 문제집을 만들어 보세요!"} */}
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

const SearchWrap = styled.div`
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
  & > form > #search {
    padding: 0px 5px 0px 15px;
    font-size:14px;
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
  border-radius:30px;
`;
export default MakePWorkbook;
