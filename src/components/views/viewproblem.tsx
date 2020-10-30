import React from 'react';
import styled, { css } from "styled-components";
import viewport from "../../constants/viewport";
import Headding from "../../components/UI/Headding";
type sizeType = "small" | "medium" | "large";

interface PviewProps {
    title: string;
    subtitle?: string;
    src?: string;
    size?: sizeType;
    values?: string[];

}
function viewproblem({ size = "small", title, subtitle, values, src }: PviewProps) {
    return (
        <Wrap>
            <div>
                <Title>
                    <Headding tag="h2" tagStyle="h3">{title}</Headding>
                </Title>
                <Body>
                    <Img src="https://via.placeholder.com/500x250.png/e5c7ff/ffffff/?text=grap Img" size={size} />
                    <Headding tag="h4" tagStyle="h5">{subtitle}</Headding>
                    <Answers>
                        {values ? values.map(value => <li>{value}</li>) : ""}
                        {/* <li>10</li>
                        <li>100</li>
                        <li>1000</li>
                        <li>10000</li>
                        <li>5</li> */}
                    </Answers>
                </Body>
            </div>
        </Wrap>
    );
}
const Wrap = styled.div`
  /* margin: 0px auto;
  padding: 0px 80px;
  height:90%; */
  max-width: ${viewport.desktop};
  &>div{
    height:100%;
    display:flex;
    flex-direction: column;
    justify-content:center;
  }
  
`;
const Img = styled.img<{ size: sizeType }>`
    ${({ size }) => Imgsizetype(size)}
`;
const Imgsizetype = (size: any) => {
    switch (size) {
        case 'small':
            return css`
                max-width:100px;
                max-height:100px;
            `;
        case 'medium':
            return css`
                max-width:250px;
                max-height:250px;
            `;
        case 'large':
            return css`
                max-width:500px;
                max-height:500px;
            `;
    }
}
const Title = styled.div`
width: 100%;
display: flex;
align-items: center;
justify-content: center;
`;
const Body = styled.div`
width: 100%;
display: flex;
flex-direction: column;
align-items: center;
`;
const Answers = styled.ol`
display: flex;
flex-flow: row wrap;
justify-content: space-around;

padding: 0px;
&>li::marker{
    margin-left:10%;
}
&>li{
    margin:0px 5% 0px 10%;
}
`;
export default viewproblem;