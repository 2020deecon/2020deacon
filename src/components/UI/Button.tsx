import styled, { FlattenSimpleInterpolation } from "styled-components";
import colors from "../../constants/colors";
interface ButtonProps {
  color?: string;
  back?: string;
  hov?: string;
  css?: FlattenSimpleInterpolation;
}

const Button = styled.button<ButtonProps>`
  background: ${({ back }) => back || colors.primary};
  color: ${({ color }) => color || colors.white};
  border: 0;
  height: 40px;
  width: 100%;
  font-size: 15px;
  font-weight: 600;
  transition: color 0.25s, background 0.25s;
  &:hover {
    background: ${({ color, hov }) => hov || color || colors.white};
    color: ${({ back }) => back || colors.primary};

    border: 1px solid ${({ hov }) => hov || colors.border};
  }
  &:focus{
    outline: 0;
  }
  cursor: pointer;
  ${(props) => props.css};
`;

export default Button;
