import React from 'react';
import Layout from "../../components/layout";
import styled from "styled-components";
import viewport from "../../constants/viewport";
import ViewCommunity from "../../components/views/viewcommunity";
import Input from "../../components/UI/Input";
function CommunityView({ match }: any) {
    const { title, subtitle, img } = match.params;

    return (
        <Layout title={title}>
            <Wrap>
                <ViewCommunity title={title} size="large" contents="동해물과 백두산이 마르고 닳도록 하느님이 보우하사 우리나라 만세 무궁화 삼천리 화려강산 대한사람 대한으로 길이 보전하세" />
                <InputWrap>
                    <Input type="text" placeholder="댓글" />
                    <button>▶</button>
                </InputWrap>

            </Wrap>
        </Layout>
    );
}
const Wrap = styled.div`
  margin: 0px auto;
  padding: 0px 70px;
  max-width: ${viewport.desktop};
  display:flex;
  flex-direction: column;
  align-items: center;
`;
const InputWrap = styled.div`
width:100%;
max-width: 80%;
display:flex;
position:relative;
&>button{
    position:absolute;
    right:0;
    display:flex;
    align-items:center;
    height:100%;
}
`;
export default CommunityView;