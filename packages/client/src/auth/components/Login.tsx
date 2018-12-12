import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import styled from 'styled-components/macro';
import AuthWrapper from './AuthWrapper';
import Input from '../../components/Input';
import api from '../../api';
import {setItem} from '../../utils/local-storage';
import {validateEmail} from '../../utils/validators';

const SingUpLink = styled(Link)`
    color: white;
    font-weight: 300;
    font-size: 0.8rem;
`;

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

        api.login(email, password).then(async response => {
            if (response.status !== 201) {
                // TODO show errors in alert
                setIsLogging(false);
                return;
            }

            const {token, refreshToken} = await response.json();
            setItem({email, token, refreshToken});
            setIsLogging(false);
        });
    };

    const isInvalidLogin: boolean = showErrors && (!email || !password || !!emailError || !!passwordError);

    return (
        <>
            <AuthWrapper
                submitMessage="Enter"
                isRequesting={isLogging}
                onPress={submitLogin}
                disabled={isInvalidLogin}
                footer={
                    <SingUpLink to="/singup">
                        If you do not have an account, please create it here.
                    </SingUpLink>
                }
            >
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
            </AuthWrapper>
        </>
    );
};

export default Login;
