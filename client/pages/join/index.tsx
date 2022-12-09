import React, { FormEvent, useState } from "react";
import { useRouter } from "next/router";
import { Dropdown, Button, BusComp } from "components";
import { GET_CUSTOMERS, GET_BUSINESSES } from "graphql/queries";
import { ADD_CUSTOMER_TO_BUSINESS } from "graphql/mutations";
import { useQuery, useMutation } from "@apollo/client";
import styles from "./Join.module.css";
import { IBusiness, IUser } from "types";

export default function CustomerBusiness() {
  const router = useRouter();
  const [theBusiness, setTheBusiness] = useState<IBusiness>({
    id: 0,
    name: "",
    yearOfEstablishment: "",
    owner: 0,
    ownerName: "",
  });

  const [theCustomer, setTheCustomer] = useState<IUser>({
    id: 0,
    firstName: "",
    lastName: "",
    email: "",
  });
  const { data: businessList } = useQuery(GET_BUSINESSES, {
    onCompleted: () => {
      setTheBusiness(businessList?.getBusinesses[0]);
    },
  });
  const { data: customerList } = useQuery(GET_CUSTOMERS, {
    onCompleted: () => {
      setTheCustomer(customerList?.getCustomers[0]);
    },
  });

  const [addCustomerToBusiness] = useMutation(ADD_CUSTOMER_TO_BUSINESS, {
    onCompleted: () => {
      router.push(`/business/${theBusiness.id}`);
    },
  });

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    let selected;
    switch (name) {
      case "business":
        selected = businessList?.getBusinesses.find(
          (bus: IBusiness) => Number(bus.id) === Number(value)
        );
        setTheBusiness(selected);
        break;
      case "customer":
        selected = customerList?.getCustomers.find(
          (cus: IUser) => Number(cus.id) === Number(value)
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
          business: Number(theBusiness.id),
          customer: Number(theCustomer.id),
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
            state={theBusiness?.name}
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
            state={theCustomer?.firstName}
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
          {businessList &&
            businessList?.getBusinesses.map((bus: any, index: number) => (
              <BusComp key={index} business={bus} />
            ))}
        </article>
      </section>
    </div>
  );
}
