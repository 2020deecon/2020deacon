import React, { useState } from 'react';
import { AnimateSharedLayout, AnimatePresence, motion } from 'framer-motion';
import '../styles/test.css';
import { Item } from '../components/communtiy/Item.jsx';
import { List } from '../components/communtiy/List.jsx';
import Layout from '../components/layout';
import Input from '../components/UI/Input';
import { Icon } from '../lib/images';
import styled, { css } from 'styled-components';
import viewport from "../constants/viewport";
import colors from '../constants/colors';

function Newcommuntiy({ match }: any) {
	let { id } = match.params;
	const imageHasLoaded = true;
	console.log(id);
	const [Text, setText] = useState('');
	const [gotop,setgotop] = useState(window.pageYOffset===0);
	
	window.onscroll = function () {
		setgotop(window.pageYOffset===0);
	}
	return (
		<Layout title="communtiy">
			<Wrap>
				<SearchBox>
					<div>
						<Input type="text" onChange={(e) => setText(e.target.value)} />
						<div className="searchIcon">
							<button>
								<img src={Icon.search} />
							</button>
						</div>
					</div>
				</SearchBox>

				<AnimateSharedLayout type="crossfade">
					<List selectedId={id} />
					<AnimatePresence>
						{id && imageHasLoaded && <Item id={id} key="item" />}
					</AnimatePresence>
				</AnimateSharedLayout>
				<Navigation onoff={gotop}>
					<div>▲</div>
				</Navigation>
			</Wrap>
		</Layout>
	);
}
const Wrap = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  margin: 0px auto;
  padding: 0px 80px;
  max-width: ${viewport.desktop};
  width:100%;
  height: 100%;
`;
const Navigation= styled.div<{onoff:boolean}>`
width:50px;
height:50px;
border-radius:50px;
background:${colors.gray};
position: fixed;
bottom: 5%;
right:3%;
display:${({onoff})=>onoff ? "none" : "flex"};
justify-content: center;
align-items: center;
&>div{
	display:flex;
	/* width:100%;
	height:100%; */
}
`;
const SearchBox = styled.div`
	width: 100%;
	& > div {
		margin: 10px 5px;
		display: flex;
		justify-content: center;
		& > input {
			text-align: center;
		}
		& > .searchIcon {
			display: flex;
			justify-content: center;
			align-items: center;
			border-radius: 50%;
			background:${colors.gray};
			cursor: pointer;
			& > button {
				display: flex;
			}
		}
	}
`;
export default Newcommuntiy;
