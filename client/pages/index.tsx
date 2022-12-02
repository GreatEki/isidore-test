import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { Input, Button, User } from "../components";
import React, { useState } from "react";
import { GET_USERS } from "../graphql/queries";
import { useQuery, useMutation } from "@apollo/client";
import { CREATE_USER, DELETE_USER, UPDATE_USER } from "../graphql/mutations";
import client from "../graphql/client";
import { IUser, ActionT } from "../types";

const INITIAL_STATE = {
  id: 0,
  firstName: "",
  lastName: "",
  email: "",
};

export default function Home() {
  const [user, setUser] = useState({
    id: 0,
    firstName: "",
    lastName: "",
    email: "",
  });
  const [actionType, setActionType] = useState<ActionT>("create");

  const { loading, error, data } = useQuery(GET_USERS);

  const [createUser] = useMutation(CREATE_USER, {
    onCompleted: (data) => {
      client.refetchQueries({
        include: [GET_USERS],
      });
      setUser(INITIAL_STATE);
    },
  });

  const [updateUser] = useMutation(UPDATE_USER, {
    onCompleted: () => {
      setUser(INITIAL_STATE);
      setActionType("create");
    },
  });

  const [deleteUser] = useMutation(DELETE_USER, {
    onCompleted: (data) => {
      client.refetchQueries({ include: [GET_USERS] });
    },
  });

  if (loading) {
    return <div> Loading ....</div>;
  }

  if (error) {
    return "Error";
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setUser((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e: React.FormEvent, actionType: ActionT) {
    e.preventDefault();
    switch (actionType) {
      case "create":
        createUser({
          variables: {
            input: {
              firstName: user.firstName,
              lastName: user.lastName,
              email: user.email,
            },
          },
        });
        break;
      case "update":
        updateUser({ variables: { input: { ...user } } });
        break;

      default:
        createUser({ variables: { input: { ...user } } });
        break;
    }
  }

  function editUser(user: IUser) {
    const { id, firstName, lastName, email } = user;
    setActionType("update");
    setUser({ id, firstName, lastName, email });
  }

  function onDelete(id: number) {
    deleteUser({ variables: { deleteUserId: id } });
  }

  return (
    <div className={styles.container}>
      <h1 className="text-center text-capitalize"> {actionType} User </h1>
      <form onSubmit={(e) => handleSubmit(e, actionType)}>
        <div className="form-item">
          <Input
            type="text"
            label="Firstname"
            name="firstName"
            value={user.firstName}
            onChange={handleChange}
            required={true}
          />
        </div>

        <div className="form-item">
          <Input
            type="text"
            label="Lastname"
            name="lastName"
            value={user.lastName}
            onChange={handleChange}
            required={true}
          />
        </div>

        <div className="form-item">
          <Input
            type="email"
            label="Email"
            name="email"
            value={user.email}
            onChange={handleChange}
            required={true}
          />
        </div>

        <div className="form-item">
          <Button btnType="submit" btnText="Submit" />
        </div>
      </form>

      <section>
        <article className="list">
          <h3 className="text-center"> Users</h3>
          {data.users.map((user: IUser, index: number) => (
            <User
              key={index}
              user={user}
              onEdit={editUser}
              onDelete={onDelete}
            />
          ))}
        </article>
      </section>
    </div>
  );
}
