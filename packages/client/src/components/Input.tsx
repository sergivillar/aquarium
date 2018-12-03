import React from 'react';
import styled from 'styled-components/macro';
import {COLOR_SECONDARY, GREY_LIGTH} from '../constants/colors';

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
    border-bottom: 1px solid ${GREY_LIGTH};
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
    background-color: ${COLOR_SECONDARY};
`;

interface InputProps {
    value: string;
    type: string;
    placeholder?: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputController = ({value, type, placeholder, onChange}: InputProps) => (
    <InputContainer>
        <Input value={value} type={type} onChange={onChange} placeholder={placeholder} />
        <InputUnderline />
    </InputContainer>
);

export default InputController;
