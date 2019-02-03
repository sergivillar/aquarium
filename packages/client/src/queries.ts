import gql from 'graphql-tag';

export const GetAquariums = gql`
    {
        me {
            aquariums {
                id
                name
                liters
            }
        }
    }
`;
