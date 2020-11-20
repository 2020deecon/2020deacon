import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import ReactFullpage from '@fullpage/react-fullpage';
import { motion, AnimateSharedLayout } from 'framer-motion';

import Layout from '../components/layout';
import Button from '../components/UI/Button';
import Frame from '../components/home/frame';

import { getUser } from '../store/slices/auth';
import viewport from '../constants/viewport';
import Image from '../lib/images';
function Home() {
	const dispatch = useDispatch();
	const colors = ['#ff0055', '#0099ff', '#22cc88', '#ffaa00', '#ffaa00'];
	const [selected, setSelected] = useState(colors[0]);

	useEffect(() => {
		dispatch(getUser());
	}, []);

	return (
		<Layout title="home">
			<Wrap>
				<ReactFullpage
					licenseKey={'YOUR_KEY_HERE'}
					scrollingSpeed={600}
					recordHistory={true}
					scrollOverflow={true}
					navigation={true}
					responsiveHeight={100}
					
					cardsOptions= {{perspective: 100, fadeContent: true, fadeBackground: true}}
					render={({ state, fullpageApi }: any) => {
						return (
							<ReactFullpage.Wrapper>
								<div className="section">
									<Frame
										src={Image.academi}
										title="자신에게 필요한 문제만을 골라서 문제집을 만들어 보세요!"
										subtitle="나만의 문제 만드는 법 알아보기>"
										linkto="/makeproblem"
									/>
								</div>
								<div className="section">
									<Frame
										src={Image.share}
										title="다양한 문제,문제집을 만들어 사람들과 공유하세요!"
										subtitle="문제,문제집 공유하는 법 알아보기>"
										linkto="/makeworkbook"
										reverse
									/>
								</div>
								<div className="section">
									<Frame
										src={Image.discussion}
										title="다양한 문제에 대해서 이야기 해봐요!"
										subtitle="커뮤니티 둘러보기>"
										linkto="/community"
									/>
								</div>
								<div className="section">
									<Frame
										src={Image.questions}
										title="다양한 사람들이 공유한 문제들도 풀어보세요!"
										subtitle="내 패이지 이용방법 알아보기>"
										linkto="/mypage"
										reverse
									/>
								</div>
								<div className="section">
									<Start>
										<img
											src={Image.together}
											alt=""
											style={{ width: '300px', height: '300px' }}
										/>
										<Link to="signup">
											<Button>시작해볼까요 ?</Button>
										</Link>
									</Start>
								</div>
							</ReactFullpage.Wrapper>
						);
					}}
				/>
			</Wrap>
			{/* <Navigation>
				<AnimateSharedLayout>
					<Ul>
						<li className="topbottom">└</li>
						{colors.map((color) => (
							<Item
								key={color}
								color={color}
								isSelected={selected === color}
								onClick={() => setSelected(color)}
							/>
						))}
						<li className="topbottom">ㄱ</li>
					</Ul>
				</AnimateSharedLayout>
			</Navigation> */}
		</Layout>
	);
}
const Wrap = styled.div`
	margin: 0px auto;
	padding: 0px 80px;
	max-width: ${viewport.desktop};
	display: flex;
	flex-flow: column nowrap;
	/* scroll-behavior: smooth; */
	scroll-snap-type: y mandatory;
	@media (max-width: ${viewport.mobile}) {
		margin: 0px;
		padding: 0px;
	}
`;
const Start = styled.div`
	display: flex;
	align-items: center;
	flex-direction: column;
	justify-content: center;
	& > a {
		max-width: 500px;
		width: 100%;
	}
`;
interface ItemProps {
	color: string;
	isSelected: boolean;
	onClick: () => void;
}
function Item({ color, isSelected, onClick }: ItemProps) {
	const spring = {
		type: 'spring',
		stiffness: 500,
		damping: 30,
	};
	return (
		<li className="item" onClick={onClick} style={{ backgroundColor: color }}>
			{isSelected && (
				<motion.div
					layoutId="outline"
					className="outline"
					initial={false}
					animate={{ borderColor: color }}
					transition={spring}
				/>
			)}
		</li>
	);
}

// const Navigation = styled.div`
// 	position: absolute;
// 	right: 0;
// 	top: 50%;
// 	transform: rotate(90deg);
// 	transform: translate(-50%, -50%);
// `;

// const Ul = styled.ul`
// 	list-style: none;
// 	margin: 0;
// 	padding: 0;
// 	display: flex;
// 	flex-direction: row;
// 	flex-wrap: wrap;
// 	justify-content: center;

// 	/* width: 280px;
// 	height: 280px; */
// 	transform: rotate(90deg);
// 	& > .topbottom {
// 		transform: rotate(45deg);
// 	}
// 	& > .item {
// 		display: block;
// 		width: 10px;
// 		height: 10px;
// 		border-radius: 50%;
// 		margin: 20px;
// 		position: relative;
// 		cursor: pointer;
// 		flex-shrink: 0;
// 		& > .outline {
// 			position: absolute;
// 			top: -8px;
// 			left: -8px;
// 			right: -8px;
// 			bottom: -8px;
// 			border: 4px solid white;
// 			border-radius: 50%;
// 		}
// 	}
// `;
export default Home;
