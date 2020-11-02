import React from 'react';
import styled, { css } from "styled-components";
import viewport from "../../constants/viewport";
import Problem, { PviewProps } from "../../components/views/viewproblem";
type sizeType = "small" | "medium" | "large";

interface workbookProps {
    title: string;
    size: sizeType;
    estext?: boolean;
    problems?: PviewProps[];
}
function viewWorkbook({ title, size, problems, estext }: workbookProps) {
    if (size === "small")
        return (
            <Wrap smallsize>
                <div>
                    <Title size={size} estext={estext}>{title}</Title>
                </div>
            </Wrap>
        )
    return (
        <Wrap>
            <div>
                <Title size={size} estext={estext}>{title}</Title>
                <Result>
                    {problems && problems.map((data) => <Problem title={data.title}
                        subtitle={data.subtitle} src={data.src} size="medium"
                    />)}
                </Result>
            </div>
        </Wrap>
    );
}
const Wrap = styled.div<{ smallsize?: boolean }>`
max-width: ${viewport.desktop};
&> div{
    display: flex;
    height: 100%;
    flex-direction: column;
    ${({ smallsize }) =>
        smallsize && css`
            flex-direction:row;
            max-height:100px;
        `}
}
`;
const Title = styled.div<{ estext?: boolean, size: sizeType }>`

${({ estext }) => estext && css`
        overflow:hidden;
        text-overflow:ellipsis;
        white-space:nowrap;
    `}
    ${({ size }) => Settitle(size)}
`;

const Settitle = (size: sizeType) => {
    switch (size) {
        case "small":
            return css`
            font-size:20px;
            font-weight: 600;
            `
        case "medium":
            return css`
            font-size:17px;
            font-weight: 700;
            `
        case "large":
            return css`
            font-size:18px;
            font-weight: 800;
            `
    }
}

const Result = styled.div`
display: flex;

`;
export default viewWorkbook;
