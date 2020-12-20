import React, { useState, useEffect } from 'react';
import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';

import viewport from '../../constants/viewport';
import colors from '../../constants/colors';

import Headding from '../UI/Headding';
import Button from '../UI/Button';
import Ul, { Li } from '../UI/Ul';

import { getuserToken,delToken } from '../../lib/token';
import { Icon } from '../../lib/images';
import User from '../../hooks/useUsers';
function Header() {
	const [params, setparams] = useState(window.location.pathname);
	const history = useHistory();
	const [id, setid] = useState(getuserToken());
	const [mobilenav, setmobilenav] = useState(false);

	useEffect(() => {
		setparams(window.location.pathname);
		User().checkToken();
	}, [window.location.pathname]);
	

	console.log(getuserToken());
	
	useEffect(() => {
		setid(getuserToken());
	},[getuserToken()])
	// window.addEventListener('resize', function (event) {
	// 	console.log(
	// 		document.body.clientWidth +
	// 			' wide by ' +
	// 			document.body.clientHeight +
	// 			' high',
	// 	);
	// });
	const beforelogin = () => toast.error('로그인 후 이용하세요!');

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
						// login.logout();
						delToken();
						setid("");
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
								if (id === null) {
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
								if (id === null) {
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
								if (id === null) {
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
				<MobilWrap onoff={mobilenav} onClick={() => setmobilenav(false)}>
					<Mobilenav className="mobile mobiletable" onClick={(e) => e.stopPropagation()}>
						<div className="mobile" onClick={() => setmobilenav(false)}>
							<img src={Icon.listmake} alt="" />
						</div>
						<ul>
							<Li
								clicked={params === '/makeproblem'}
								onClick={() => {
									if (id === null)  {
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
									if (id === null) {
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
									if (id === null)  {
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
				</MobilWrap>

				<RightHeader islogin={false}>
					{id === null ? Blogin() : Flogin()}
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

const MobilWrap = styled.div<{ onoff: boolean }>`
display: ${({ onoff }) => (onoff ? 'flex' : 'none')};
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	background: rgba(0, 0, 0, 0.5);
	z-index: 3000;
	animation: appear 1.5s;
	@keyframes appear {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}
`;
const Mobilenav = styled.div`
	position: fixed;
	top: 0;
	left: 0;
	bottom: 0;
	background: ${colors.primary};
	width: 180px;

	& > .mobile {
		height:76px;
		padding:10px 0 0 20px;
		display:flex;
		align-items: center;
		cursor: pointer;
	}

	& > ul {
		padding: 0px;
		height: 100%;
		transition: width 1s;
		display: flex;
		line-height: 30px;
		flex-direction: column;
		width: 100%;
		&>li:last-child {
			border-bottom: 1px solid ${colors.border};
		}
		& > li {
			padding: 4px 5px;
			width: 100%;
			color: white;
			border-top: 1px solid ${colors.border};
			display:flex;
			align-items: center;
			justify-content:center;
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
