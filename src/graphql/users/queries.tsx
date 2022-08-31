import { gql } from "@apollo/client";

export const LOAD_USERS = gql`
  query UserLists {
    users {
      email
      name
      username
      id
    }
  }
`;
