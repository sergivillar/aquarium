import React, {useState, useEffect} from 'react';
import styled from 'styled-components/macro';
import {BACKGROUND_BLACK, ERROR} from '../constants/colors';

export const SNACKBAR_DANGER = 'danger';
export const SNACKBAR_DEFAULT = 'default';

type SNACKBAR_TYPES = typeof SNACKBAR_DANGER | typeof SNACKBAR_DEFAULT;

const getBackgroundColor = (type: SNACKBAR_TYPES) => {
    switch (type) {
        case SNACKBAR_DANGER:
            return ERROR;
        default:
            return BACKGROUND_BLACK;
    }
};

interface ContainerProps {
    type: SNACKBAR_TYPES;
    isOpen: boolean;
}

const SnackbarContainer = styled.div<ContainerProps>`
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    bottom: 0;
    left: 50%;
    height: 48px;
    font-size: 0.8rem;
    border-radius: 2px;
    box-shadow: 0 1px 4px 0px ${BACKGROUND_BLACK};
    padding: 16px 0;
    width: 90%;
    background-color: ${({type}) => getBackgroundColor(type)};
    color: white;
    will-change: transform;
    transition: transform 0.3s cubic-bezier(0.4, 0, 1, 1);
    transform: ${({isOpen}) => (isOpen ? 'translate(-50%, -50%) ' : 'translate(-50%, 100%)')};
`;

interface Props {
    children: string;
    duration?: number;
    type: SNACKBAR_TYPES;
}

const Snackbar = ({duration, type, children}: Props) => {
    let timerHide: number;
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        setIsOpen(true);
        timerHide = window.setTimeout(() => setIsOpen(false), duration);

        return () => {
            clearInterval(timerHide);
        };
    }, []);

    return (
        <SnackbarContainer isOpen={isOpen} type={type}>
            {children}
        </SnackbarContainer>
    );
};

Snackbar.defaultProps = {
    duration: 5000,
    type: SNACKBAR_DEFAULT,
};

export default Snackbar;
