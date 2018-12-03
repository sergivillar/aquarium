import React, {useEffect, useState} from 'react';
import styled, {keyframes} from 'styled-components/macro';
import {COLOR_PRIMARY, COLOR_SECONDARY} from '../constants/colors';
import {setTimeout} from 'timers';

const rotate = keyframes`
    100% { transform: rotate(360deg) }
`;

const bounce = keyframes`
    0%, 100% {
        transform: scale(0.0);
    }
    50% {
        transform: scale(1.0);
    }
`;

const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 5;
    background-color: #5656568f;
`;

const SpinnerContainer = styled.div`
    width: 150px;
    height: 150px;
    position: relative;

    animation: ${rotate} 2s infinite linear;
`;

const Dot = styled.div`
    width: 60%;
    height: 60%;
    display: inline-block;
    position: absolute;
    top: 0;
    background-color: ${COLOR_PRIMARY};
    border-radius: 100%;

    animation: ${bounce} 2s infinite ease-in-out;
`;

const SecondDot = styled(Dot)`
    top: auto;
    bottom: 0;
    animation-delay: -1s;
    background-color: ${COLOR_SECONDARY};
`;

interface SpinnerProps {
    delay?: number;
}

const Spinner = ({delay = 500}: SpinnerProps) => {
    const [showSpinner, setShowSpinner] = useState(false);

    let timeoutId: number;
    useEffect(() => {
        timeoutId = window.setTimeout(() => {
            setShowSpinner(true);
        }, delay);

        return () => {
            setShowSpinner(false);
            clearTimeout(timeoutId);
        };
    });

    return showSpinner ? (
        <Container>
            <SpinnerContainer>
                <Dot />
                <SecondDot />
            </SpinnerContainer>
        </Container>
    ) : null;
};

export default Spinner;
