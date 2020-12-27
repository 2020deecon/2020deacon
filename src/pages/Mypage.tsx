import React, { useState, useEffect } from 'react';
import Layout from '../components/layout';
import styled, { css } from 'styled-components';
import viewport from '../constants/viewport';
import Button from '../components/UI/Button';
import colors from '../constants/colors';
import { Icon } from '../lib/images';
import Input from '../components/UI/Input';
import PData from '../components/views/viewproblem';
import WData from '../components/views/viewWorkbook';
import { useHistory, Link } from 'react-router-dom';
import Get from '../lib/api/get';

import User from '../hooks/useUsers';
import { getidToken, getToken } from '../lib/token';
import { toast } from 'react-toastify';

type What = '나만의 문제' | '나만의 문제집' | '공유된 자료' | "오답노트";

function Mypage() {
  const id=getidToken();
  // alert(id);
	const [what, setwhat] = useState<What>('나만의 문제');
  const [Text, setText] = useState('');
	const [whatsearch, setSearch] = useState('problem');
	const [problemItems, setproblemItems] = useState<any[]>([]);
	const [workbookItems, setworkbookItems] = useState<any[]>([]);
	const history = useHistory();
	const beforelogin = () => toast.error('로그인 후 이용하세요!');
	useEffect(() => {
		User().checkToken();
		if (!getToken()) {
			beforelogin();
			history.replace('/');
		}
	}, []);

	useEffect(() => {
		if (what === '공유된 자료') return;
		if (what === '나만의 문제')
			Get()
				.GetallProblems()
				.then((res) => {
					console.log(res);
					// setproblemItems(res);
					setproblemItems(res.filter((data:any)=> data.write_id===id));
				})
				.catch((err) => {
					console.log(err);
				});
		else if(what==="나만의 문제집"){
			Get()
				.GetallWorkbooks()
				.then((res) => {
					console.log(res);
					// alert("f");
					setworkbookItems(res.filter((data:any)=> data.write_id===id));
				})
				.catch((err) => {
					console.log(err);
				});
		}
		else if(what==="오답노트"){
			Get().GetWrongNote().then((res)=>{
				// alert(res);
				console.log(res);
				setproblemItems(res);
			})
			.catch((err)=>{
				console.log(err);
			});
		}
	}, [what]);

	useEffect(() => {
		if (whatsearch === 'problem' && what === '공유된 자료')
			Get()
				.GetallProblems()
				.then((res) => {
          			console.log(res);
					setproblemItems(res.filter((data:any)=> data.write_id!==id));
				})
				.catch((err) => {
					console.log(err);
				});
		else if(what === '공유된 자료')
			Get()
				.GetallWorkbooks()
				.then((res) => {
					
					console.log(res);
					setworkbookItems(res.filter((data:any)=> data.write_id!==id));
				})
				.catch((err) => {
					console.log(err);
				});
	}, [whatsearch,what]);

	return (
		<Layout>
			<Wrap>
				<div className="select_form">
					<Button
						color={colors.primary}
						back={colors.white}
						hov={colors.gray}
						onClick={() => setwhat('나만의 문제')}
						className={what === '나만의 문제' ? 'click' : ''}
					>
						나만의 문제
					</Button>
					<Button
						color={colors.primary}
						back={colors.white}
						hov={colors.gray}
						onClick={() => setwhat('나만의 문제집')}
						className={what === '나만의 문제집' ? 'click' : ''}
					>
						나만의 문제집
					</Button>
					<Button
						color={colors.primary}
						back={colors.white}
						hov={colors.gray}
						onClick={() => setwhat('오답노트')}
						className={what === '오답노트' ? 'click' : ''}
					>
						오 답 노 트 
					</Button>
					<Button
						color={colors.primary}
						back={colors.white}
						hov={colors.gray}
						onClick={() => setwhat('공유된 자료')}
						className={what === '공유된 자료' ? 'click' : ''}
					>
						공유된 자료
					</Button>
				</div>

				<SelectPData set={what}>
					<div className="set_data_sort">
						<div className="select_data">
							<input
								id="dpb"
								type="radio"
								name="pb"
								onChange={(e) =>
									setSearch(e.target.checked ? 'problem' : 'workbooks')
								}
								checked={whatsearch === 'problem'}
							/>
							<label htmlFor="dpb">문제</label>
							<input
								id="dpbs"
								type="radio"
								name="pb"
								onChange={(e) =>
									setSearch(e.target.checked ? 'workbooks' : 'problem')
								}
								checked={whatsearch === 'workbooks'}
							/>
							<label htmlFor="dpbs">문제집</label>
						</div>
						<div className="searchBox">
							<Input type="text" onChange={(e) => setText(e.target.value)} />
							<button>
								<img src={Icon.search} alt="" />
							</button>
						</div>
					</div>
					{what !== '공유된 자료' ? (
						<Results
							set={what}
							problemItems={problemItems}
							workbookItems={workbookItems}
							Text={Text}
						/>
					) : (
						<SearchResults
							select={whatsearch}
							problemItems={problemItems}
							workbookItems={workbookItems}
							Text={Text}
						/>
					)}
				</SelectPData>
			</Wrap>
		</Layout>
	);
}
interface ResultsType {
	set: What;
	problemItems: any[];
	workbookItems: any[];
	Text: string;
}

