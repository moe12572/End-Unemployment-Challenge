import { gql } from '@apollo/client';

export const GET_LAUNCHES = gql`
query GetLaunches($limit: Int, $offset: Int, $order: String) {
  launches(limit: $limit, offset: $offset, order: $order) {
      id
      mission_name
      launch_date_local
      launch_year
      rocket {
        rocket_name
      }
      launch_success
      details
      launch_site {
        site_name
      }
      links {
        video_link
        article_link
        wikipedia
      }
    }
  }
`;

