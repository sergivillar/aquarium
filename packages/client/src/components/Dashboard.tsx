import React from 'react';
import styled from 'styled-components/macro';
import {SECONDARY_DARK} from '../constants/colors';
import AquariumSummary from './AquariumSummary';

const Container = styled.div`
    padding-right: 16px;
    padding-left: 16px;
`;

const Header = styled.div`
    height: 50px;
    display: flex;
    justify-content: flex-end;
`;

const HeaderButton = styled.button`
    background-color: ${SECONDARY_DARK};
    border: none;
    color: white;
    padding: 8px 16px;
    margin: 8px 16px;
    cursor: pointer;
`;

const Dashboard = () => (
    <Container>
        <Header>
            <HeaderButton type="button">OPEN</HeaderButton>
        </Header>
        <AquariumSummary liters={100} title={'Aquario'} />
    </Container>
);

export default Dashboard;
