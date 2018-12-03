import React, {useState} from 'react';
import styled from 'styled-components/macro';
import icon from '../assets/icons/fish-tank.svg';
import Spinner from './Spinner';
import Input from './Input';
import {SECONDARY, ERROR} from '../constants/colors';
import api from '../api';

const LoginContainer = styled.div`
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    padding: 0 16px;

    & > div {
        margin-bottom: 24px;
    }
`;

const Logo = styled.img`
    height: 128px;
    margin-bottom: 64px;
`;

const Button = styled.button`
    width: 100%;
    padding: 16px;
    background-color: ${SECONDARY};
    text-transform: uppercase;
    font-size: 1rem;
    margin-top: 32px;

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

const emailErrorMsg: string = 'Email has an incorrect value';
const passwordErrorMsg: string = 'Password length must be between 6 and 12 characters.';

const Login = () => {
    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState(emailErrorMsg);
    const [password, setPassword] = useState('');
    const [passwordError, setPasswordError] = useState(passwordErrorMsg);
    const [showErrors, setShowErros] = useState(false);
    const [isLogging, setIsLogging] = useState(false);

    const onChangeEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
        const emailValue = event.target.value;
        setEmail(emailValue);

        if (!validateEmail(emailValue)) {
            return setEmailError(emailErrorMsg);
        }

        return setEmailError('');
    };

    const onChangePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
        const passwordValue = event.target.value;
        setPassword(passwordValue);

        if (passwordValue.length < 6 || passwordValue.length > 12) {
            return setPasswordError(passwordErrorMsg);
        }

        return setPasswordError('');
    };

    const submitLogin = () => {
        if (emailError || passwordError) {
            return setShowErros(true);
        }

        setIsLogging(true);
        setShowErros(false);

        api.login(email, password).then(response => {
            setIsLogging(false);
            window.localStorage.setItem('token', response.token);
            window.localStorage.setItem('refreshToken', response.refreshToken);
        });
    };

    const isInvalidLogin: boolean = showErrors && (!email || !password || !!emailError || !!passwordError);

    return (
        <>
            {isLogging && <Spinner />}
            <LoginContainer>
                <Logo src={icon} />
                <Input
                    value={email}
                    type="text"
                    onChange={onChangeEmail}
                    placeholder="Email"
                    errorMessage={showErrors ? emailError : undefined}
                />
                <Input
                    value={password}
                    type="password"
                    onChange={onChangePassword}
                    placeholder="Password"
                    errorMessage={showErrors ? passwordError : undefined}
                />
                <Button disabled={isInvalidLogin} onClick={submitLogin}>
                    Enter
                </Button>
            </LoginContainer>
        </>
    );
};

export default Login;
