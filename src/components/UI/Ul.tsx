import styled from "styled-components";
import colors from "../../constants/colors";

const Ul = styled.ul`
  display: flex;
`;
export const Li = styled.li`
  &:after {
    content: "";
    border-left: 1px solid ${colors.gray};
    margin: 0 3px;
  }
  &:last-child:after {
    content: none;
  }
  &:hover{
    transition:color 0.5s;
    color: ${colors.border};
  }
`;
export default Ul;
