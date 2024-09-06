import { gql } from '@apollo/client';

export const GET_LAUNCHES = gql`
  query GetLaunches {
    launches(limit: 1000) {
      id
      mission_name
      launch_year
      rocket {
        rocket_name
      }
    }
  }
`;

export const GET_LAUNCH_BY_ID = gql`
  query GetLaunchById($id: ID!) {
    launch(id: $id) {
      id
      mission_name
      launch_date_local
      rocket {
        rocket_name
      }
      details
    }
  }
`;
