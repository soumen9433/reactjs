import { gql } from "@apollo/client";

export const CREATE_USER_MUTATION = gql`
  mutation RegisterUser(
    $name: String!
    $email: String!
    $username: String!
    $password: String!
  ) {
    register(
      name: $name
      email: $email
      username: $username
      password: $password
    ) {
      user {
        id
        name
        username
        email
      }
      token
      refreshToken
    }
  }
`;
