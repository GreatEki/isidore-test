export interface IUser {
  id: number | string;
  firstName: string;
  lastName: string;
  email: string;
}

export type ActionT = "create" | "update";

export interface IBusiness {
  id: number | string;
  name: string;
  yearOfEstablishment: string;
  owner: number;
  ownerName: string;
}

export interface ICustomer {
  id: number | string;
  firstName: string;
  lastName: string;
  email: string;
}
