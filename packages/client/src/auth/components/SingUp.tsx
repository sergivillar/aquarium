import React, {useState} from 'react';
import AuthWrapper from './AuthWrapper';
import Input from '../../components/Input';
import api from '../../api';
import {setItem} from '../../utils/local-storage';
import {validateEmail} from '../../utils/validators';

const emailErrorMsg: string = 'Email has an incorrect value';
const passwordInvalidErrorMsg: string = 'Password length must be between 6 and 12 characters.';
const passwordMatchErrorMsg: string = 'Password do not match.';

const Login = () => {
    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState(emailErrorMsg);
    const [password, setPassword] = useState('');
    const [passwordRepeat, setPasswordRepeat] = useState('');
    const [passwordError, setPasswordError] = useState(passwordInvalidErrorMsg);
    const [passwordRepeatError, setPasswordRepeatError] = useState(passwordMatchErrorMsg);
    const [showFormErrors, setShowFormErros] = useState(false);
    const [serverError, setServerError] = useState('');
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
            return setPasswordError(passwordInvalidErrorMsg);
        }

        if (passwordRepeat && passwordValue !== passwordRepeat) {
            return setPasswordError(passwordMatchErrorMsg);
        }

        return setPasswordError('');
    };

    const onChangePasswordRepeat = (event: React.ChangeEvent<HTMLInputElement>) => {
        const passwordValue = event.target.value;
        setPasswordRepeat(passwordValue);

        if (passwordValue.length < 6 || passwordValue.length > 12) {
            return setPasswordRepeatError(passwordInvalidErrorMsg);
        }

        if (passwordValue !== password) {
            return setPasswordRepeatError(passwordMatchErrorMsg);
        }

        return setPasswordRepeatError('');
    };

    const submitLogin = () => {
        if (emailError || passwordError || passwordRepeatError) {
            return setShowFormErros(true);
        }

        setIsLogging(true);
        setShowFormErros(false);

        api.singUp(email, password).then(async response => {
            setServerError('');
            const data = await response.json();

            if (response.status !== 201) {
                setIsLogging(false);
                setServerError(data.message);
                return;
            }

            const {token, refreshToken} = data;

            setItem({email, token, refreshToken});
            setIsLogging(false);
        });
    };

    const isInvalidLogin: boolean =
        showFormErrors &&
        (!email || !password || !passwordRepeat || !!emailError || !!passwordError || !!passwordRepeatError);

    return (
        <AuthWrapper
            submitMessage="Sing up"
            isRequesting={isLogging}
            onPress={submitLogin}
            disabled={isInvalidLogin}
            serverError={serverError}
        >
            <Input
                value={email}
                type="text"
                onChange={onChangeEmail}
                placeholder="Email"
                errorMessage={showFormErrors ? emailError : undefined}
            />
            <Input
                value={password}
                type="password"
                onChange={onChangePassword}
                placeholder="Password"
                errorMessage={showFormErrors ? passwordError : undefined}
            />
            <Input
                value={passwordRepeat}
                type="password"
                onChange={onChangePasswordRepeat}
                placeholder="Repeat password"
                errorMessage={showFormErrors ? passwordRepeatError : undefined}
            />
        </AuthWrapper>
    );
};

export default Login;
