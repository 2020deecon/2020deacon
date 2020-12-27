import React from "react";
import styled from "styled-components";
import Headding from "../UI/Headding";
import useModal from "../../hooks/useModal";
import { Modals } from "../../store/slices/modal";
import colors from "../../constants/colors";
import viewport from "../../constants/viewport";
import { useHistory } from 'react-router-dom';
interface ModalProps {
  children?: React.ReactNode;
  title?: string;
  modalname: Modals;
}

function Modal({ children, title, modalname }: ModalProps) {
  const { isOpen, closed } = useModal(modalname);
  const history= useHistory();
  if (!isOpen) return null;
  return (
    <Wrap onClick={()=>{closed();history.replace("/");}}>
      <Body onClick={(e) => e.stopPropagation()}>
        <div style={{ marginBottom: "10px" }}>
          <Headding tag="h1" tagStyle="h3">
            {title}
          </Headding>
        </div>
        {children}
      </Body>
    </Wrap>
  );
}

const Wrap = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 3000;
  animation: appear 0.5s;

  @keyframes appear {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

const Body = styled.div`
  position: absolute;
  background: white;
  max-width: 720px;
  width: 100%;
  box-sizing: border-box;
  padding: 3em 2em;
  top: 50%;
  left: 50%;
  right: auto;
  bottom: auto;
  transform: translate(-50%, -50%);
  border-radius: 10px;
  transition: background 0.5s;
@media (max-width:${viewport.mobile}){
  max-width: 520px;
}
  &:focus {
    outline: 0;
  }
  &>.slick-slider>button{
    background:${colors.primary};
    border-radius: 100%;
    &::before {
		position: absolute;
		top: 2px;
		left: 0;
		right:0;
	}
  }
  /* &>.slick-slider>.slick-list>div>div>div{
    width:100%;
  } */
`;
export default Modal;
