import React from 'react';
import styled from 'styled-components/macro';
import {FONT_SECONDARY, PRIMARY_LIGTH, BACKGROUND_LIGHT} from '../constants/colors';
import aquariumIcon from '../assets/icons/fish-tank.svg';

const Container = styled.div`
    border-radius: 2px;
    box-shadow: 0 2px 1px -1px rgba(0, 0, 0, 0.2), 0 1px 1px 0 rgba(0, 0, 0, 0.14),
        0 1px 3px 0 rgba(0, 0, 0, 0.12);
    cursor: pointer;

    &:hover {
        background-color: ${BACKGROUND_LIGHT};
    }
`;

const AquariumPhotoContainer = styled.div`
    width: 100%;
    height: 194px;
    background-color: ${PRIMARY_LIGTH};
    display: flex;
    justify-content: center;
    align-items: center;
`;

const AquariumPhotoDefault = styled.img`
    height: 60%;
    border-top-right-radius: 2px;
    border-top-left-radius: 2px;
`;

const TextContainer = styled.div`
    padding: 16px;
`;

const Title = styled.p`
    font-size: 1.5rem;
    margin-bottom: 8px;
`;

const Subtitle = styled.p`
    color: ${FONT_SECONDARY};
`;

interface Props {
    title: string;
    liters: number;
}

const AquariumSummary = ({title, liters}: Props) => (
    <Container>
        <AquariumPhotoContainer>
            <AquariumPhotoDefault src={aquariumIcon} alt="Aquarium photo" />
        </AquariumPhotoContainer>
        <TextContainer>
            <Title>{title}</Title>
            <Subtitle>{liters} Liters</Subtitle>
        </TextContainer>
    </Container>
);

export default AquariumSummary;
