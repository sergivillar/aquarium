import React from 'react';
import {Redirect} from 'react-router';
import styled, {keyframes} from 'styled-components/macro';
import icon from '../../assets/icons/fish-tank.svg';
import Spinner from '../../components/Spinner';
import {SECONDARY, SECONDARY_DARK, DISABLE} from '../../constants/colors';
import {isAuthenticated} from '../../utils/user';
import SnackBar, {SNACKBAR_DANGER} from '../../components/Snackbar';

const cardAppears = keyframes`
  from {
    transform: scaleY(0);
  }

  to {
    visibility: visible;
    transform: scaleY(1);
  }
`;

const logoAppears = keyframes`
  from {
    transform: translateY(-1000px);
  }

  60% {
    opacity: 1;
    transform: translateY(25px);
  }

  75% {
    transform: translateY(-10px);
  }

  90% {
    transform: translateY(5px);
  }

  to {
    visibility: visible;
    transform: translateY(0);
  }
`;

const buttonAppears = keyframes`
  from {
    transform: scale(0);
  }

  to {
    visibility: visible;
    transform: scale(1);
  }
`;

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
    visibility: hidden;

    animation: ${cardAppears} 0.4s forwards;
    animation-delay: 1.2s;
    transform-origin: bottom;

    & > div {
        margin-bottom: 24px;
    }
`;

const Logo = styled.img`
    height: 128px;
    margin-bottom: 64px;
    visibility: hidden;

    animation: ${logoAppears} 0.4s forwards;
    animation-delay: 0.8s;
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
    visibility: hidden;

    animation: ${buttonAppears} 0.3s forwards;
    animation-delay: 1.7s;

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
    serverError?: string;
}

const AuthWrapper = ({
    isRequesting,
    disabled,
    footer,
    onPress,
    submitMessage,
    serverError,
    children,
}: Props) => {
    if (isAuthenticated()) {
        return <Redirect to="/" />;
    }

    return (
        <>
            {isRequesting && <Spinner />}
            <AuthContainer>
                <Logo src={icon} />
                <Card>
                    {children}
                    <Button disabled={disabled} onClick={onPress}>
                        {submitMessage}
                    </Button>
                </Card>
                {footer}
            </AuthContainer>
            {!!serverError && <SnackBar type={SNACKBAR_DANGER}>{serverError}</SnackBar>}
        </>
    );
};

export default AuthWrapper;
