import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { RootState } from '../../store/reducers';
import { useHistory } from 'react-router-dom';

import Modal from '../UI/Modal';
import useModal from '../../hooks/useModal';
import Slider from 'react-slick';


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
	};

	const MakeProblem = () => (
		<Modal title="문제만들기" modalname="explan">
			<Slider {...settings}>
				<SliderItem>
					<div className="test">test1</div>
				</SliderItem>
				<SliderItem>
					<div>test1</div>
				</SliderItem>
				<SliderItem>
					<div>test1</div>
				</SliderItem>
				<SliderItem>
					<div>test1</div>
				</SliderItem>
			</Slider>
		</Modal>
	);
	const MakeWorkbook = () => (
		<Modal title="문제만들기" modalname="explan">
			<Slider {...settings}>
				<SliderItem>
					<div>test2</div>
				</SliderItem>
				<SliderItem>
					<div>test2</div>
				</SliderItem>
				<SliderItem>
					<div>test2</div>
				</SliderItem>
				<SliderItem>
					<div>test2</div>
				</SliderItem>
			</Slider>
		</Modal>
	);
	const MyPage = () => (
		<Modal title="문제만들기" modalname="explan">
			<Slider {...settings}>
				<SliderItem>
					<div>test3</div>
				</SliderItem>
			</Slider>
		</Modal>
	);
	const Community = () => (
		<Modal title="문제만들기" modalname="explan">
			<Slider {...settings}>
				<SliderItem>
					<div>test4</div>
				</SliderItem>
				<SliderItem>
					<div>test3</div>
				</SliderItem>
				<SliderItem>
					<div>test3</div>
				</SliderItem>
				<SliderItem>
					<div>test3</div>
				</SliderItem>
			</Slider>
		</Modal>
	);
	const solving = () => (
		<Modal title="문제만들기" modalname="explan">
			<Slider {...settings}>
				<SliderItem>
					<div>test4</div>
				</SliderItem>
				<SliderItem>
					<div>test3</div>
				</SliderItem>
				<SliderItem>
					<div>test3</div>
				</SliderItem>
				<SliderItem>
					<div>test3</div>
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
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	max-width: 300px;
	width: 100%;
	max-height: 300px;
	height: 100%;
`;
export default ExplanModal;
