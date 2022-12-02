import { gql } from "@apollo/client";

export const CREATE_USER = gql`
  mutation CreateUser($input: CreateUserInput!) {
    createUser(input: $input) {
      firstName
      lastName
      email
    }
  }
`;

export const UPDATE_USER = gql`
  mutation Mutation($input: updateUserInput!) {
    updateUser(input: $input) {
      id
      firstName
      lastName
      email
    }
  }
`;

export const DELETE_USER = gql`
  mutation DeleteUser($deleteUserId: ID!) {
    deleteUser(id: $deleteUserId)
  }
`;

export const CREATE_BUSINESS = gql`
  mutation CreateBusiness($input: CreateBusinessInput!) {
    createBusiness(input: $input) {
      id
      name
      yearOfEstablishment
      owner
    }
  }
`;

export const UPDATE_BUSINESS = gql`
  mutation UpdateBusiness($updateBusinessInput: UpdateBusinessInput!) {
    updateBusiness(input: $updateBusinessInput) {
      id
      name
      yearOfEstablishment
      owner
    }
  }
`;

export const DELETE_BUSINESS = gql`
  mutation DeleteBusiness($deleteBusinessId: ID!) {
    deleteBusiness(id: $deleteBusinessId)
  }
`;

export const ADD_CUSTOMER = gql`
  mutation AddCustomer($input: AddCustomerInput!) {
    addCustomer(input: $input) {
      firstName
      lastName
      email
    }
  }
`;
