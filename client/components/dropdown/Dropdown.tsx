import React, { useState, useEffect } from "react";
import { MdKeyboardArrowDown } from "react-icons/md";
import styles from "./Dropdown.module.css";
import { v4 } from "uuid";

interface Props {
  list: any[];
  textContent: string;
  optionValue: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  state: any;
  label: string;
  name: string;
}

interface SelectI {
  value: any;
  textContent: any;
  key: any;
}
const Dropdown: React.FC<Props> = (props) => {
  const { label, name, list, textContent, optionValue, onChange, state } =
    props;
  const [optionList, setOptionList] = useState<SelectI[]>([]);

  useEffect(() => {
    const opts = list.map((item) => {
      let optionData: SelectI = {
        value: "",
        textContent: "",
        key: "",
      };

      for (const key in item) {
        optionData = {
          value: item[optionValue],
          textContent: item[textContent],
          key: v4(),
        };
      }

      return optionData;
    });

    setOptionList(opts);
  }, [list, optionValue, textContent]);

  return (
    <div>
      <label> {label} </label>
      <div className={styles.customSelector}>
        <select
          className={styles.selectDropdown}
          onChange={onChange}
          defaultValue={state}
          name={name}
        >
          {optionList ? (
            optionList.map((item, index) => (
              <option key={index} value={item.value}>
                {item.textContent}
              </option>
            ))
          ) : (
            <option value="null"> No Data Available </option>
          )}
        </select>
        <span className={styles.arrow}>
          {" "}
          <MdKeyboardArrowDown />{" "}
        </span>
      </div>
    </div>
  );
};

export default Dropdown;
