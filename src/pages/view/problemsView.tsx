import React from "react";
import Layout from "../../components/layout";
import styled from "styled-components";
import ViewPboard from "../../components/views/viewproblem";
import viewport from "../../constants/viewport";

function ProblemView({ match }: any) {
  const { title, subtitle, img } = match.params;
  //get problemdata 
  return (
    <Layout title={title}>
      <Wrap>
        <ViewPboard size="large" title={title} subtitle={subtitle} src={img} />
      </Wrap>
    </Layout>);
}

const Wrap = styled.div`
  margin: 0px auto;
  padding: 0px 80px;
  height:90%;
  max-width: ${viewport.desktop};
  &>div{
    height:100%;
    display:flex;
    flex-direction: column;
    justify-content:center;
  }
  
`;

export default ProblemView;
