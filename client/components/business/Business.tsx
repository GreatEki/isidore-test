import React from "react";
import { IBusiness } from "../../types";
import styles from "./Business.module.css";
import { FiEdit2 } from "react-icons/fi";
import { MdOutlineDelete } from "react-icons/md";
interface Props {
  business: IBusiness;
}
const BusComp: React.FC<Props> = ({ business }) => {
  return (
    <main className={styles.busContainer}>
      <div className={styles.business}>
        <h5>Business Name</h5>
        <p>{business.name}</p>
      </div>

      <div className={styles.business}>
        <h5>Year of Establishment</h5>
        <p> {business.yearOfEstablishment}</p>
      </div>

      <div className={styles.business}>
        <h5> Edit </h5>
        <FiEdit2 />
      </div>

      <div className={styles.business}>
        <h5> Delete </h5>
        <MdOutlineDelete />
      </div>
    </main>
  );
};

export default BusComp;
