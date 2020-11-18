import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import Slider from 'react-slick';

import Image, { Icon } from '../lib/images';
import color from '../constants/colors';
import Input, { WrapInput } from '../components/UI/Input';
import Button from '../components/UI/Button';
import User from '../hooks/useUsers';

// import { toast } from "react-toastify";
function SignUp() {
	const { register, handleSubmit, watch, errors } = useForm({
		mode: 'onChange',
	});
	var settings = {
		dots: true,
		infinite: true,
		speed: 500,
		slidesToShow: 1,
		slidesToScroll: 1,
	};
	const history = useHistory();
	const password = watch('password');

	function onSubmit(data: any) {
		User().SignUp(data);
		alert('회원가입이 완료 되었습니다.');
		history.replace('/');
	}

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
				<form onSubmit={handleSubmit(onSubmit)}>
					<img
						src={Icon.clear}
						alt=""
						className="back"
						onClick={() => history.replace('/')}
					/>

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

					<SliderWrap>
						<Slider {...settings}>
							<SliderItem>
								<WrapInput fieldName="이름" error={errors.name}>
									<Input
										type="text"
										name="name"
										autoComplete="username"
										ref={register({
											required: '이름을 입력해주세요',
										})}
									/>
								</WrapInput>
                <WrapInput fieldName="나이" error={errors.age}>
									<Input
										type="text"
										name="age"
										autoComplete="userage"
										ref={register({
											required: '나이를 적어주세요!',
										})}
									/>
								</WrapInput>
							
							</SliderItem>
							<SliderItem>
								<WrapInput fieldName="아이디" error={errors.id}>
									<Input
										type="text"
										name="id"
										autoComplete="userid"
										ref={register({
											required: '아이디를 입력해주세요!.',
											minLength: {
												value: 6,
												message: '아이디는 6자 이상이어야 합니다.',
											},
										})}
									/>
								</WrapInput>
							</SliderItem>

							<SliderItem>
								<WrapInput fieldName="비밀번호" error={errors.password}>
									<Input
										type="password"
										name="password"
										autoComplete="password"
										ref={register({
											required: '비밀번호를 입력해주세요',
											minLength: {
												value: 8,
												message: '비밀번호는 8자 이상이어야 합니다.',
											},
										})}
									/>
								</WrapInput>
								<WrapInput
									fieldName="비밀번호 확인"
									error={errors.passwordAccept}
								>
									<Input
										type="password"
										autoComplete="new-password"
										name="passwordAccept"
										ref={register({
											validate: (value) =>
												password === value || '비밀번호를 다시 확인해주세요.',
										})}
									/>
								</WrapInput>
							</SliderItem>

							<SliderItem>
								<WrapInput fieldName="이메일" error={errors.email}>
									<Input
										type="text"
										autoComplete="email"
										name="email"
										ref={register({
											required: '이메일을 입력해주세요!',
											pattern: {
												message: '이메일을 다시확인해주세요.',
												value: /.com$/,
											},
										})}
									/>
								</WrapInput>
								<div>email check</div>
							</SliderItem>
							<div>
								<div style={{ marginTop: '30px' }}>
									<Button>회원가입</Button>
								</div>
							</div>
						</Slider>
					</SliderWrap>
				</form>
			</Wrap>
		</>
	);
}
const Wrap = styled.div`
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
		& > .back {
			position: absolute;
			top: 1%;
			right: 1%;
			cursor: pointer;
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
	& > div {
    display:flex;
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
	max-width: 50%;
	overflow-x: hidden;
	height: 100%;
	/* height: calc(100vh - 76px); */
	& > div {
		width: 100%;
		height: 80%;
		& > .slick-list {
			height: 100%;
			/* & > div > div > div {
				width: 100%;
			} */
		}
	}
`;
const SliderItem = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	padding: 10px;
	& > div > label > input {
		max-width: 300px;
	}
`;
export default SignUp;
