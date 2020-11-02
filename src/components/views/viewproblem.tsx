import React from 'react';
import styled, { css } from "styled-components";
import viewport from "../../constants/viewport";
type sizeType = "small" | "medium" | "large";

export interface PviewProps {
    title: string;
    subtitle?: string;
    src?: string;
    size?: sizeType;
    values?: string[];
    estext?: boolean;
}
function viewproblem({ size = "small", title, subtitle, values, src, estext }: PviewProps) {
    return (
        <Wrap>
            <div>
                <div style={{ maxWidth: "150px", textAlign: "center" }}>
                    <Title>
                        {size !== "small" ? <TitleText esptext={estext} size={size}>{title}</TitleText> : <TitleText esptext={estext} size={size}>{title}</TitleText>}
                    </Title>
                </div>
                <Body>
                    <Img src={src || "https://via.placeholder.com/500x250.png/e5c7ff/ffffff/?text=grap Img"} size={size} />
                    <TitleText size={size}>{subtitle}</TitleText>
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

const TitleText = styled.div<{ esptext?: boolean; size: sizeType }>`
white-space:pre-wrap;
    ${({ esptext }) =>
        esptext && css`
        overflow:hidden;
        text-overflow:ellipsis;
        white-space:nowrap;
        `}
        ${({ size }) =>
        Titletexttype(size)}
`;
const Titletexttype = (size: any) => {
    switch (size) {
        case 'small':
            return css`
                font-weight:400;
                font-size:15px;
            `;
        case 'medium':
            return css`
            font-weight:500;
            font-size:17px;
        `;
        case 'large':
            return css`
            font-weight:600;
            font-size:18px;
        `;
    }
};
const Wrap = styled.div`
max-width: ${viewport.desktop};
  &> div{
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

`;
const Img = styled.img<{ size: sizeType }>`
width: 100%;
height: 100%;
${({ size }) => Imgsizetype(size)}
`;
const Imgsizetype = (size: any) => {
    switch (size) {
        case 'small':
            return css`
max-width: 100px;
max-height: 100px;
`;
        case 'medium':
            return css`
max-width: 250px;
max-height: 250px;
`;
        case 'large':
            return css`
max-width: 500px;
max-height: 500px;
`;
    }
}
const Title = styled.div`
width: 100%;
/* display: flex;
align-items: center;
justify-content: center; */
white-space: nowrap;
`;
const Body = styled.div`
width: 100%;
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
/* text-align: center; */
`;
const Answers = styled.ol`
display: flex;
flex-flow: row wrap;
justify-content: space-around;
padding: 0px;
&> li::marker{
    margin-left: 10%;
}
&> li{
    margin: 0px 5% 0px 10%;
}
`;
export default viewproblem;