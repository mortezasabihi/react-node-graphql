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

export const UPDATE_USER = gql`
  mutation UpdateUser(
    $id: String!
    $name: String!
    $email: String!
    $role: String!
  ) {
    updateUser(
      updateUserInput: { _id: $id, name: $name, email: $email, role: $role }
    ) {
      name
      email
      role
    }
  }
`;
