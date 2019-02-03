import React from 'react';
import gql from 'graphql-tag';
import {Query} from 'react-apollo';
import styled from 'styled-components/macro';
import {SECONDARY_DARK} from '../constants/colors';
import AquariumSummary from './AquariumSummary';
import {Query as QueryModel} from '../types';
import {GetAquariums} from '../queries';

const Container = styled.div`
    padding-right: 16px;
    padding-left: 16px;
`;

const AquariumsContainer = styled.div`
    & > div {
        margin-bottom: 32px;
    }
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
    <Query<QueryModel> query={GetAquariums}>
        {({loading, error, data}) => {
            if (loading) {
                return '<h1>Loading</h1>';
            }

            if (error) {
                return '<h1>Error</h1>';
            }

            if (!data) {
                return '<h1>No data</h1>';
            }

            return (
                <Container>
                    <Header>
                        <HeaderButton type="button">OPEN</HeaderButton>
                    </Header>
                    <AquariumsContainer>
                        {data.me.aquariums.map(({id, name, liters}) => (
                            <AquariumSummary key={id} liters={liters} title={name} />
                        ))}
                    </AquariumsContainer>
                </Container>
            );
        }}
    </Query>
);

export default Dashboard;
