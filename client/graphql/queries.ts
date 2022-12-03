import { gql } from "@apollo/client";

export const GET_USERS = gql`
  query GetAllUsers {
    users {
      id
      firstName
      lastName
      email
    }
  }
`;

export const GET_BUSINESSES = gql`
  query GetAllBusinesses {
    getBusinesses {
      id
      name
      yearOfEstablishment
      owner
    }
  }
`;

export const GET_BUSINESS = gql`
  query GetBusiness($getBusinessId: ID!) {
    getBusiness(id: $getBusinessId) {
      id
      name
      owner
    }
  }
`;

export const GET_CUSTOMERS = gql`
  query GetCustomers {
    getCustomers {
      id
      email
      firstName
      lastName
    }
  }
`;

export const GET_BUSINESS_CUSTOMERS = gql`
  query GetBusinessCustomers($getBusinessCustomersId: ID!) {
    getBusinessCustomers(id: $getBusinessCustomersId) {
      id
      business {
        id
        name
      }
      customer {
        firstName
        lastName
      }
    }
  }
`;
