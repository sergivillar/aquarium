import React from 'react';
import styled, {keyframes} from 'styled-components/macro';

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
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 5;
    background-color: #6a6a6a;
    opacity: 0.5;
`;

const SpinnerContainer = styled.div`
    margin: 100px auto;
    width: 100px;
    height: 100px;
    position: relative;
    text-align: center;

    animation: ${rotate} 2s infinite linear;
`;

const Dot = styled.div`
    width: 60%;
    height: 60%;
    display: inline-block;
    position: absolute;
    top: 0;
    background-color: #1976d2;
    border-radius: 100%;

    animation: ${bounce} 2s infinite ease-in-out;
`;

const SecondDot = styled(Dot)`
    top: auto;
    bottom: 0;
    animation-delay: -1s;
    background-color: #ffca28;
`;

const Spinner = () => (
    <Container>
        <SpinnerContainer>
            <Dot />
            <SecondDot />
        </SpinnerContainer>
    </Container>
);

export default Spinner;
