import React from "react";
import { IBusiness } from "../../types";
import styles from "./Business.module.css";
import { FiEdit2 } from "react-icons/fi";
import { MdOutlineDelete } from "react-icons/md";
import { GrView } from "react-icons/gr";
import { useRouter } from "next/router";
interface Props {
  business: IBusiness;
  onDelete?: (id: number) => void;
  onEdit?: (bus: IBusiness) => void;
}
const BusComp: React.FC<Props> = ({ business, onEdit, onDelete }) => {
  const router = useRouter();
  const handleEdit = (bus: IBusiness) => {
    if (onEdit) {
      onEdit(bus);
    }
  };

  const handleDelete = (id: number) => {
    if (onDelete) {
      onDelete(id);
    }
  };

  const handleView = (id: number) => {
    router.push(`/business/${id}`);
  };

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

      <div className={styles.business} onClick={() => handleView(business.id)}>
        <h5> View </h5>
        <GrView />
      </div>

      <div className={styles.business} onClick={() => handleEdit(business)}>
        <h5> Edit </h5>
        <FiEdit2 />
      </div>

      <div
        className={styles.business}
        onClick={() => handleDelete(business.id)}
      >
        <h5> Delete </h5>
        <MdOutlineDelete />
      </div>
    </main>
  );
};

export default BusComp;
