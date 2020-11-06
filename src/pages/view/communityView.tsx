import React, { useState, useEffect } from 'react';
import Layout from "../../components/layout";
import styled from "styled-components";
import viewport from "../../constants/viewport";
import ViewCommunity from "../../components/views/viewcommunity";
import Input from "../../components/UI/Input";
import Get from "../../lib/api/get";
import Make from "../../lib/api/make";
import { useHistory } from "react-router-dom";
function CommunityView({ match }: any) {
    const history = useHistory();
    const { id } = match.params;
    const [Item, setItems] = useState<any>("");
    const [text, settext] = useState("");
    useEffect(() => {
        Get().Getsomeofcommunity({ id: id }).then(res => {
            console.log(res);
            setItems(res);
        }).catch(err => console.log(err)
        );
    }, []);

    return (
        <Layout title={id}>
            <Wrap>
                <ViewCommunity title={Item.title} size="large" contents={Item.text} CommentItem={Item.comment} src={Item.image} />
                <InputWrap>
                    <Input type="text" placeholder="댓글" onChange={e => settext(e.target.value)} />
                    <button onClick={() => { Make().MakeCommented({ id, text }); window.location.reload(); history.replace(window.location.pathname) }} >▶</button>
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