import React from "react";
import styled, { css } from "styled-components";
import Headding from "../UI/Headding";
import colors from "../../constants/colors";
import { Link } from "react-router-dom";
interface HomeFrameProps {
  src: string;
  title: string;
  subtitle?: string;
  reverse?: boolean;
  linkto?: string;
}
function Frame({ src, title, subtitle, reverse, linkto }: HomeFrameProps) {
  return (
    <Wrap reversy={reverse}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-around",
        }}
      >
        <Headding tag="h3" tagStyle="h4">
          {title}
        </Headding>
        <SubTitle>
          <Headding tag="h4" tagStyle="h5">
            <Link to={linkto ? linkto : ""}>
              {subtitle}
            </Link>

          </Headding>
        </SubTitle>
      </div>
      <div
        style={{
          width: "300px",
          height: "300px",
          display: "flex",
          overflow: "hidden",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <img src={src} alt="" style={{ width: "300px", height: "300px" }} />
      </div>
    </Wrap>
  );
}
const Wrap = styled.div<{ reversy?: boolean }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  ${({ reversy }) =>
    reversy &&
    css`
      flex-direction: row-reverse;
    `}
  height:100vh;
  padding:0px 50px;
`;
const SubTitle = styled.div`
margin-top:30px;
transition:color 1s;
display:flex;
&:hover{
  color:${colors.border};
}
`;
export default Frame;
