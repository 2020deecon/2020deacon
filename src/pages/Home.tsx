import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import ReactFullpage from '@fullpage/react-fullpage';

import Layout from '../components/layout';
import Button from '../components/UI/Button';
import Frame from '../components/home/frame';

import viewport from '../constants/viewport';
import Image from '../lib/images';
import useModal from '../hooks/useModal';

function Home() {
	const {Open}=useModal('explan');
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
										src={Image.makeproblem}
										title="자신에게 필요한 문제를 직접 만들어보세요!"
										subtitle="나만의 문제 만드는 법 알아보기>"
										linkto="/explan/problems"
										Open={Open}
									/>
								</div>
								<div className="section">
									<Frame
										src={Image.academi}
										title="자신에게 필요한 문제만을 골라서 문제집을 만들어 보세요!"
										subtitle="나만의 문제집 만드는 법 알아보기>"
										linkto="/explan/workbook"
										Open={Open}
									/>
								</div>

								<div className="section">
									<Frame
										src={Image.share}
										title="다양한 문제,문제집을 풀어보세요!"
										subtitle="문제,문제집 푸는 법 알아보기>"
										linkto="/explan/soving"
										Open={Open}
										reverse
									/>
								</div>
								<div className="section">
									<Frame
										src={Image.discussion}
										title="다양한 문제에 대해서 이야기 해봐요!"
										subtitle="커뮤니티 이용방법 알아보기>"
										linkto="/explan/community"
										Open={Open}
									/>
								</div>
								<div className="section">
									<Frame
										src={Image.questions}
										title="다양한 사람들이 공유한 문제들도 풀어보세요!"
										subtitle="내 패이지 이용방법 알아보기>"
										linkto="/explan/mypage"
										Open={Open}
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
export default Home;
