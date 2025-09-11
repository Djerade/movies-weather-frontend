import { gql } from "@apollo/client";

export const LOGIN_MUTATION = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      id
      email
      name
    }
  }
`;

export const SIGNUP_MUTATION = gql`
  mutation Signup(
    $name: String!
    $email: String!
    $password: String!
    $city: String!
  ) {
    signup(name: $name, email: $email, password: $password, city: $city) {
      id
      email
      name
    }
  }
`;

export const GET_USER_QUERY = gql`
  query GetUser {
    me {
      id
      email
      name
    }
  }
`;
