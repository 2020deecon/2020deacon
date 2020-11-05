import React, { useEffect } from "react";
import Layout from "../components/layout";
import Button from "../components/UI/Button";
import styled from "styled-components";
import viewport from "../constants/viewport";
import { Link } from "react-router-dom";
import Image from "../lib/images";
import Frame from "../components/home/frame";
import { getUser } from "../store/slices/auth";
import { useDispatch } from "react-redux";

function Home() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUser());
  }, []);
  return (
    <Layout title="home">
      <Wrap>
        <Frame
          src={Image.academi}
          title="자신에게 필요한 문제만을 골라서 문제집를 만들어 보세요!"
          subtitle="나만의 문제 만들러가기>"
          linkto="/makeproblem"
        />
        <Frame
          src={Image.share}
          title="다양한 문제,문제집를 만들어 사람들과 공유하세요!"
          subtitle="문제,문제집 공유하기>"
          linkto="/makeworkbook"
          reverse
        />

        <Frame
          src={Image.discussion}
          title="다양한 문제에 대해서 토론를 해봐요!"
          subtitle="커뮤니티 둘러보기>"
          linkto="/community"
        />
        <Frame
          src={Image.questions}
          title="다양한 사람들이 올린 문제들도 풀어보세요!"
          subtitle="내 패이지로 가기>"
          linkto="/mypage"
          reverse
        />
        <div style={{ marginBottom: "30px" }}>
          <Link to="signup">
            <Button>시작하기</Button>
          </Link>
        </div>
      </Wrap>
    </Layout>
  );
}
const Wrap = styled.div`
  margin: 0px auto;
  padding: 0px 80px;
  max-width: ${viewport.desktop};
  display: flex;
  flex-flow: column nowrap;
  /* scroll-behavior: smooth; */
  scroll-snap-type: y mandatory;
`;
export default Home;
