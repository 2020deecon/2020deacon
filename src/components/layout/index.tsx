import React from "react";
import styled, { createGlobalStyle } from "styled-components";
import { Helmet } from "react-helmet";
import Header from "./Header";

interface Header {
  title?: string;
  children?: React.ReactNode;
} 
function index({ title, children }: Header) {
  return (
    <>
      <Helmet>
        <link
          href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@300&display=swap"
          rel="stylesheet"
        />
        {title && <title>{title}</title>}
      </Helmet>
      <Wrap>
        <GlobalStyle />
        <Header />
        <article>{children}</article>
      </Wrap>
    </>
  );
}
const GlobalStyle = createGlobalStyle`
body{
  /* scroll-behavior: smooth; */
  margin:0;
  scroll-snap-type: y proximity;
}
*{
  margin: 0;
  border: 0;
  font-family: 'Open Sans', sans-serif;
  box-sizing: border-box;
}
a{
  color: inherit;
  text-decoration: none;
}
ul{
  list-style-type: none;
}
select{
  display: block;
  &:focus{
    outline: 0;
  }
}
input{
  &:focus{
    outline: 0;
  }
  border: none;
  background: none;
}

button{
  &:focus{
    outline: 0;
  }
  background: none;
  cursor: pointer;
}
ol{
  padding-left:20px;
}
`;

const Wrap = styled.div`
  /* min-height: 50vh; */
  width: 100%;
  display: flex;
  flex-direction: column;
  & > article {
    margin-top: 76px;
    height: calc(100vh - 76px);
  }
`;
export default index;
