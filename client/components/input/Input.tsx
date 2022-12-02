import * as React from "react";
import InputCSS from "./Input.module.css";

interface Props {
  type: string;
  name: string;
  value: any;
  required?: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label: string;
}

const Input: React.FC<Props> = (props) => {
  return (
    <div className={InputCSS.inputWrapper}>
      <label className={InputCSS.label} htmlFor={props.name}>
        {" "}
        {props.label}{" "}
      </label>
      <input
        className={InputCSS.input}
        type={props.type}
        required={props.required}
        onChange={props.onChange}
        name={props.name}
        value={props.value}
      />
    </div>
  );
};

export default Input;
