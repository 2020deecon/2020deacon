import React, { useState, useEffect } from "react";
import Layout from "../components/layout";
import styled, { css } from "styled-components";
import viewport from "../constants/viewport";
import Button from "../components/UI/Button";
import colors from "../constants/colors";
import { Icon } from "../lib/images";
import Input from "../components/UI/Input";
import PData from "../components/views/viewproblem";
import WData from "../components/views/viewWorkbook";
import { useHistory, Link } from "react-router-dom";
import Get from "../lib/api/get";

type What = "나만의 문제" | "나만의 문제집" | "공유된 자료";

function Mypage() {
  const [what, setwhat] = useState<What>("나만의 문제");
  const [Text, setText] = useState("");
  const [whatsearch, setSearch] = useState("problem");
  const [problemItems, setproblemItems] = useState<any[]>([]);
  const [workbookItems, setworkbookItems] = useState<any[]>([]);
  useEffect(() => {
    if (what === "공유된 자료")
      return;
    if (what !== "나만의 문제집")
      Get().GetmyWorkbook().then(res => {
        // alert("fads");
        setworkbookItems(res);
        console.log(res);
      }).catch(err => {
        console.log(err);
      })
    else {
      Get().GetallWorkbooks().then(res => {
        setworkbookItems(res);
        console.log(res);
      }).catch(err => {
        console.log(err);
      })
    }
  }, [what]);

  useEffect(() => {
    if (whatsearch === "problem")
      Get().GetallProblems().then(res => {
        // alert("test");
        setproblemItems(res);

      }).catch(err => {
        console.log(err);
      })
    else
      Get().GetallWorkbooks().then(res => {
        setproblemItems(res);
      }).catch(err => {
        console.log(err);
      })
  }, [whatsearch]);
  return (
    <Layout>
      <Wrap>
        <div className="select_form">
          <Button
            color={colors.primary}
            back={colors.white}
            hov={colors.gray}
            onClick={() => setwhat("나만의 문제")}
            className={what === "나만의 문제" ? "click" : ""}
          >
            나만의 문제
          </Button>
          <Button
            color={colors.primary}
            back={colors.white}
            hov={colors.gray}
            onClick={() => setwhat("나만의 문제집")}
            className={what === "나만의 문제집" ? "click" : ""}
          >
            나만의 문제집
          </Button>
          <Button
            color={colors.primary}
            back={colors.white}
            hov={colors.gray}
            onClick={() => setwhat("공유된 자료")}
            className={what === "공유된 자료" ? "click" : ""}
          >
            공유된 자료
          </Button>
        </div>

        <SelectPData set={what}>
          <div className="set_data_sort">
            <div className="select_data">
              <input id="dpb" type="radio" name="pb" onChange={e => setSearch(e.target.checked ? "problem" : "workbooks")} checked={whatsearch === "problem"} />
              <label htmlFor="dpb">문제</label>
              <input id="dpbs" type="radio" name="pb" onChange={e => setSearch(e.target.checked ? "workbooks" : "problem")} checked={whatsearch === "workbooks"} />
              <label htmlFor="dpbs">문제집</label>
            </div>
            <div className="searchBox">
              <Input type="text" onChange={e => setText(e.target.value)} />
              <button><img src={Icon.search} alt="" /></button>
            </div>
          </div>
          {what !== "공유된 자료" ? <Results set={what} problemItems={problemItems} workbookItems={workbookItems} Text={Text} /> : <SearchResults select={whatsearch} problemItems={problemItems} workbookItems={workbookItems} Text={Text} />}
        </SelectPData>
      </Wrap>
    </Layout>
  );
}
interface ResultsType {
  set: What;
  problemItems: any[];
  workbookItems: any[];
  Text: string;
}

function Results({ set, problemItems, workbookItems, Text }: ResultsType) {
  const history = useHistory();
  function clickPb(title: string) {
    history.replace("/viewproblem/" + title);
  }
  function clickWb(title: string) {
    history.replace("/viewworkbook/" + title);
  }
  if (set !== "나만의 문제집") {
    return (
      <ResultWrap>
        {problemItems.map((data) =>

          data.title.includes(Text) ?
            <>
              <Link to={`/popup/${data._id}`} target="_blank">
                <PData title={data.title} size="medium" estext src={data.image} />
              </Link>
            </>
            : ""
        )}
      </ResultWrap>
    );
  }

  else {
    return (
      < ResultWrap workbook >
        {
          workbookItems.map((data) =>
            data.title.includes(Text) ?
              <>
                <div onClick={() => clickWb(data.id)} style={{ cursor: "pointer" }}>
                  <WData size="small" title={data.title} />
                </div>
              </>
              : ""
          )
        }
      </ResultWrap >
    )
  }


}
interface SearchResultsType {
  select: string;
  problemItems: any[];
  workbookItems: any[];
  Text: string;
}
const SearchResults = ({ select, problemItems, workbookItems }: SearchResultsType) => {
  console.log(problemItems);
  const history = useHistory();
  function clickPb(title: string) {
    history.replace("/viewproblem/" + title);
  }
  function clickWb(title: string) {
    history.replace("/viewworkbook/" + title);
  }
  // <Link to={`/popup/${data.pid}`} target="_blank">
  //           <Item key={data.pid} title={data.title} src={data.img} size="medium" />
  //         </Link>
  if (select === "problem") {
    // alert("tseat");
    return (
      <ResultWrap>
        {problemItems.map((data) =>
          <>
            <Link to={`/popup/${data.pid}`} target="_blank">
              <PData title={data.title} size="medium" estext src={data.image} />
            </Link>
          </>
        )}
      </ResultWrap>
    )
  }

  else {

    return (
      < ResultWrap workbook >
        {
          workbookItems.map((data) =>
            <>
              <div onClick={() => clickWb(data.id)} style={{ cursor: "pointer" }}>
                <WData size="small" title={data.title} />
              </div>
            </>
          )
        }
      </ResultWrap >
    )
  }
}
const Wrap = styled.div`
  max-width: ${viewport.desktop};
  padding: 0px 40px;
  margin: 0px auto;
  display: flex;
  align-items: center;
  height:100%;
  @media (max-width: ${viewport.mobile}){
    display:flex;
    flex-direction: column;
    align-items: center;
  }
  & > .select_form {
    max-width: 300px;
    width: 100%;
    height: 100%;
    max-height: 95%;
    border: 1px solid ${colors.gray};
    border-right:none;
    & > .click {
      background: ${colors.gray};
      border: ${colors.gray};
      color: ${colors.white};
    }
  }
`;

const SelectPData = styled.div<{ set: What }>`    
    width: 100%;
    display:flex;
    flex-direction: column;
    border-left:none;
    border: 1px solid ${colors.gray};
    height: 100%;
    max-height: 95%;

    & > .set_data_sort {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 50px;
      position: relative;
      border-bottom: 1px solid ${colors.gray};
      &>.select_data{
        ${({ set }) => set !== "공유된 자료" && css`
        display:none;
        `}
        position: absolute;
        left:1%;
        &>label{
          margin-right:10px;
        }
      }
      &>.searchBox{
        display:flex;
        background: ${colors.border};
        border-radius:20px;
        &>img{
          margin-right: 10px;
        }
      }      
    }
`;

const ResultWrap = styled.div<{ workbook?: boolean }>`
      height: calc(100% - 50px);
      display: flex;
      flex-flow: row wrap;
      justify-content: space-around;
      overflow-y:scroll;
      ${({ workbook }) => workbook && css`
        flex-flow: column nowrap;
        justify-content:none;
      `}
`;

export default Mypage;
