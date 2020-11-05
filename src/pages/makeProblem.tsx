import React, { useState, useEffect } from "react";
import Layout from "../components/layout";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import Input, { WrapInput } from "../components/UI/Input";
import Button from "../components/UI/Button";
import { useHistory } from "react-router-dom";
import viewport from "../constants/viewport";
import colors from "../constants/colors";
import Headding from "../components/UI/Headding";
import Make from "../lib/api/make";

function MakeProblem() {
  const history = useHistory();
  const { register, handleSubmit } = useForm();
  const [title, settitle] = useState("");
  const [subtitle, setsubtitle] = useState("");
  const [answer, setanswer] = useState("");
  const [img, setimg] = useState("");
  const [category, setcategory] = useState("국어");
  const [problemtype, setproblemtype] = useState(true);
  const [answers, setanswers] = useState([
    { id: 1, text: "" },
    { id: 2, text: "" },
    { id: 3, text: "" },
    { id: 4, text: "" },
    { id: 5, text: "" },
  ]);

  useEffect(() => {
    problemtype
      ? setanswers(
        answers.map((data) =>
          data.text !== "" ? { id: data.id, text: "" } : data
        )
      )
      : setanswer("");
  }, [problemtype]);


  function OnSubmit(data: any) {
    // console.log("make data" + data);
    // if (!problemtype)//주관식 등등
    // console.log(category);

    // alert(category);
    Make().Makeproblem({ title, subtitle, img, answer, problemtype, category: category });
    // else//객관식
    //   Make().Makeproblem({ title, subtitle, img, answer: answers, problemtype, category: data.category });

    // history.replace("/");
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

        alert("incodding");
        // const a = btoa(e.target.result);
        // console.log(e.target.result);
        // console.log(a);
        // console.log(atob(a));

      };
      reader.readAsDataURL(image.files![0]);
    }
  }

  return (
    <Layout>
      <Wrap>
        <form onSubmit={handleSubmit(OnSubmit)}>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <WrapInput fieldName="과목" None>
              <select onChange={e => setcategory(e.target.value)}>
                <option value="국어">국어</option>
                <option value="영어">영어</option>
                <option value="수학">수학</option>
                <option value="과학">과학</option>
              </select>
            </WrapInput>

            <WrapInput fieldName="문제 유형" None>
              <select
                onChange={(e) => setproblemtype(e.target.value !== "객관식")}
              >
                <option value="주관식">주관식</option>
                <option value="객관식">객관식</option>
                <option value="서술형">서술형</option>
              </select>
            </WrapInput>
          </div>

          <WrapInput fieldName="문제" None>
            <Input
              type="text"
              name="problemtitle"
              placeholder="문제명을 입력하세요"
              onChange={(e) => settitle(e.target.value)}
            />
          </WrapInput>
          <WrapInput fieldName="이미지" None>
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
          </WrapInput>
          <WrapInput fieldName="부제목" None>
            <Input
              type="text"
              name="problemsubtitle"
              placeholder="부제목을 입력하세요"
              ref={register({
                required: false,
              })}
              onChange={(e) => setsubtitle(e.target.value)}
            />
          </WrapInput>

          <WrapInput fieldName="답" None>
            {problemtype ? (
              <Input
                type="text"
                name="answer"
                ref={register({
                  required: "답을 입력해주세요",
                })}
                placeholder="답을 입력하세요"
                onChange={(e) => setanswer(e.target.value)}
              />
            ) : (
                <MultipleChoice>
                  <ol>
                    <li>
                      <Input
                        type="text"
                        name="answer1"
                        ref={register({
                          required: true,
                        })}
                        onChange={(e) =>
                          setanswers(
                            answers.map((data) =>
                              data.id === 1
                                ? { id: data.id, text: e.target.value }
                                : data
                            )
                          )
                        }
                      />
                    </li>
                    <li>
                      <Input
                        type="text"
                        name="answer2"
                        ref={register({
                          required: true,
                        })}
                        onChange={(e) =>
                          setanswers(
                            answers.map((data) =>
                              data.id === 2
                                ? { id: data.id, text: e.target.value }
                                : data
                            )
                          )
                        }
                      />
                    </li>
                    <li>
                      <Input
                        type="text"
                        name="answer3"
                        ref={register({
                          required: true,
                        })}
                        onChange={(e) =>
                          setanswers(
                            answers.map((data) =>
                              data.id === 3
                                ? { id: data.id, text: e.target.value }
                                : data
                            )
                          )
                        }
                      />
                    </li>
                    <li>
                      <Input
                        type="text"
                        name="answer4"
                        ref={register({
                          required: true,
                        })}
                        onChange={(e) =>
                          setanswers(
                            answers.map((data) =>
                              data.id === 4
                                ? { id: data.id, text: e.target.value }
                                : data
                            )
                          )
                        }
                      />
                    </li>
                    <li>
                      <Input
                        type="text"
                        name="answer5"
                        ref={register({
                          required: true,
                        })}
                        onChange={(e) =>
                          setanswers(
                            answers.map((data) =>
                              data.id === 5
                                ? { id: data.id, text: e.target.value }
                                : data
                            )
                          )
                        }
                      />
                    </li>
                  </ol>
                </MultipleChoice>
              )}
          </WrapInput>
          <Button>완성</Button>
        </form>
        <div>
          <Headding tag="h3" tagStyle="h4">
            {title || "문제명을 입력해 주세요."}
          </Headding>
          <label htmlFor="bin">
            <img
              style={{ maxWidth: "500px", maxHeight: "250px" }}
              id="image_section"
              src="https://via.placeholder.com/500x250.png/e5c7ff/ffffff/?text=grap Img"
            />
          </label>
          <div>{subtitle || "부제목을 입력해주세요"}</div>
          <div>{answer || "답을 작성해주세요"}</div>
          <AnswerWrap>
            {answers.map((data) =>
              data.text !== "" ? (
                <Answers>
                  <div>{data.id}.</div> {data.text}
                </Answers>
              ) : (
                  ""
                )
            )}
          </AnswerWrap>
        </div>
      </Wrap>
    </Layout>
  );
}
const AnswerWrap = styled.div`
  display: flex;
  flex-direction: column;
`;

const Answers = styled.div`
  display: flex;
  & > div {
    font-weight: 600;
  }
`;
const Wrap = styled.div`
  display: flex;
  align-items: center;
  max-width: ${viewport.desktop};
  padding: 0px 40px;
  margin: 0px auto;
  height: calc(100vh - 76px);
  & > form {
    display: flex;
    flex-direction: column;
    justify-content:space-around;
    border: 1px solid ${colors.border};
    padding: 20px 40px;
    border-radius: 20px;
    transition:height 1.5s;
    height:300px;
    width:100%;
    max-width:300px;
    @media (min-height:600px){
      height:500px;
    }
    
    & > button {
      border-radius: 50px;
    }
    max-height: 85%;
  }
  & > div {
    height: 85%;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content:center;
    margin-left: 30px;
  }
`;
const MultipleChoice = styled.div`
  display: flex;
  flex-flow: row wrap;
  max-height: 100px;
  overflow: auto;
  & > ol > li {
    margin: 10px 0px;
    /* width: auto; */
  }
`;
export default MakeProblem;
