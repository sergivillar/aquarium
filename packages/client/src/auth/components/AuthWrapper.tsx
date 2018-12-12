import React from 'react';
import {Redirect} from 'react-router';
import styled from 'styled-components/macro';
import icon from '../../assets/icons/fish-tank.svg';
import Spinner from '../../components/Spinner';
import {SECONDARY, SECONDARY_DARK, DISABLE} from '../../constants/colors';
import {isAuthenticated} from '../../utils/user';

const AuthContainer = styled.div`
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
    margin-bottom: 56px;

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

    :hover {
        background-color: ${SECONDARY_DARK};
    }

    &:disabled {
        background-color: ${DISABLE};
    }
`;

interface Props {
    children: any;
    onPress: () => void;
    submitMessage: string;
    isRequesting: boolean;
    disabled?: boolean;
    footer?: any;
}

const Auth = (props: Props) => {
    if (isAuthenticated()) {
        return <Redirect to="/" />;
    }

    return (
        <>
            {props.isRequesting && <Spinner />}
            <AuthContainer>
                <Logo src={icon} />
                <Card>
                    {props.children}
                    <Button disabled={props.disabled} onClick={props.onPress}>
                        {props.submitMessage}
                    </Button>
                </Card>
                {props.footer}
            </AuthContainer>
        </>
    );
};

export default Auth;
