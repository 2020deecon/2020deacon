import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { RootState } from '../../store/reducers';
import { useHistory } from 'react-router-dom';

import Modal from '../UI/Modal';
import useModal from '../../hooks/useModal';
import Slider from 'react-slick';
import {mypage} from '../../lib/images/Tutorial';
import viewport from '../../constants/viewport';

function ExplanModal() {
	const [id, setid] = useState(window.location.pathname);
	const { closed, Open } = useModal('explan');
	useEffect(() => {
		setid(window.location.pathname);
		if (window.location.pathname.indexOf('/explan/') !== -1) Open();
	}, [window.location.pathname]);

	const settings = {
		dots: true,
		infinite: true,
		speed: 500,
		slidesToShow: 1,
		slidesToScroll: 1,
		touchMove: true,
		accessibility: true,
		adaptiveHeight: true,
		arrows: true,
		mobileFirst: true,
	};

	const MakeProblem = () => (
		<Modal title="문제만들기" modalname="explan">
			<Slider {...settings}>
				<SliderItem>
					<div className="test">
					<img src={mypage.myp1} alt=""/>
					<div className="test">test1</div>
					</div>
				</SliderItem>
				<SliderItem>
					<div>
					<img src={mypage.myp1} alt=""/>
					<div className="test">test1</div>
					</div>
				</SliderItem>
				<SliderItem>
					<div>
					<img src={mypage.myp1} alt=""/>
					<div className="test">test1</div>
					</div>
				</SliderItem>
				<SliderItem>
					<div>
					<img src={mypage.myp1} alt=""/>
					<div className="test">test1</div>
					</div>
				</SliderItem>
			</Slider>
		</Modal>
	);
	const MakeWorkbook = () => (
		<Modal title="문제만들기" modalname="explan">
			<Slider {...settings}>
			<SliderItem>
					<div className="test">
					<img src={mypage.myp1} alt=""/>
					<div className="test">test1</div>
					</div>
				</SliderItem>
				<SliderItem>
					<div>
					<img src={mypage.myp1} alt=""/>
					<div className="test">test1</div>
					</div>
				</SliderItem>
				<SliderItem>
					<div>
					<img src={mypage.myp1} alt=""/>
					<div className="test">test1</div>
					</div>
				</SliderItem>
				<SliderItem>
					<div>
					<img src={mypage.myp1} alt=""/>
					<div className="test">test1</div>
					</div>
				</SliderItem>
			</Slider>
		</Modal>
	);
	const MyPage = () => (
		<Modal title="문제만들기" modalname="explan">
			<Slider {...settings}>
			<SliderItem>
					<div className="test">
					<img src={mypage.myp1} alt=""/>
					<div className="test">test1</div>
					</div>
				</SliderItem>
				<SliderItem>
					<div>
					<img src={mypage.myp1} alt=""/>
					<div className="test">test1</div>
					</div>
				</SliderItem>
				<SliderItem>
					<div>
					<img src={mypage.myp1} alt=""/>
					<div className="test">test1</div>
					</div>
				</SliderItem>
				<SliderItem>
					<div>
					<img src={mypage.myp1} alt=""/>
					<div className="test">test1</div>
					</div>
				</SliderItem>
			</Slider>
		</Modal>
	);
	const Community = () => (
		<Modal title="문제만들기" modalname="explan">
			<Slider {...settings}>
			<SliderItem>
					<div className="test">
					<img src={mypage.myp1} alt=""/>
					<div className="test">test1</div>
					</div>
				</SliderItem>
				<SliderItem>
					<div>
					<img src={mypage.myp1} alt=""/>
					<div className="test">test1</div>
					</div>
				</SliderItem>
				<SliderItem>
					<div>
					<img src={mypage.myp1} alt=""/>
					<div className="test">test1</div>
					</div>
				</SliderItem>
				<SliderItem>
					<div>
					<img src={mypage.myp1} alt=""/>
					<div className="test">test1</div>
					</div>
				</SliderItem>
			</Slider>
		</Modal>
	);
	const solving = () => (
		<Modal title="문제만들기" modalname="explan">
			<Slider {...settings}>
			<SliderItem>
					<div className="test">
					<img src={mypage.myp1} alt=""/>
					<div className="test">test1</div>
					</div>
				</SliderItem>
				<SliderItem>
					<div>
					<img src={mypage.myp1} alt=""/>
					<div className="test">test1</div>
					</div>
				</SliderItem>
				<SliderItem>
					<div>
					<img src={mypage.myp1} alt=""/>
					<div className="test">test1</div>
					</div>
				</SliderItem>
				<SliderItem>
					<div>
					<img src={mypage.myp1} alt=""/>
					<div className="test">test1</div>
					</div>
				</SliderItem>
			</Slider>
		</Modal>
	);

	switch (id) {
		case '/explan/problems':
			return MakeProblem();
		case '/explan/workbook':
			return MakeWorkbook();
		case '/explan/':
			return solving();
		case '/explan/mypage':
			return MyPage();
		case '/explan/community':
			return Community();
	}
	return null;
}
const SliderItem = styled.div`
/* position: relative; */
width: 100%;
	max-height: 300px;
&>div{
	/* position: absolute; */
	margin-left:50px;
	display: flex;
	right:0;
	bottom:50%;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	height:100%;
	width:100%;
	&>img{
		max-width: 500px;
		max-height: 450px;
	}

}
	
	height: 300px;
	@media (max-width:${viewport.mobile}){
		&>div{
			margin-left:30px;
			&>img{
				max-width:400px;
			}
		}
	}	
`;
export default ExplanModal;
