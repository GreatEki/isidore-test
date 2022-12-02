import React, { useState, useEffect } from "react";
import { MdKeyboardArrowDown } from "react-icons/md";
import styles from "./Dropdown.module.css";

interface Props {
  list: any[];
  textContent: string;
  optionValue: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  state: any;
}

interface SelectI {
  value: any;
  textContent: any;
  key: any;
}
const Dropdown: React.FC<Props> = (props) => {
  const { list, textContent, optionValue, onChange, state } = props;
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
          key: item[key],
        };
      }

      return optionData;
    });

    setOptionList(opts);
  }, [list, optionValue, textContent]);

  return (
    <label className={styles.customSelector}>
      {" "}
      <select
        className={styles.selectDropdown}
        onChange={onChange}
        value={state}
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
    </label>
  );
};

export default Dropdown;
