import React, { useState } from "react";
import { Input, Button, Dropdown, BusComp } from "../../components";
import styles from "./Business.module.css";
import { ActionT, IBusiness } from "../../types";
import { CREATE_BUSINESS, UPDATE_BUSINESS } from "../../graphql/mutations";
import { GET_BUSINESSES } from "../../graphql/queries";
import { GET_USERS } from "../../graphql/queries";
import { useQuery, useMutation } from "@apollo/client";
import client from "../../graphql/client";

const INITIAL_STATE = {
  id: 0,
  name: "",
  yearOfEstablishment: "",
  owner: 1,
};

export default function Business() {
  const [business, setBusiness] = useState<IBusiness>(INITIAL_STATE);
  const [actionType, setActionType] = useState<ActionT>("create");

  const { data: userList } = useQuery(GET_USERS);
  const { data: businesses } = useQuery(GET_BUSINESSES);

  const [createBusiness] = useMutation(CREATE_BUSINESS, {
    onCompleted: (data) => {
      client.refetchQueries({ include: [GET_BUSINESSES] });
    },
  });

  const [updateBusiness] = useMutation(UPDATE_BUSINESS);

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
        updateBusiness({ variables: { input: { ...business } } });
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
    console.log(e.target.value);
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
            list={userList?.users || []}
            textContent="firstName"
            optionValue="id"
            onChange={handleSelectChange}
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
            <BusComp key={index} business={bus} />
          ))}
        </article>
      </section>
    </div>
  );
}
