import { gql } from "@apollo/client";

export const DELETE_USER = gql`
  mutation RemoveUser($_id: String!) {
    removeUser(_id: $_id)
  }
`;

export const ADD_USER = gql`
  mutation CreateUser(
    $name: String!
    $email: String!
    $password: String!
    $role: String!
  ) {
    createUser(
      createUserInput: {
        name: $name
        email: $email
        password: $password
        role: $role
      }
    ) {
      name
      email
      password
      role
    }
  }
`;
