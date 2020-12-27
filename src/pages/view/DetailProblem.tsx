import React,{ useState, useEffect} from 'react';
import styled from 'styled-components'
import Get from '../../lib/api/get';
import Make from '../../lib/api/make';
import viewport from "../../constants/viewport";
import { toast } from 'react-toastify';

const Wrapper = styled.div`
display:flex;
flex-direction:column;
align-items:center;
justify-content:space-around;
height:100vh;
width:100%;
`
const TextWrapper = styled.span`
text-align:center;
`
const Title = styled.h1`
font-size:50px;
margin:0px;
`
const SubTitle = styled.h3``
const Img = styled.img`
min-width:30vw;
max-width:80vw;
max-height:70vh;
`
const Category = styled.div`
position:absolute;
top:20%;
right:10%;
@media (max-width: ${viewport.mobile}){
    right:-50%;
}
font-size:20px;
font-weight:600;
`
const View = styled.div`
width:90vw;
display:flex;
flex-wrap:wrap;
flex-direction:center;
justify-content:center;
`
const ViewItme = styled.span`
display:flex;
width:30vw;
flex-direction:center;
justify-content:center;
font-weight:700;

`
const Answer = styled.div``

function DetailProblem({match}:any) {
    const [state, setstate]=useState({
            answer: '',
            category: '',
            image: '',
            problem_type: '',
            sub_title: '',
            title: '',
            view: '',
            get_answer: true
    });
    const [userAnswer,setuserAnswer]=useState("");
    // const [workbook, setworkbook] = useState<{id:any}[]>([]);
    useEffect(() => {
        Get().GetsomeofProblems(match.params).then(res => {
            console.log(res);
			setstate({...res,get_answer:true});
		  }).catch(err => console.log(err)
		  );
    },[]);
    
    return (
         <>
                {state.title == null ? 'There is not page 404' :
                    <Wrapper>

                        <TextWrapper>
                            <Title>{state.title}</Title>
                            <SubTitle>{state.sub_title}</SubTitle>
                        </TextWrapper>

                        <Category>과목 : {state.category}</Category>
                        <Img src={state.image}></Img>
                        {state.problem_type === "true" &&
                            <View>
                                <ViewItme>1. {state.view[0]}</ViewItme>
                                <ViewItme>2. {state.view[1]}</ViewItme>
                                <ViewItme>3. {state.view[2]}</ViewItme>
                                <ViewItme>4. {state.view[3]}</ViewItme>
                                <ViewItme>5. {state.view[4]}</ViewItme>
                            </View>
                        }

                        {state.get_answer ? <button onClick={() => {
                            if(userAnswer!==state.answer)
                            {
                                toast.error("틀렸습니다 실패");
                                let Id=match.params.id;
                                setTimeout(()=>{
                                    if(window.confirm("오답노트에 추가할까요?")){
                                        // alert(workbo/ok);
                                        Make().addWrongNote({problem:[{Id}]});
                                    }
                                    else{
                                        alert("error");
                                    }
                                },3000)
                            }
                            else{ 
                                toast.success("성공 정답입니다!")
                            }
                            setstate({...state, get_answer: false });
                            }}>정답확인</button> : <Answer>{state.answer}</Answer>}
                        <input type="text" onChange={e=>setuserAnswer(e.target.value)}/>
                    </Wrapper>
                }

            </>
    );
}

export default DetailProblem;