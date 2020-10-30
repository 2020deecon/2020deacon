import React from "react";
import Layout from "../../components/layout";
import styled from "styled-components";
import viewport from "../../constants/viewport";
import colors from "../../constants/colors";
import { Icon } from "../../lib/images";
import Headding from "../../components/UI/Headding";
import Viewproblem from "../../components/views/viewproblem";

function workbookView({ match }: any) {
    const { title } = match.params;

    return (
        <Layout title={title}>
            <Wrap>
                <Title>
                    <Headding tag="h2" tagStyle="h3">{title}</Headding>
                    <img src={Icon.print} width="24px" height="24px" />
                </Title>
                <div>
                    <Viewproblem title={title} size="medium" />
                    <Viewproblem title={title} size="medium" />
                    <Viewproblem title={title} size="medium" />
                    <Viewproblem title={title} size="medium" />
                    <Viewproblem title={title} size="medium" />
                    <Viewproblem title={title} size="medium" />
                    <Viewproblem title={title} size="medium" />
                    <Viewproblem title={title} size="medium" />
                    <Viewproblem title={title} size="medium" />
                    <Viewproblem title={title} size="medium" />
                </div>
            </Wrap>
        </Layout>
    );
}
const Title = styled.div`
height:10%;
display: flex;
align-items: center;
justify-content: center;
position: relative;
height:10%;
&>img{
    position: absolute;
    right:10px;
}
`;

const Wrap = styled.div`
  margin: 0px auto;
  padding: 0px 80px;
  max-width: ${viewport.desktop};
  height: 100%;
  &>div{
    display:flex;
    flex-flow:row wrap;
    justify-content:space-around;
    border:1px solid ${colors.gray};
  }
`;

export default workbookView;