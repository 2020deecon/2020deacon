import React, { useState, useEffect } from "react";
import Layout from "../../components/layout";
import styled from "styled-components";
import viewport from "../../constants/viewport";
import colors from "../../constants/colors";
import { Icon } from "../../lib/images";
import Headding from "../../components/UI/Headding";
import Viewproblem from "../../components/views/viewproblem";
import Get from "../../lib/api/get";
function WorkbookView({ match }: any) {
    const { id } = match.params;
    const [data, setdata] = useState<any>("");
    useEffect(() => {
        Get().GetsomeofWorkbooks({ id: id }).then(res => {
            console.log(res);
            // setData(res);
            setdata(res);
        }).catch(err => console.log(err)
        );
    }, []);
    return (
        <Layout title={data.title}>
            <Wrap>
                <Title>
                    <Headding tag="h2" tagStyle="h3">{data.title}</Headding>
                    <img src={Icon.print} width="24px" height="24px" />
                </Title>
                <div>
                    {/* {data}
                    <Viewproblem title={title} size="medium" />
                    <Viewproblem title={title} size="medium" />
                    <Viewproblem title={title} size="medium" />
                    <Viewproblem title={title} size="medium" />
                     */}
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

export default WorkbookView;