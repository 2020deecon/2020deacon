import React from 'react';
import styled from 'styled-components';
import { RootState } from '../../store/reducers';
import { useHistory } from 'react-router-dom';

import Modal from '../UI/Modal';
import useModal from '../../hooks/useModal';
function ExplanModal() {
    const { closed } = useModal('explan');
    return (
        <Modal title="" modalname="explan">
            
        </Modal>
    );
}

export default ExplanModal;