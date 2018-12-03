import React from 'react';
import styled from 'styled-components/macro';
import {SECONDARY, GREY_LIGTH, ERROR} from '../constants/colors';

const Container = styled.div`
    width: 100%;
`;

const InputContainer = styled.div`
    width: 100%;
    position: relative;
    display: inline-block;
    overflow: hidden;
`;

const Input = styled.input`
    width: 100%;
    padding: 8px;
    font-size: 1rem;
    border: none;
    border-bottom: 2px solid ${(props: InputProps) => (props.errorMessage ? ERROR : GREY_LIGTH)};
    background-color: inherit;
    color: white;

    ::placeholder {
        color: ${GREY_LIGTH};
    }

    :focus {
        outline: none;
    }

    :focus + span {
        left: 0;
    }
`;

const InputUnderline = styled.span`
    transition: all 0.5s;
    display: inline-block;
    bottom: 0;
    left: -100%;
    position: absolute;
    width: 100%;
    height: 2px;
    background-color: ${SECONDARY};
`;

const ErrorMessage = styled.p`
    width: 100%;
    margin: 0;
    font-size: 0.8rem;
    margin-top: 8px;
`;

interface InputProps {
    value: string;
    type: string;
    placeholder?: string;
    errorMessage?: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputController = ({value, type, placeholder, errorMessage, onChange}: InputProps) => (
    <Container>
        <InputContainer>
            <Input
                value={value}
                type={type}
                onChange={onChange}
                placeholder={placeholder}
                errorMessage={errorMessage}
            />
            <InputUnderline />
        </InputContainer>
        {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
    </Container>
);

export default InputController;
