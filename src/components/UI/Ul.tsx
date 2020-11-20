import styled, { css } from "styled-components";
import colors from "../../constants/colors";
import viewport from "../../constants/viewport";

const Ul = styled.ul`
  display: flex;
  @media (max-width:900px) {
      display:none;
    }
`;
export const Li = styled.li<{ clicked?: boolean}>`
  &:after {
    content: "";
    border-left: 1px solid ${colors.gray};
    margin: 0 15px;
  }
  &:last-child:after {
    content: none;
  }
  letter-spacing: 1.5px;
  ${({ clicked }) => clicked && css`
  color: ${colors.title};
  `}
  &:hover{
    transition:color 0.2s;
    color: ${colors.border};
  }
  @media (max-width:900px) {
    &:after {
      content: none;
    }
    }
`;
export default Ul;
