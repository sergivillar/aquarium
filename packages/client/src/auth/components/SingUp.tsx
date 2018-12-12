import React, {useState} from 'react';
import AuthWrapper from './AuthWrapper';
import Input from '../../components/Input';
import api from '../../api';
import {setItem} from '../../utils/local-storage';

// Take from https://stackoverflow.com/questions/46155/how-to-validate-an-email-address-in-javascript
function validateEmail(email: string): boolean {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

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
            return setShowErros(true);
        }

        setIsLogging(true);
        setShowErros(false);

        api.singUp(email, password).then(async response => {
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

    const isInvalidLogin: boolean =
        showErrors &&
        (!email || !password || !passwordRepeat || !!emailError || !!passwordError || !!passwordRepeatError);

    return (
        <AuthWrapper
            submitMessage="Sing up"
            isRequesting={isLogging}
            onPress={submitLogin}
            disabled={isInvalidLogin}
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
            <Input
                value={passwordRepeat}
                type="password"
                onChange={onChangePasswordRepeat}
                placeholder="Repeat password"
                errorMessage={showErrors ? passwordRepeatError : undefined}
            />
        </AuthWrapper>
    );
};

export default Login;
