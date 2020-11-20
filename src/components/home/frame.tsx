import React from 'react';
import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';

import viewport from '../../constants/viewport';
import Headding from '../UI/Headding';
import colors from '../../constants/colors';
interface HomeFrameProps {
	src: string;
	title: string;
	subtitle?: string;
	reverse?: boolean;
	linkto?: string;
	Open?: () => void;
}
function Frame({
	src,
	title,
	subtitle,
	reverse,
	linkto,
	Open,
}: HomeFrameProps) {
	return (
		<Wrap reversy={reverse}>
			<div
				style={{
					display: 'flex',
					flexDirection: 'column',
					justifyContent: 'space-around',
				}}
			>
				<Headding tag="h3" tagStyle="h4">
					{title}
				</Headding>
				<SubTitle>
					<Headding tag="h4" tagStyle="h5">
						<Link to={linkto ? linkto : ''}>{subtitle}</Link>
					</Headding>
				</SubTitle>
			</div>
			<div>
				<img
					src={src}
					alt=""
					style={{
						maxWidth: '300px',
						maxHeight: '300px',
						width: '100%',
						height: '100%',
					}}
				/>
			</div>
		</Wrap>
	);
}
const Wrap = styled.div<{ reversy?: boolean }>`
	display: flex;
	justify-content: space-between;
	align-items: center;
	height: 100vh;
	padding: 0px 100px;

	@media (max-width: ${viewport.mobile}) {
		flex-direction: column-reverse;
		justify-content: start;
		align-items: center;
		padding: 0px 30px;
		height: auto;
	}
	/* ${({ reversy }) =>
		reversy &&
		css`
			flex-direction: row-reverse;
		`} */
`;
const SubTitle = styled.div`
	margin-top: 30px;
	transition: color 0.5s;
	display: flex;
	&:hover {
		color: ${colors.border};
	}
	@media (max-width: ${viewport.mobile}) {
		margin: 0px;
	}
`;
export default Frame;
