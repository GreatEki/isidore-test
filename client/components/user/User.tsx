import React from "react";
import styles from "./User.module.css";
import { FiEdit2 } from "react-icons/fi";
import { MdOutlineDelete } from "react-icons/md";
import { IUser } from "../../types";

interface Props {
  user: IUser;
  onDelete?: (id: number) => void;
  onEdit?: (user: IUser) => void;
}

const Users: React.FC<Props> = ({ user, onDelete, onEdit }) => {
  function handleDelete(id: number) {
    if (onDelete) onDelete(id);
  }

  function handleEdit(user: IUser) {
    if (onEdit) onEdit(user);
  }
  return (
    <div className={styles.users}>
      <div>
        <h5> FirstName</h5>
        <p>{user.firstName}</p>
      </div>
      <div>
        <h5> LastName</h5>
        <p>{user.lastName}</p>
      </div>
      <div>
        <h5> Email</h5>
        <p>{user.email}</p>
      </div>

      <div className="cursor" onClick={() => handleEdit(user)}>
        <h5> Edit </h5>
        <FiEdit2 />
      </div>

      <div className="cursor" onClick={() => handleDelete(user.id)}>
        <h5> Delete </h5>
        <MdOutlineDelete />
      </div>
    </div>
  );
};

export default Users;
