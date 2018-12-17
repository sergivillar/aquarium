import React from 'react';
import {Redirect} from 'react-router';
import styled, {keyframes} from 'styled-components/macro';
import icon from '../../assets/icons/fish-tank.svg';
import Spinner from '../../components/Spinner';
import {SECONDARY, SECONDARY_DARK, DISABLE} from '../../constants/colors';
import {isAuthenticated} from '../../utils/user';
import SnackBar, {SNACKBAR_DANGER} from '../../components/Snackbar';

const cardIn = keyframes`
    from {
        transform: scale(0);
    }

    30% {
        transform: scale(1, 0.3);
    }

    to {
        visibility: visible;
        transform: scale(1, 1);
    }
`;

const logoIn = keyframes`
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

const buttonIn = keyframes`
    from {
        transform: scaleX(0);
    }

    to {
        visibility: visible;
        transform: scaleX(1);
    }
`;

const inputIn = keyframes`
    from {
        opacity: 0;
        transform: translateY(20px);
    }

    to {
        visibility: visible;
        opacity: 1;
        transform: translateY(0);
    }
`;

const footerIn = keyframes`
    from {
        opacity: 0
    }

    to {
        visibility: visible;
        opacity: 1
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

    animation: ${cardIn} 0.5s forwards;
    animation-delay: 0.8s;
    transform-origin: bottom;

    & > div {
        margin-bottom: 24px;
    }
`;

const Logo = styled.img`
    height: 128px;
    margin-bottom: 64px;
    visibility: hidden;

    animation: ${logoIn} 0.5s forwards;
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
    backface-visibility: visible !important;

    animation: ${buttonIn} 0.3s forwards;
    animation-delay: 1.5s;

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

const InputContainer = styled.div`
    width: 100%;
    visibility: hidden;
    animation: ${inputIn} 0.4s forwards;
    animation-delay: ${({index}: {index: number}) => 1.3 + index * 0.2}s;
`;

const FooterContainer = styled.div`
    visibility: hidden;
    animation: ${footerIn} 0.4s forwards;
    animation-delay: 1.5s;
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
                    {React.Children.map(children, (item, index) => (
                        <InputContainer index={index}>{item}</InputContainer>
                    ))}
                    <Button disabled={disabled} onClick={onPress}>
                        {submitMessage}
                    </Button>
                </Card>
                {!!footer && <FooterContainer>{footer}</FooterContainer>}
            </AuthContainer>
            {!!serverError && <SnackBar type={SNACKBAR_DANGER}>{serverError}</SnackBar>}
        </>
    );
};

export default AuthWrapper;
