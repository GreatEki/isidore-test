import React, { useState } from "react";
import { Input, Button, Dropdown, BusComp } from "components";
import styles from "./Business.module.css";
import { ActionT, IBusiness } from "types";
import {
  CREATE_BUSINESS,
  DELETE_BUSINESS,
  UPDATE_BUSINESS,
} from "graphql/mutations";
import { GET_BUSINESSES } from "graphql/queries";
import { GET_USERS } from "graphql/queries";
import { useQuery, useMutation } from "@apollo/client";
import client from "graphql/client";

const INITIAL_STATE = {
  id: 0,
  name: "",
  yearOfEstablishment: "",
  owner: 0,
  ownerName: "",
};

export default function Business() {
  const [business, setBusiness] = useState<IBusiness>(INITIAL_STATE);
  const [actionType, setActionType] = useState<ActionT>("create");

  const { data: userList } = useQuery(GET_USERS);
  const { data: businesses } = useQuery(GET_BUSINESSES);

  const [createBusiness] = useMutation(CREATE_BUSINESS, {
    onCompleted: (data) => {
      client.refetchQueries({ include: [GET_BUSINESSES] });
      setBusiness(INITIAL_STATE);
      setActionType("create");
    },
  });

  const [updateBusiness] = useMutation(UPDATE_BUSINESS, {
    onCompleted: () => {
      client.refetchQueries({ include: [GET_BUSINESSES] });
      setBusiness(INITIAL_STATE);
    },
  });

  const [deleteBusiness] = useMutation(DELETE_BUSINESS, {
    onCompleted: () => {
      client.refetchQueries({ include: [GET_BUSINESSES] });
    },
  });

  function handleSubmit(e: React.FormEvent, actionType: ActionT) {
    console.log(business);
    e.preventDefault();
    const { id, name, yearOfEstablishment, owner } = business;
    switch (actionType) {
      case "create":
        createBusiness({
          variables: {
            input: {
              name,
              yearOfEstablishment,
              owner,
            },
          },
        });
        break;
      case "update":
        updateBusiness({
          variables: {
            updateBusinessInput: { id, name, yearOfEstablishment, owner },
          },
        });
        break;
      default:
        createBusiness({
          variables: {
            input: {
              name,
              yearOfEstablishment,
              owner: owner,
            },
          },
        });
        break;
    }
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setBusiness((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleSelectChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const theOwner = userList.users.find(
      (user: any) => user.id === e.target.value
    );

    setBusiness((prev) => ({
      ...prev,
      owner: theOwner?.id,
      ownerName: theOwner.firstName,
    }));
  }

  function onEdit(business: IBusiness) {
    setActionType("update");
    const theOwner = userList.users.find(
      (user: any) => user.id === business.owner
    );
    setBusiness({
      ...business,
      owner: theOwner.id,
      ownerName: theOwner.firstName,
    });
  }

  function onDelete(id: number) {
    deleteBusiness({ variables: { deleteBusinessId: id } });
  }

  return (
    <div className={styles.container}>
      <h1 className="text-center text-capitalize"> {actionType} Business </h1>
      <form
        onSubmit={(e) => handleSubmit(e, actionType)}
        className={styles.businessForm}
      >
        <div className="form-item">
          <Input
            type="text"
            label="Business Name"
            name="name"
            value={business.name}
            onChange={handleChange}
            required={true}
          />
        </div>
        <div className="form-item">
          <Input
            type="text"
            label="Year of Establishment"
            name="yearOfEstablishment"
            value={business.yearOfEstablishment}
            onChange={handleChange}
            required={true}
          />
        </div>

        <div className="form-item">
          <Dropdown
            label="Owner of Business"
            name="owner"
            list={userList?.users || []}
            textContent="firstName"
            optionValue="id"
            onChange={handleSelectChange}
            state={business.ownerName}
          />
        </div>

        <div className="form-item">
          <Button btnType="submit" btnText="Submit" />
        </div>
      </form>

      <section>
        <article className="list">
          <h3 className="text-center"> Business</h3>
          {businesses?.getBusinesses.map((bus: any, index: number) => (
            <BusComp
              key={index}
              business={bus}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))}
        </article>
      </section>
    </div>
  );
}
