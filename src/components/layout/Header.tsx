import React, { useState, useEffect } from 'react';
import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import {toast } from 'react-toastify';


import viewport from '../../constants/viewport';
import colors from '../../constants/colors';

import Headding from '../UI/Headding';
import Button from '../UI/Button';
import Ul, { Li } from '../UI/Ul';

import useLogin from '../../hooks/useLogin';
import useModal from '../../hooks/useModal';
import { getuserToken } from '../../lib/token';
import { Icon } from '../../lib/images';
function Header() {
	const [params, setparams] = useState(window.location.pathname);
	const login = useLogin();
	const history = useHistory();
	const [id, setid] = useState(getuserToken());
	const [mobilenav, setmobilenav] = useState(false);
	const { Open } = useModal('explan');

	useEffect(() => {
		if (id === null && login.isLogin === true) {
			setTimeout(() => {
				window.location.reload();
			}, 1000);
			return;
		}
	}, [id]);

	useEffect(() => {
		setparams(window.location.pathname);
	}, [window.location.pathname]);

	window.addEventListener('resize', function (event) {
		console.log(
			document.body.clientWidth +
				' wide by ' +
				document.body.clientHeight +
				' high',
		);
	});
	const beforelogin=()=>toast.error("로그인 후 이용하세요!");

	const Blogin = () => {
		return (
			<>
				<Button
					css={buttoncss}
					onClick={() => {
						history.replace('/login');
					}}
				>
					로그인
				</Button>
				<Button css={buttoncss}>
					<Link to="/signup">회원가입</Link>
				</Button>
			</>
		);
	};

	const Flogin = () => {
		return (
			<>
				<UserName>{id != 'undefined' && id != null ? id + '님' : ''}</UserName>
				<Button
					onClick={() => {
						login.logout();
						window.location.reload();
					}}
				>
					<Link to="/">로그아웃</Link>
				</Button>
			</>
		);
	};
	return (
		<>
		<Wrap>
			<LeftHeader>
				<div className="mobile" onClick={() => setmobilenav(true)}>
					<img src={Icon.listmake} alt="" />
				</div>

				<Title>
					<Headding tag="h2" tagStyle="h3">
						<Link to="/">
							<Title1>connec</Title1>
							<Title2>Text</Title2>
						</Link>
					</Headding>
				</Title>

				<Ul>
					<Li
						clicked={params === '/makeproblem'}
						onClick={() => {
							if (!login.isLogin) {
								
								beforelogin();
								history.replace('/');
							}
						}}
					>
						<b>
							<Link to="/makeproblem">문제만들기</Link>
						</b>
					</Li>
					<Li
						clicked={params === '/makeworkbook'}
						onClick={() => {
							if (!login.isLogin) {
								
								beforelogin();
								history.replace('/');
							}
						}}
					>
						<b>
							<Link to="/makeworkbook">문제집만들기</Link>
						</b>
					</Li>
					<Li
						clicked={params === '/mypage'}
						onClick={() => {
							if (!login.isLogin) {					
								beforelogin();
								history.replace('/');
							}
						}}
					>
						<b>
							<Link to="/mypage">마이 페이지</Link>
						</b>
					</Li>
					<Li clicked={params === '/community'}>
						<b>
							<Link to="/community">커뮤니티</Link>
						</b>
					</Li>
				</Ul>
			</LeftHeader>
			<Mobilenav className="mobile mobiletable" onoff={mobilenav}>
				<div className="mobile" onClick={() => setmobilenav(false)}>
					<img src={Icon.listmake} alt="" />
				</div>
				<ul>
					<Li
						clicked={params === '/makeproblem'}
						onClick={() => {
							if (!login.isLogin) {
								beforelogin();
								history.replace('/');
							}
						}}
					>
						<img src={Icon.add} alt="" />
						<b>
							<Link to="/makeproblem">문제만들기</Link>
						</b>
					</Li>

					<Li
						clicked={params === '/makeworkbook'}
						onClick={() => {
							if (!login.isLogin) {
								beforelogin();
								history.replace('/');
							}
						}}
					>
						<img src={Icon.workbook} alt="" />
						<b>
							<Link to="/makeworkbook">문제집만들기</Link>
						</b>
					</Li>
					<Li
						clicked={params === '/mypage'}
						onClick={() => {
							if (!login.isLogin) {
								beforelogin();
								history.replace('/');
							}
						}}
					>
						<img src={Icon.user} alt="" />
						<b>
							<Link to="/mypage">마이 페이지</Link>
						</b>
					</Li>
					<Li clicked={params === '/community'}>
						<img src={Icon.community} alt="" />
						<b>
							<Link to="/community">커뮤니티</Link>
						</b>
					</Li>
				</ul>
			</Mobilenav>
			<RightHeader islogin={false}>
				{!login.token ? Blogin() : Flogin()}
			</RightHeader>
		</Wrap>
		
		</>
	);
}

const Wrap = styled.div`
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin: 0 auto;
	padding: 10px 30px;

	height: 76px;
	z-index: 100;
	float: left;
	background: ${colors.white};
	@media (max-width: ${viewport.desktop}) {
		padding: 10px 20px;
	}
`;
const UserName = styled.div`
	height: 100%;
	font-weight: bold;
	font-size: 20px;
	margin-right: 20px;
	width: 100%;
`;
const Title = styled.div`
	color: ${colors.title};
	font-weight: 600;
	& > h2 > a {
		display: flex;
	}
`;
const Title1 = styled.div`
	font-weight: 600;
`;
const Title2 = styled.div`
	font-weight: 700;
`;
const Mobilenav = styled.div<{ onoff: boolean }>`
	position: absolute;
	left: 0;
	top: 0;
	background: ${colors.border};
	/* opacity: 0.7; */
	display: ${({ onoff }) => (onoff ? 'flex' : 'none')};
	/* padding:30px 40px; */
	height: 200vh;
	&>.mobile{
    position: absolute;
    top:10px;
  }
	/* transition: opacity 1s; */
	& > ul {
		padding: 0px;
		height: 100%;
		width: ${({ onoff }) => (onoff ? '150px' : '0px')};
		transition: width 1s;
		display: flex;
		line-height: 30px;
		flex-direction: column;
		width: 100%;
		& > li {
			padding-left:30px;
			background: #9198e5;
			width: 100%;
			color:white;
			border: 1px solid ${colors.gray};
		}
	}
`;
const LeftHeader = styled.div`
	display: flex;
	align-items: center;
	width: 100%;
	& > ul {
		width: 100%;
		max-width: 600px;
		@media (max-width: ${viewport.mobile}) {
			padding-left: 0px;
		}
	}
	& > .mobile {
		display: none;
		cursor: pointer;
		margin-right: 10px;
		margin-top: 5px;
		@media (max-width: ${viewport.mobile}) {
			display: flex;
		}
	}
	& > .mobiletable {
		display: none;
	}
`;
interface RightHeaderprops {
	islogin: boolean;
}
const RightHeader = styled.div<RightHeaderprops>`
	display: flex;
	align-items: center;
	width: 100%;
	max-width: 300px;
	${({ islogin }) =>
		islogin &&
		css`
			max-width: 200px;
		`}
	padding: 0 30px;
	& > button:first-child {
		margin-right: 20px;
	}
`;

const buttoncss = css`
	border-radius: 5px;
`;
export default Header;
