import { gql } from "apollo-boost";

export const VIEW_FEED = gql`
  query viewFeed {
    viewFeed {
      id
    }
  }
`;