function Results({ set, problemItems, workbookItems, Text }: ResultsType) {
	const history = useHistory();
	function clickPb(title: string) {
		history.replace('/popup/' + title);
	}
	function clickWb(title: string) {
		history.replace('/viewworkbook/' + title);
	}
	if (set === '나만의 문제') {
		return (
			<ResultWrap>
				{problemItems
					? problemItems.map((data) =>
							data.title.includes(Text) ? (
								<>
									<Link to={`/popup/${data._id}`} target="_blank">
										<PData
											title={data.title}
											size="medium"
											estext
											src={data.image}
										/>
									</Link>
								</>
							) : (
								'문제가 없어요 문제를 만들어보세요!'
							),
					  )
					: '문제가 없어요 문제를 만들어보세요!'}
			</ResultWrap>
		);
	} else if(set==='나만의 문제집'){
		return (
			<ResultWrap workbook>
				{workbookItems
					? workbookItems.map((data) =>
							data.title.includes(Text) ? (
								<>
									<Link to={`/viewworkbook/${data.id}`} target="_blank">
										<PData
											title={data.title}
											size="medium"
											estext
											src={data.image}
										/>
									</Link>
								</>
							) : (
								'문제집이 없어요 문제집을 만들어 보세요!'
							),
					  )
					: '문제집이 없어요 문제집을 만들어 보세요!'}
			</ResultWrap>
		);
	}
	else{ 
		
		return (<ResultWrap>
			{problemItems ? problemItems.map(data=>data.title.includes(Text) ? (
								<>

										<Link to={`/popup/${data.id}`} target="_blank">

										<PData
											title={data.title}
											size="medium"
											estext
											src={data.image}
											/>
									
											</Link>
								</>
							) : (
								'그런 문제는 없습니다.'
							),
					  )
					: '오답이 없어요 대단해요!'}
		</ResultWrap>)
	}
}
interface SearchResultsType {
	select: string;
	problemItems: any[];
	workbookItems: any[];
	Text: string;
}
const SearchResults = ({
	select,
	problemItems,
	workbookItems,
	Text
}: SearchResultsType) => {
	console.log(problemItems);
	const history = useHistory();
	function clickPb(title: string) {
		history.replace('/viewproblem/' + title);
	}
	function clickWb(title: string) {
		history.replace('/viewworkbook/' + title);
	}
	if (select === 'problem') {
		return (
			<ResultWrap>
				{problemItems
					? problemItems.map((data) =>
							data.title.includes(Text) ? (
							<>
								<Link to={`/popup/${data._id}`} target="_blank">
									<PData
										title={data.title}
										size="medium"
										estext
										src={data.image}
									/>
								</Link>
							</>
					  ) : "")
					: ''}
			</ResultWrap>
		);
	} else {
    console.log(workbookItems);

		return (
			<ResultWrap workbook>
				{workbookItems
					? workbookItems.map((data) =>
							data.title.includes(Text) ? (
							<>
								<div
									onClick={() => clickWb(data.id)}
									style={{ cursor: 'pointer' }}
								>
									<WData size="small" title={data.title} />
								</div>
							</>
					  ) : "")
					: '문제집이 없어요 문제집을 만들어 보세요!'}
			</ResultWrap>
		);
	}
};
const Wrap = styled.div`
	max-width: ${viewport.desktop};
	padding: 0px 40px;
	margin: 0px auto;
	display: flex;
	align-items: center;
	height: 100%;
	& > .select_form {
		max-width: 300px;
		width: 100%;
		height: 100%;
		max-height: 95%;
		border: 1px solid ${colors.gray};
		display: flex;
		flex-direction: column;
		& > button {
			height: 50px;
		}
		& > .click {
			background: ${colors.gray};
			border: ${colors.gray};
			color: ${colors.white};
		}
	}
	@media (max-width: ${viewport.mobile}) {
		display: flex;
		flex-direction: column;
		align-items: center;
		padding: 20px 40px;
		& > .select_form {
			border: none;
			display: flex;
			flex-direction: row;
			width: 100%;
			height: auto;
			justify-content: space-between;
			max-width: none;
		}
	}
`;

const SelectPData = styled.div<{ set: What }>`
	width: 100%;
	display: flex;
	flex-direction: column;
	border-left: none;
	border: 1px solid ${colors.gray};
	height: 100%;
	max-height: 95%;

	& > .set_data_sort {
		display: flex;
		justify-content: center;
		align-items: center;
		height: 50px;
		position: relative;
		border-bottom: 1px solid ${colors.gray};
		& > .select_data {
			${({ set }) =>
				set !== '공유된 자료' &&
				css`
					display: none;
				`}
			position: absolute;
			left: 1%;
			& > label {
				margin-right: 10px;
			}
		}
		& > .searchBox {
			display: flex;
			& > input {
				text-align: center;
				padding: 0px 15px;
			}
			& > button {
				background: ${colors.gray};
				border-radius: 25px;
				display: flex;
				justify-content: center;
				align-items: center;
				width: 36px;
				height: 36px;
			}
		}
	}
`;

const ResultWrap = styled.div<{ workbook?: boolean }>`
	padding: 20px 0px;
	height: 100%;
	display: flex;
	flex-flow: row wrap;
	justify-content: space-around;
	overflow-y: scroll;
	${({ workbook }) =>
		workbook &&
		css`
			flex-flow: column nowrap;
			justify-content: start;
		`}
`;

export default Mypage;
