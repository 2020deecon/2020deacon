import React, { Component } from 'react'
import axios from 'axios'
import styled from 'styled-components'
const Wrapper = styled.div`
display:flex;
flex-direction:column;
align-items:center;
justify-content:space-around;
height:100vh;
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
/* width:40vw; */
min-width:30vw;
max-width:80vw;
max-height:80vh;
`
const Category = styled.div`
width:80vw;
flex-direction:row;
justify-items:right;
text-align:right;
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


export default class DetailProblem extends Component {
    constructor(props) {
        super(props)
        this.state = {
            answer: '',
            category: '',
            image: '',
            problem_type: '',
            sub_title: '',
            title: '',
            view: '',
            get_answer: true
        }
        console.log()

    }
    componentDidMount() {
        axios.get('http://3.35.16.85:3000//detailProblem?id=' + this.props.match.params.id).then(
            res => {
                console.log(res)
                this.setState({
                    answer: res.data.data.answer,
                    category: res.data.data.category,
                    image: res.data.data.image,
                    problem_type: res.data.data.problem_type,
                    sub_title: res.data.data.sub_title,
                    title: res.data.data.title,
                    view: res.data.data.view
                })
            }
        ).catch(err => console.log(err))
    }
    

    render() {
        return (
            <>
                {this.state.title == null ? 'There is not page 404' :
                    <Wrapper>

                        <TextWrapper>
                            <Title>{this.state.title}</Title>
                            <SubTitle>{this.state.sub_title}</SubTitle>
                        </TextWrapper>

                        <Category>과목 : {this.state.category}</Category>
                        <Img src={this.state.image}></Img>
                        {this.state.problem_type == true &&
                            <View>
                                <ViewItme>1. {this.state.view[0]}</ViewItme>
                                <ViewItme>2. {this.state.view[1]}</ViewItme>
                                <ViewItme>3. {this.state.view[2]}</ViewItme>
                                <ViewItme>4. {this.state.view[3]}</ViewItme>
                                <ViewItme>5. {this.state.view[4]}</ViewItme>

                            </View>
                        }


                        {this.state.get_answer ? <button onClick={() => this.setState({ get_answer: false })}>정답확인</button> : <Answer>{this.state.answer}</Answer>}

                    </Wrapper>
                }

            </>
        )
    }
}
