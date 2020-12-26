import React, { useState,useEffect } from 'react';
import { AnimateSharedLayout, AnimatePresence, motion } from 'framer-motion';
import '../styles/test.css';
import { Item } from '../components/communtiy/Item';
import { List } from '../components/communtiy/List.jsx';
import Layout from '../components/layout';
import Input from '../components/UI/Input';
import styled from 'styled-components';
import viewport from "../constants/viewport";
import colors from '../constants/colors';
import { useHistory } from "react-router-dom";
import { Icon } from "../lib/images";
import { getuserToken } from '../lib/token';
import Get from "../lib/api/get";
function Newcommuntiy({ match }: any) {
	let { id } = match.params;
	const imageHasLoaded = true;
	const history = useHistory();
	const [Text, setText] = useState('');
	const [gotop,setgotop] = useState(window.pageYOffset===0);
	const [contents, setcontents] = useState();
	useEffect(()=>{
		Get().Getsomeofcommunity(match.params).then(res => {
			console.log(res);
			setcontents(res);
		  }).catch(err => console.log(err)
		  );
	},[match.params]);

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
					<List selectedId={id} selectedtext={Text}/>

					<AnimatePresence>
						{id && imageHasLoaded && <Item id={id} {...contents} key="item" />}
					</AnimatePresence>

				</AnimateSharedLayout>
				
				<Writebutton onoff={getuserToken()===null}>
					<div onClick={() => history.replace("/makecommunity")} >
						<img src={Icon.pen}/>
					</div>
				</Writebutton>
				<Navigation onoff={gotop} onClick={()=>{window.scrollTo({top:0, left:0, behavior:"smooth"})}}>
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
const Writebutton= styled.div<{onoff:boolean}>`
width:50px;
height:50px;
border-radius:50px;
background:${colors.gray};
position: fixed;
bottom: 15%;
right:3%;
display:${({onoff})=>onoff ? "none" : "flex"};
justify-content: center;
align-items: center;
cursor: pointer;
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
cursor: pointer;
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
