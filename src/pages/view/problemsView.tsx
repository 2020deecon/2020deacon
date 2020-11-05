import React, { useState, useEffect } from "react";
import Layout from "../../components/layout";
import styled from "styled-components";
import ViewPboard from "../../components/views/viewproblem";
import viewport from "../../constants/viewport";
import Get from "../../lib/api/get";

function ProblemView({ match }: any) {
  const { id } = match.params;
  const [data, setdata] = useState<any>("");
  useEffect(() => {
    Get().GetsomeofProblems({ id: id }).then(res => {
      console.log(res);
      // setData(res);
      setdata(res);
    }).catch(err => console.log(err)
    );
  }, []);
  console.log(data);

  return (
    <Layout title="test">
      <Wrap>
        <ViewPboard size="large" title={data.title} subtitle={data.sub_title} src={data.image} />
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
