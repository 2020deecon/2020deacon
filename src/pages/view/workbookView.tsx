import React, { useState, useEffect } from "react";
import Layout from "../../components/layout";
import styled from "styled-components";
import viewport from "../../constants/viewport";
import colors from "../../constants/colors";
import { Icon } from "../../lib/images";
import Headding from "../../components/UI/Headding";
import Viewproblem from "../../components/views/viewproblem";
import Get from "../../lib/api/get";
import { useHistory, Link } from "react-router-dom";
import DetailsView from "./DetailProblem";

function WorkbookView({ match }: any) {
    const { id } = match.params;
    const [problems, setproblems] = useState<any[]>([]);
    const [title, settitle] = useState("");
    const [answer, setanswer]=useState(false);
    useEffect(() => {
        Get().GetsomeofWorkbooks({ id: id }).then(res => {
            console.log(res);
            setproblems(res.problems);
            settitle(res.title);
        }).catch(err => console.log(err)
        );
    }, []);
    const answers=()=>{
        return (
            <ol>
                {problems.map(data =><li>{data.answer}</li>)}
            </ol>
        )
    }
    return (
        <Layout title={title}>
            <Wrap>
                <Title>
                    <Headding tag="h2" tagStyle="h3">{title}</Headding>
                    <AnswerOrQestion onClick={()=>setanswer(!answer)}>{ !answer ? "답지보기" : "문제보기"}</AnswerOrQestion>
                    <img src={Icon.print} width="24px" height="24px" onClick={()=>window.print()}/>
                </Title>
                <div>
                    { !answer ? problems.map((v: any) =>
                        <Link to={`/popup/${v._id}`} target="_blank">
                            <Viewproblem title={v.title} size="medium" src={v.image} />
                        </Link>
                    ) : answers()}
                    
                </div>
            </Wrap>
        </Layout>
    );
}
const AnswerOrQestion=styled.div`
    @media print {
        display: none;
    }
`;
const Title = styled.div`
height:10%;
display: flex;
align-items: center;
justify-content: center;
position: relative;
height:10%;
@media print {
&>img { display:none; }
}
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