import React, { FormEvent, useState } from "react";
import { Dropdown, Button, BusComp } from "components";
import { GET_CUSTOMERS, GET_BUSINESSES } from "graphql/queries";
import { ADD_CUSTOMER_TO_BUSINESS } from "graphql/mutations";
import { useQuery, useMutation } from "@apollo/client";
import styles from "./Join.module.css";
import { IBusiness, ICustomer } from "types";

export default function CustomerBusiness() {
  const [theBusiness, setTheBusiness] = useState<IBusiness>({
    id: 0,
    name: "",
    yearOfEstablishment: "",
    owner: 0,
    ownerName: "",
  });

  const [theCustomer, setTheCustomer] = useState<ICustomer>({
    id: 0,
    firstName: "",
    lastName: "",
    email: "",
  });
  const { data: businessList } = useQuery(GET_BUSINESSES);
  const { data: customerList } = useQuery(GET_CUSTOMERS);

  const [addCustomerToBusiness] = useMutation(ADD_CUSTOMER_TO_BUSINESS, {
    onCompleted: (data) => {
      console.log(data);
    },
  });

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    let selected;
    switch (name) {
      case "business":
        selected = businessList.getBusinesses.find(
          (bus: IBusiness) => bus.id === Number(value)
        );
        setTheBusiness(selected);
        break;
      case "customer":
        selected = customerList.getCustomers.find(
          (cus: ICustomer) => cus.id === value
        );
        setTheCustomer(selected);
        break;
      default:
        return selected;
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    addCustomerToBusiness({
      variables: {
        addCustomerToBusinessInput: {
          business: theBusiness.id,
          customer: theCustomer.id,
        },
      },
    });
  };

  return (
    <div className={styles.container}>
      <h1 className="text-center text-capitalize">
        {" "}
        Connect Customer to Busines{" "}
      </h1>
      <form onSubmit={handleSubmit}>
        <div className="form-item">
          <Dropdown
            list={businessList?.getBusinesses || []}
            textContent="name"
            optionValue="id"
            state={"Ekene"}
            onChange={handleSelectChange}
            name="business"
            label="Select Business"
          />
        </div>
        <div className="form-item">
          <Dropdown
            label="Select Customer"
            name="customer"
            list={customerList?.getCustomers || []}
            textContent="firstName"
            optionValue="id"
            state={theCustomer.firstName}
            onChange={handleSelectChange}
          />
        </div>

        <div className="form-item">
          <Button btnType="submit" btnText="Submit" />
        </div>
      </form>

      <section>
        <article className="list">
          <h3 className="text-center"> Businesses </h3>
          {businessList?.getBusinesses.map((bus: any, index: number) => (
            <BusComp key={index} business={bus} />
          ))}
        </article>
      </section>
    </div>
  );
}
