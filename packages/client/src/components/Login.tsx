import React, {useState} from 'react';
import styled from 'styled-components/macro';
import icon from '../assets/icons/fish-tank.svg';
import Spinner from './Spinner';
import Input from './Input';
import {COLOR_SECONDARY} from '../constants/colors';
import api from '../api';

const LoginContainer = styled.div`
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    padding: 0 16px;

    & > * {
        margin: 16px 0px;
    }
`;

const Logo = styled.img`
    height: 128px;
`;

const Button = styled.button`
    width: 100%;
    padding: 16px;
    background-color: ${COLOR_SECONDARY};
    text-transform: uppercase;
    font-size: 1rem;

    :focus {
        outline: none;
    }

    &:disabled {
        opacity: 0.5;
    }
`;

// Take from https://stackoverflow.com/questions/46155/how-to-validate-an-email-address-in-javascript
function validateEmail(email: string): boolean {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

const Login = () => {
    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState('');
    const [password, setPassword] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [isLogging, setIsLogging] = useState(false);

    const onChangeEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
        const emailValue = event.target.value;
        setEmail(emailValue);

        const isValidEmail = validateEmail(emailValue);

        if (!isValidEmail) {
            setEmailError('Email has an incorrect value');
        } else {
            setEmailError('');
        }
    };

    const onChangePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
        const passwordValue = event.target.value;
        setPassword(passwordValue);

        if (passwordValue.length < 6 || passwordValue.length > 12) {
            setPasswordError('Password length must be between 6 and 12 characters.');
        } else {
            setPasswordError('');
        }
    };

    const submitLogin = () => {
        setIsLogging(true);

        api.login(email, password).then(response => {
            setIsLogging(false);
            window.localStorage.setItem('token', response.token);
            window.localStorage.setItem('refreshToken', response.refreshToken);
        });
    };

    const isInvalidLogin: boolean = !email || !password || !!emailError || !!passwordError;

    return (
        <>
            {isLogging && <Spinner />}
            <LoginContainer>
                <Logo src={icon} />
                <Input value={email} type="text" onChange={onChangeEmail} placeholder="Email" />
                <Input value={password} type="password" onChange={onChangePassword} placeholder="Password" />
                <Button disabled={isInvalidLogin} onClick={submitLogin}>
                    Enter
                </Button>
            </LoginContainer>
        </>
    );
};

export default Login;
