import styled, { css } from "styled-components";
import colors from "../../constants/colors";

const Ul = styled.ul`
  display: flex;
  
`;
export const Li = styled.li<{ clicked?: boolean }>`
  &:after {
    content: "";
    border-left: 1px solid ${colors.gray};
    margin: 0 15px;
  }
  &:last-child:after {
    content: none;
  }
  letter-spacing: 2px;
  ${({ clicked }) => clicked && css`
  color: ${colors.title};
  `}
  &:hover{
    transition:color 0.2s;
    color: ${colors.border};
  }

`;
export default Ul;
