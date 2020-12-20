import React, { useState,useEffect } from 'react';
import { Helmet } from 'react-helmet';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import Slider from 'react-slick';

import viewport from '../constants/viewport';
import Image, { Icon } from '../lib/images';
import color from '../constants/colors';
import Input, { WrapInput } from '../components/UI/Input';
import Button from '../components/UI/Button';
import User from '../hooks/useUsers';

function SignUp() {
	const isEnglish=/[A-Za-z0-9]/;
	const iskorean = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/;
		const isNumber=/^[1-9]{10}$|^[1-4]{1}[0-9]{1}$|^50$/;
		const isEmail=/^[-!#$%& amp;'*+./0-9=?A-Z^_a-z{|}~]+@[-!#$%&'*+/0-9=?A-Z^_a-z{|}~]+.[-!#$%& amp;'*+./0-9=?A-Z^_a-z{|}~]+$/;		
	const history = useHistory();
	const [Submitdisable, setSubmitdisable]=useState(true);
	const [id, setid]=useState({
		text:"",
		error:{type:"",message:""},
	});
	const [age, setage]=useState({
		text:"",
		error:{type:"",message:""},
	});
	const [password, setpassword]=useState({
		text:"",
		error:{type:"",message:""},
	});
	const [repassword, setrepassword]=useState({
		text:"",
		error:{type:"",message:""},
	});
	const [name, setname]=useState({
		text:"",
		error:{type:"",message:""},
	});
	const [email, setemail]=useState({
		text:"",
		error:{type:"",message:""},
	});
	const checkdata=(data:any)=>{
		if(data.text!=="" && data.error.message==="")
			return true;
		else
			return false;
	}
	useEffect(() => {
		if(checkdata(id) && checkdata(password) 
		&& checkdata(repassword) && checkdata(email) 
		&& checkdata(age) && checkdata(name))
			setSubmitdisable(false);
		else
			setSubmitdisable(true);
	},[id,age,password,email,repassword,name])
	const onSubmit=()=>{
		User().SignUp({ id:id.text,age:age.text,password:password.text, name:name.text,email:email.text});
		history.replace('/');
	}

	const settings = {
		dots: true,
		infinite: true,
		speed: 500,
		slidesToShow: 1,
		slidesToScroll: 1,
		nextArrow: <Button id="startclick">회원가입 시작하기</Button>,
	};
	
	useEffect(()=>{
		//navgation start click
		var test=document.getElementById("startclick");
		if(test)
			test.onclick=()=>{
				if(test) 
					test.style.display="none";
			};
		
		//navgation false	
		var test2=document.getElementsByClassName("slick-dots");
		var array=test2[0].children;
		for(var i=0; i<2;i++){
			// console.log(array[i].children[0]);
			var t=array[i].children[0]as HTMLElement;
			t.onclick=null;
		}
	},[]);
	
	return (
		<>
			<Helmet>
				<link
					href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@300&display=swap"
					rel="stylesheet"
				/>
				<title>signup</title>
			</Helmet>

			<Wrap>
				<div>
					<img
						src={Icon.clear}
						alt=""
						className="back"
						onClick={() => history.replace('/')}
					/>

					<SliderWrap>
						<Slider {...settings}>
							<SliderItem>
								<div>
									<Title>SignUp</Title>
									<Goto>
										<img src={Image.signup} alt="" />
										<div>
											<div className="question">이미 계정이 있으신가요?</div>
											<div
												className="gotologin"
												onClick={() => history.replace('/login')}
											>
												로그인 하러가기
											</div>
										</div>
									</Goto>
								</div>
							</SliderItem>

							<SliderItem>
								<form>
									<div>
										<WrapInput fieldName="이름" error={name.error}>
											<Input
												type="text"
												name="name"
												autoComplete="username"
												value={name.text}
												onChange={e=> iskorean.test(e.target.value) ? setname({text:e.target.value,error:{type:
												"",message:""}}) : setname({text:e.target.value,error:{type:"",message:"이름을 입력해주세요"}})}
											/>
										</WrapInput>
										<WrapInput fieldName="나이" error={age.error}>
											<Input
												type="text"
												name="age"
												autoComplete="userage"
												value={age.text}
												onChange={e=> isNumber.test(e.target.value) ? setage({text:e.target.value,error:{type:
													"",message:""}}) : setage({text:e.target.value,error:{type:"",message:"나이를 적어주세요!"}})}
											/>
										</WrapInput>
										<WrapInput fieldName="아이디" error={id.error}>
											<Input
												type="text"
												name="id"
												autoComplete="userid"
												value={id.text}
												onChange={e=> isEnglish.test(e.target.value) && e.target.value.length>6 ? setid({text:e.target.value,error:{type:
													"",message:""}}) : setid({text:e.target.value,error:{type:"",message:"6자 이상이어야 합니다."}})}
											/>
										</WrapInput>
										<WrapInput fieldName="비밀번호" error={password.error}>
											<Input
												type="password"
												name="password"
												autoComplete="password"
												value={password.text}
												onChange={e=> isEnglish.test(e.target.value) && e.target.value.length>8 ? setpassword({text:e.target.value,error:{type:
													"",message:""}}) : setpassword({text:e.target.value,error:{type:"",message:"8자 이상이어야 합니다."}})}
											/>
										</WrapInput>
										<WrapInput
											fieldName="비밀번호 확인"
											error={repassword.error}
										>
											<Input
												type="password"
												autoComplete="re-password"
												name="passwordAccept"
												value={repassword.text}
												onChange={e=> isEnglish.test(e.target.value) && e.target.value===password.text ? setrepassword({text:e.target.value,error:{type:
													"",message:""}}) : setrepassword({text:e.target.value,error:{type:"",message:"비밀번호가 다릅니다."}})}
											/>
										</WrapInput>
										<WrapInput fieldName="이메일" error={email.error}>
											<Input
												type="text"
												autoComplete="email"
												name="email"
												// ref={register({
												// 	required: '이메일을 입력해주세요!',
												// 	pattern: {
												// 		message: '이메일을 다시확인해주세요.',
												// 		value: /.com$/,
												// 	},
												// })}
												value={email.text}
												onChange={e=> isEmail.test(e.target.value) ? setemail({text:e.target.value,error:{type:
													"",message:""}}) : setemail({text:e.target.value,error:{type:"",message:"이메일을 다시확인해주세요."}})}

											/>
										</WrapInput>
									</div>
									<label>
										<img
											src={Image.signin}
											alt=""
											style={{ maxWidth: '300px', maxHeight: '300px' }}
										/>
										<Button onClick={onSubmit} disabled={Submitdisable}>회원가입</Button>
									</label>
								</form>
							</SliderItem>
							{/* <SliderItem>
								<Completesignup>
									<img src={Image.email} alt="" />
									<div className="message">회원가입이 완료 되었습니다!</div>
									<div className="question">이메일 인증후 이용해주세요!</div>
									<Button onClick={() => history.replace('/')}>
										알겠습니다!
									</Button>
								</Completesignup>
							</SliderItem> */}
						</Slider>
					</SliderWrap>
				</div>
			</Wrap>
		</>
	);
}
const Wrap = styled.div`
	position: fixed;
	top: 0;
	bottom: 0;
	left: 0;
	right:0;
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
	
	& > div {
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

		& > .back {
			position: absolute;
			top: 1%;
			right: 1%;
			cursor: pointer;
		}
		& > div > ul {
			/* cursor: default; */
		}
	}
	@media (max-width: ${viewport.mobile}){
		height:100%;
		& > div {
			max-height: 60%;
		}
	}
`;

const Goto = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	font-size: 14px;
	margin-top: 10px;
	color: gray;
	width: 50%;
	@media (max-width: ${viewport.mobile}){

	}
	& > div {
		display: flex;
		flex-flow:row wrap;
		margin-top: 10px;
		width: 100%;
		max-width: 300px;
		& > .question {
			margin-right: 10px;
			display: flex;
		}
		& > .gotologin {
			display: flex;
			color: ${color.primary};
			font-weight: 600;
			cursor: pointer;
			transition: color 0.8;
			&:hover {
				color: ${color.border};
			}
		}
	}
	& > img {
		max-width: 300px;
		max-height: 300px;
	}
`;

const SliderWrap = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	max-width: 100%;
	overflow-x: hidden;
	height: 100%;

	& > div {
		width: 100%;
		height: 80%;
		& > .slick-list {
			height: 100%;		
			}
			&>button{
				position: fixed;
				max-width:200px;
				top: 50%;
  				left: 50%;
				transform: translate(-50%, 300%);
				&:before {
				content:none;
				}
			}		
		}
`;

const SliderItem = styled.div`
	&:focus {
		outline: none;
	}
	& > div {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		& > .message {
			font-weight: 600;
			font-size: 14px;
		}
		& > button {
			margin-top: 10px;
			 max-width: 200px;
		} 
		
	}
	& > form {
		display: flex;
		flex-flow: row nowrap;
		justify-content: space-between;
		align-items: center;
		height: 100%;
		padding: 0px 10%;
		@media (max-width: ${viewport.mobile}){
			flex-direction: column;
		}
		& > div {
			& > div {
				max-width: 300px;
				margin: 0 30px;
			}
		}
		& > label {
			@media (max-width: ${viewport.mobile}){
				&>img{
					display:none;
				}
			}
			& > button {
				margin-top: 10px;
				border-radius: 20px;
				width:100%;
			}
			max-width: 300px;
		}
	}
`;

const Title = styled.h2`
	font-family: 'Open Sans';
	font-weight: 700;
	font-size: 40px;
	color: ${color.primary};
	margin-top: 0px;
	/* color: linear-gradient(to right, ${color.primary},${color.border},#9198e5); */
`;

const Completesignup = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	font-size: 17px;
	line-height: 30px;
	& > img {
		max-width: 300px;
		max-height: 300px;
		width: 100%;
		height: 100%;
		margin-bottom: 10px;
	}
`;
export default SignUp;
