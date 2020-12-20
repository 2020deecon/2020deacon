import React,{useEffect} from 'react';
import styled, { css } from 'styled-components';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import { Helmet } from 'react-helmet';

import Image, { Icon } from '../lib/images';
import viewport from '../constants/viewport';
import color from '../constants/colors';
import Button from '../components/UI/Button';
import User from '../hooks/useUsers';

import {getToken} from '../lib/token';
function Loginpage() {
	const { register, handleSubmit } = useForm();
	const history = useHistory();
	// const dispatch = useDispatch();
	function OnSubmit(data: any) {
		User().Login(data);
		history.replace("/");
	}
	// useEffect(() => {
	// 	if(getToken()!=null){
	// 		User().checkToken();
			
	// 	}
	// },[getToken()])

	return (
		<>
			<Helmet>
				<link
					href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@300&display=swap"
					rel="stylesheet"
				/>
				<title>login</title>
			</Helmet>
			<Wrap>
				<form onSubmit={handleSubmit(OnSubmit)}>
					<img
						src={Icon.clear}
						alt=""
						className="back"
						onClick={() => history.replace('/')}
					/>
					<img src={Image.login} alt="" className="logo" />
					<div>
						<Title>Login</Title>
						<InputWrap text="아이디">
							<Input type="text" name="id" ref={register({ required: true })} />
						</InputWrap>
						<InputWrap text="비밀번호">
							<Input
								type="password"
								name="password"
								ref={register({ required: true })}
							/>
						</InputWrap>

						<Button css={buttoncss}>로그인</Button>

						<Goto>
							<div className="question">개정이 없으신가요?</div>
							<div
								className="gotosignup"
								onClick={() => history.replace('/signup')}
							>
								새로운 개정 만들기
							</div>
						</Goto>
					</div>
				</form>
			</Wrap>
		</>
	);
}

const Wrap = styled.div`
	position: fixed;
	top: 0;
	bottom: 0;
	left: 0;
	right: 0;
	background: linear-gradient(
		to left,
		${color.primary},
		${color.border},
		#9198e5
	);
	display: flex;
	align-items: center;
	justify-content: center;
	flex-flow: column nowrap;
	height: 100vh;
	width: 100%;
	@media (max-width: ${viewport.mobile}) {
		height: 100%;
	}
	& > form {
		background: white;
		display: flex;
		align-items: center;
		justify-content: space-around;
		max-width: 60%;
		max-height: 70%;
		width: 100%;
		height: 100%;
		border-radius: 20px;
		position: relative;
		@media (max-width: ${viewport.mobile}) {
			justify-content: center;
			max-height: 40%;
			& > .logo {
				display: none;
			}
		}
		& > #triangle-right {
			width: 0;
			height: 0;
			position: absolute;
			left: 0;
			top: 10%;
			/*
      border-top: 350px solid transparent;
      border-left: 100px solid ${color.border};
      border-bottom: 150px solid transparent; */

			/* border-bottom: 450px solid ${color.border};
      border-right: 500px solid transparent;
	  border-radius: 20px; */
			opacity: 0.5;
		}
		& > .back {
			position: absolute;
			top: 1%;
			right: 1%;
			cursor: pointer;
		}

		& > img {
			max-width: 300px;
			max-height: 300px;
		}
		& > div {
			margin-right: 30px;
			display: flex;
			flex-direction: column;
			justify-content: center;
			line-height: 30px;
			position: relative;
		}
	}
`;
const buttoncss = css`
	border-radius: 20px;
	margin-top: 30px;
	max-width: 200px;
`;

const Title = styled.h2`
	font-family: 'Open Sans';
	font-weight: 700;
	font-size: 40px;
	color: ${color.primary};
	/* color: linear-gradient(to right, ${color.primary},${color.border},#9198e5); */
`;
const InputWrap = styled.div<{ text: string }>`
	position: relative;
	&::before {
		position: absolute;
		font-size: 12px;
		content: '${({ text }) => text}';
		top: 0;
		color: gray;
	}
	padding-top: 20px;
`;
const Input = styled.input`
	border: none;
	border-bottom: 2px solid ${color.border};
	font-size: 16px;

	&:focus {
		outline: 0;
		border-bottom: 3px solid ${color.border};
	}

	&:-webkit-autofill {
		-webkit-box-shadow: 0 0 0 30px white inset !important;
	}
`;

const Goto = styled.div`
	font-size: 14px;
	margin-top: 10px;
	color: gray;
	display: flex;
	bottom: 0;
	& > .question {
		margin-right: 10px;
	}
	& > .gotosignup {
		color: ${color.primary};
		font-weight: 600;
		cursor: pointer;
		transition: color 0.8;
		&:hover {
			color: ${color.border};
		}
	}
`;
export default Loginpage;
