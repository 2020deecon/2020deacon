import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import Make from '../../lib/api/make';
import colors from '../../constants/colors';
import { getuserToken } from '../../lib/token';
interface ItemProps {
	id: string;
	title: string;
	image: string;
	text: string;
	comment: any[];
	type: string;
	problem_id: string;
}
export function Item({
	id,
	title,
	image,
	text,
	comment,
	type,
	problem_id,
}: ItemProps) {
	const history = useHistory();
	const [commentaire, setcommentaire] = useState('');

	// alert("reset");
	// alert(problem_id);
	return (
		<>
			<Wrap
				onClick={() => {
					history.replace('/community');
					window.location.reload();
				}}
			>
				<div>
					<motion.div
						className="card-content"
						style={{ zIndex: 101 }}
						// layoutId={`card-container-${id}`}
						onClick={(e) => e.stopPropagation()}
					>
						<motion.div
							className="card-image-container"
							// layoutId={`card-image-container-${id}`}
							style={{
								display: 'flex',
								flexDirection: 'column',
								justifyContent: 'center',
								alignItems: 'center',
								objectFit: 'cover',
							}}
						>
							<img className="card-image" src={image} alt="" onClick={()=>problem_id!=null && history.replace("/popup/"+problem_id)} style={{maxHeight:"300px",maxWidth:"500px"}}/>
							<h3>{text}</h3>
						</motion.div>
						<motion.div
							className="title-container"
							// layoutId={`title-container-${id}`}
						>
							<span className="category">{type}</span>
							<h2>{title}</h2>
						</motion.div>
						<motion.div className="content-container" animate />

						<Comment>
							<div className="addComment">
								{getuserToken() !== null && (<input
									type="text"
									placeholder="댓글"
									name="text"
									value={commentaire}
									onChange={(e) => {
										setcommentaire(e.target.value);
									}}
									onKeyDown={(e) =>{
										if(e.key === 'Enter')
										{
											Make().MakeCommented({ id, text: commentaire });
											window.location.reload();
										}
									}}
								/>)}
								
							</div>
							<div id="comments">
								{comment?.map((data) => (
									<CommentItems writer={data.writer} contents={data.comment} />
								))}
							</div>
						</Comment>
					</motion.div>
				</div>
			</Wrap>
		</>
	);
}
interface CommentItemType {
	writer: string;
	contents: string;
}
function CommentItems({ writer, contents }: CommentItemType) {
	return (
		<CommentItem>
			<div className="writer">{writer}</div>
			<div className="contents">{contents}</div>
		</CommentItem>
	);
}
const Comment = styled.div`
	display: flex;
	flex-direction: column-reverse;
	& > .addComment {
		display: flex;
		justify-content: center;
		align-items: center;
		width:100%;
		padding:0px 30px;
		margin-top:20px;
		max-height:400px;
		& > input {
			background: ${colors.border};
			border-radius: 20px;
			padding: 12px 8px;
			color: white;
			font-size: 12px;
			font-weight: 600;
			width:100%;
		}
	}
	& > #comments {
		max-height: 135px;
		height:100%;
		overflow-y: scroll;
	}
`;
const CommentItem = styled.div`
	display: flex;
	flex-direction: column;	
	align-items: center;
	& > .writer {
		width:100%;
		max-width:80%;
		font-weight: 400px;
		font-size: 13px;
		margin-bottom: 3px;
	}
	& > .contents {
		display: flex;
		width:100%;
		max-width:80%;
		border-radius: 20px;
		background: ${colors.border};
		padding: 8px 10px;
	}
`;
const Wrap = styled.div`
	width: 100%;
	height: 100%;
	position: fixed;
	top: 0;
	z-index: 100;
	background: rgba(0179, 153, 204, 0.5);
	transition: background 0.3s;
	transition-duration: 0.2s;
	transition-delay: 0.15s;

	& > div {
		top: 0;
		left: 0;
		right: 0;
		position: absolute;
		z-index: 400;
		overflow: hidden;
		padding: 40px 20px;
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		pointer-events: none;
		& > div {
			max-width: 700px;
		}
	}
`;
