import React, {useState} from 'react';
import {Redirect} from 'react-router';
import styled from 'styled-components/macro';
import icon from '../assets/icons/fish-tank.svg';
import Spinner from './Spinner';
import Input from './Input';
import {SECONDARY, DISABLE} from '../constants/colors';
import api from '../api';
import {setItem} from '../utils/local-storage';

const LoginContainer = styled.div`
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    padding: 0 16px;
`;

const Card = styled.div`
    position: relative;
    width: 100%;
    padding: 32px 16px 48px 16px;
    border-radius: 3px;
    background-color: white;
    box-shadow: 0px 0px 15px 1px #0000007a;
    display: flex;
    flex-direction: column;
    align-items: center;

    & > div {
        margin-bottom: 24px;
    }
`;

const Logo = styled.img`
    height: 128px;
    margin-bottom: 64px;
`;

const Button = styled.button`
    font-size: 1rem;
    position: absolute;
    border: none;
    border-radius: 20px;
    height: 48px;
    bottom: -24px;
    width: 50%;
    padding: 16px;
    background-color: ${SECONDARY};
    text-transform: uppercase;
    box-shadow: 0 4px 2px -2px #0000007a;

    :focus {
        outline: none;
    }

    &:disabled {
        background-color: ${DISABLE};
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
    const [isAuthenticated, setIsAuthenticated] = useState(false);
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

        api.login(email, password).then(async response => {
            setIsLogging(false);

            if (response.status !== 201) {
                return setIsAuthenticated(false);
            }

            const {token, refreshToken} = await response.json();
            setItem({email, token, refreshToken});
            setIsAuthenticated(true);
        });
    };

    const isInvalidLogin: boolean = showErrors && (!email || !password || !!emailError || !!passwordError);

    if (isAuthenticated) {
        return <Redirect to="/" />;
    }

    return (
        <>
            {isLogging && <Spinner />}
            <LoginContainer>
                <Logo src={icon} />
                <Card>
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
                </Card>
            </LoginContainer>
        </>
    );
};

export default Login;
