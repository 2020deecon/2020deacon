import React from 'react';
import styled, { css } from 'styled-components';
import color from '../../constants/colors';
const Input = styled.input`
	display: block;
	width: 100%;
	box-sizing: border-box;
	padding: 0.5em 1em;
	border: 0;
	/* font-family: "Open Sans", sans-serif; */
	font-size: 15px;
	/* border-radius: 50px; */
	border-bottom:2px solid ${color.border};
	&:focus {
		outline: 0;
		border-bottom:3px solid ${color.border};
	}
	/* opacity: 0.5; */
`;

interface WrapInputProps {
	children?: React.ReactNode;
	error?: { type: string; message: string };
	fieldName: string;
	None?: boolean;
}

export function WrapInput({
	fieldName,
	children,
	error,
	None,
}: WrapInputProps) {
	return (
		<WrapInputStyle>
			<label>
				<span>{fieldName}</span>
				{children}
			</label>
			<Error className="error" None={None}>
				{error && error.message}
			</Error>
		</WrapInputStyle>
	);
}
const Error = styled.div<{ None?: boolean }>`
	${({ None }) =>
		None &&
		css`
			display: none;
		`};
`;
const WrapInputStyle = styled.div`
	position: relative;
	display: flex;
	flex-direction: column;
	label > span {
		margin-bottom: 3px;
		font-weight: 600;
		font-size: 17px;
	}
	.error {
		color: red;
		height: 1em;
		margin-top: 0.1em;
		margin-bottom: 0.4em;
	}
`;

export default Input;
