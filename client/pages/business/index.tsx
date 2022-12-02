import React, { useState } from "react";
import { Input, Button } from "../../components";
import styles from "./Business.module.css";
import { ActionT } from "../../types";
import { CREATE_BUSINESS } from "../../graphql/mutations";
import { useMutation } from "@apollo/client";

const INITIAL_STATE = {
  id: 0,
  name: "",
  yearOfEstablishment: "",
  ownder: 1,
};

export default function Business() {
  const [business, setBusiness] = useState(INITIAL_STATE);
  const [actionType, setActionType] = useState<ActionT>("create");

  const [createBusiness] = useMutation(CREATE_BUSINESS, {
    onCompleted: (data) => {
      console.log(data);
    },
  });

  function handleSubmit(e: React.FormEvent, actionType: ActionT) {
    e.preventDefault();
    switch (actionType) {
      case "create":
        createBusiness({ variables: { input: { ...business } } });
    }
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setBusiness((prev) => ({ ...prev, [e.target.name]: e.target.value }));
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
            type="number"
            label="Year of Establishment"
            name="yearOfEstablishment"
            value={business.yearOfEstablishment}
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
          <h3 className="text-center"> Business</h3>
        </article>
      </section>
    </div>
  );
}
