import React from "react";
import client from "graphql/client";
import { gql } from "@apollo/client";
import { IBusiness, IUser } from "types";
import { GET_BUSINESS_CUSTOMERS } from "graphql/queries";
import { useQuery } from "@apollo/client";
import { User } from "components";
import styles from "./Business.module.css";

interface Props {
  business: IBusiness;
}

const BusinessDetails: React.FC<Props> = (props) => {
  const { loading, data: businessCustomers } = useQuery(
    GET_BUSINESS_CUSTOMERS,
    {
      variables: { getBusinessCustomersId: Number(props.business.id) },
    }
  );

  if (loading) {
    return <div> Loading </div>;
  }

  return (
    <div>
      <h1> Business Details </h1>
      <article className={styles.businessDetails}>
        <div>
          <h5> Business Name</h5>
          <p className={styles.businessName}>{props.business?.name}</p>
        </div>
        <div>
          <h5> Owner of Business </h5>
          <p>{props.business?.owner}</p>
        </div>
        <div>
          <h5> Year of Establishment</h5>
          <p>{props.business?.yearOfEstablishment}</p>
        </div>
      </article>

      <br />
      <article>
        <h3> Customers</h3>
        {businessCustomers.getBusinessCustomers.map(
          (el: any, index: number) => (
            <User key={index} user={el.customer} />
          )
        )}
      </article>
    </div>
  );
};

export default BusinessDetails;

export async function getStaticPaths() {
  const { data } = await client.query({
    query: gql`
      query GetAllBusinesses {
        getBusinesses {
          id
          name
          yearOfEstablishment
          owner
        }
      }
    `,
  });

  const paths = data.getBusinesses.map((bus: IBusiness) => {
    return {
      params: { BusinessDetails: bus.id.toString() },
    };
  });

  return { paths, fallback: false };
}

export async function getStaticProps(context: any) {
  const { data } = await client.query({
    query: gql`
      query GetBusiness($getBusinessId: ID!) {
        getBusiness(id: $getBusinessId) {
          id
          name
          yearOfEstablishment
          owner
        }
      }
    `,

    variables: {
      getBusinessId: context.params.BusinessDetails,
    },
  });

  return { props: { business: data.getBusiness } };
}
