export interface IUser {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
}

export type ActionT = "create" | "update";

export interface IBusiness {
  id: number;
  name: string;
  yearOfEstablishment: string;
  owner: number;
  ownerName: string;
}
