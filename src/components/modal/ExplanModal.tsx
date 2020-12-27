import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { RootState } from '../../store/reducers';
import { useHistory } from 'react-router-dom';

import Modal from '../UI/Modal';
import useModal from '../../hooks/useModal';
import Slider from 'react-slick';
import {mypage,makeproblem,makeworkbook,Comment,Solving} from '../../lib/images/Tutorial';
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
					<img src={makeproblem.mkp1} alt=""/>
					<div className="test">문제를 만들기에 들어가세요!</div>
					</div>
				</SliderItem>
				<SliderItem>
					<div>
					<img src={makeproblem.mkp2} alt=""/>
					<div className="test">문제를 정보를 입력하세요!</div>
					</div>
				</SliderItem>
				<SliderItem>
					<div>
					<img src={makeproblem.mkp3} alt=""/>
					<div className="test">등록 해주세요!</div>
					</div>
				</SliderItem>
			</Slider>
		</Modal>
	);
	const MakeWorkbook = () => (
		<Modal title="문제집 만들기" modalname="explan">
			<Slider {...settings}>
			<SliderItem>
					<div className="test">
					<img src={makeworkbook.mkw1} alt=""/>
					<div className="test">문제를 검색하세요!</div>
					</div>
				</SliderItem>
				<SliderItem>
					<div>
					<img src={makeworkbook.mkw2} alt=""/>
					<div className="test">문제를 선택하세요!</div>
					</div>
				</SliderItem>
				<SliderItem>
					<div>
					<img src={makeworkbook.mkw3} alt=""/>
					<div className="test">완성 버튼을 눌러주세요!</div>
					</div>
				</SliderItem>
			</Slider>
		</Modal>
	);
	const  solving= () => (
		<Modal title="문제 풀기" modalname="explan">
			<Slider {...settings}>
			<SliderItem>
					<div className="test">
					<img src={Solving.sov1} alt=""/>
					<div className="test">정답을 입력하고 확인해주세요!</div>
					</div>
				</SliderItem>
				<SliderItem>
					<div>
					<img src={Solving.sov2} alt=""/>
					<div className="test">틀리셨다면 오답노트에 저장!</div>
					</div>
				</SliderItem>
			</Slider>
		</Modal>
	);
	const Community = () => (
		<Modal title="커뮤니티" modalname="explan">
			<Slider {...settings}>
			<SliderItem>
					<div className="test">
					<img src={Comment.cm1} alt=""/>
					<div className="test">커뮤니티에 들어가세요!</div>
					</div>
				</SliderItem>
				<SliderItem>
					<div>
					<img src={Comment.cm2} alt=""/>
					<div className="test">클릭하시면 볼 수 있습니다!</div>
					</div>
				</SliderItem>
				<SliderItem>
					<div>
					<img src={Comment.cm3} alt=""/>
					<div className="test">등록도 할 수 있습니다!</div>
					</div>
				</SliderItem>
			</Slider>
		</Modal>
	);
	const MyPage = () => (
		<Modal title="마이 패이지" modalname="explan">
			<Slider {...settings}>
			<SliderItem>
					<div className="test">
					<img src={mypage.myp1} alt=""/>
					<div className="test">문제를 확인하세요!</div>
					</div>
				</SliderItem>
				<SliderItem>
					<div>
					<img src={mypage.myp1_1} alt=""/>
					<div className="test">문제를 클릭하면 문제를 볼 수 있습니다.</div>
					</div>
				</SliderItem>
				<SliderItem>
					<div>
					<img src={mypage.myp2} alt=""/>
					<div className="test">나만의 문제집도 있습니다!</div>
					</div>
				</SliderItem>
				<SliderItem>
					<div>
					<img src={mypage.myp2_1} alt=""/>
					<div className="test">문제집을 클리하면 문제들을 볼 수 있습니다.</div>
					</div>
				</SliderItem>
				<SliderItem>
					<div>
					<img src={mypage.myp2_2} alt=""/>
					<div className="test">답을 확인해보세요!</div>
					</div>
				</SliderItem>
				<SliderItem>
					<div>
					<img src={mypage.myp3} alt=""/>
					<div className="test">틀렸던 문제를 오답노트에서 확인해 보세요.</div>
					</div>
				</SliderItem>
				<SliderItem>
					<div>
					<img src={mypage.myp4_1} alt=""/>
					<div className="test">공유된 문제도 볼 수 있습니다.</div>
					</div>
				</SliderItem>
				<SliderItem>
					<div>
					<img src={mypage.myp4_2} alt=""/>
					<div className="test">공유된 문제집도 볼 수 있습니다.</div>
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
		case '/explan/soving':
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
