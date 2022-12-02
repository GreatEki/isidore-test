import React, { useState } from "react";
import { Input, Button, User } from "../../components";
import styles from "./Customer.module.css";
import { ICustomer } from "../../types";
import { useQuery, useMutation } from "@apollo/client";
import { GET_CUSTOMERS } from "../../graphql/queries";
import {
  ADD_CUSTOMER,
  DELETE_CUSTOMER,
  UPDATE_CUSTOMER,
} from "../../graphql/mutations";
import client from "../../graphql/client";

const INITIAL_STATE = {
  id: 0,
  firstName: "",
  lastName: "",
  email: "",
};

export default function Customer() {
  const [customer, setCustomer] = useState<ICustomer>(INITIAL_STATE);
  const [actionType, setActionType] = useState("create");

  const { loading, error, data } = useQuery(GET_CUSTOMERS);

  const [addCustomer] = useMutation(ADD_CUSTOMER, {
    onCompleted: () => {
      client.refetchQueries({ include: [GET_CUSTOMERS] });
      setCustomer(INITIAL_STATE);
    },
  });

  const [updateCustomer] = useMutation(UPDATE_CUSTOMER, {
    onCompleted: () => {
      client.refetchQueries({ include: [GET_CUSTOMERS] });
      setCustomer(INITIAL_STATE);
      setActionType("create");
    },
  });

  const [deleteCustomer] = useMutation(DELETE_CUSTOMER, {
    onCompleted: () => {
      client.refetchQueries({ include: [GET_CUSTOMERS] });
    },
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCustomer((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent, actionType: string) => {
    const { id, firstName, lastName, email } = customer;
    e.preventDefault();
    switch (actionType) {
      case "create":
        addCustomer({ variables: { input: { firstName, lastName, email } } });
        break;
      case "update":
        updateCustomer({
          variables: {
            updateCustomerInput: { id, firstName, lastName, email },
          },
        });
        break;
      default:
        addCustomer({ variables: { input: { firstName, lastName, email } } });
        break;
    }
  };

  const onEdit = (customer: ICustomer) => {
    setActionType("update");
    setCustomer(customer);
  };

  const onDelete = (id: number) => {
    deleteCustomer({ variables: { deleteCustomerId: id } });
  };

  if (loading) {
    return <div> Loading ....</div>;
  }

  if (error) {
    return "Error";
  }

  return (
    <div className={styles.container}>
      <h1 className="text-center text-capitalize"> {actionType} Customer </h1>
      <form
        onSubmit={(e) => handleSubmit(e, actionType)}
        className={styles.businessForm}
      >
        <div className="form-item">
          <Input
            type="text"
            label="Firstname"
            name="firstName"
            value={customer.firstName}
            onChange={handleChange}
            required={true}
          />
        </div>
        <div className="form-item">
          <Input
            type="text"
            label="Lastname"
            name="lastName"
            value={customer.lastName}
            onChange={handleChange}
            required={true}
          />
        </div>

        <div className="form-item">
          <Input
            type="email"
            label="Email"
            name="email"
            value={customer.email}
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
          <h3 className="text-center"> Customers </h3>

          {data &&
            data.getCustomers.map((customer: any, index: number) => (
              <User
                key={index}
                user={customer}
                onDelete={onDelete}
                onEdit={onEdit}
              />
            ))}
        </article>
      </section>
    </div>
  );
}
