import React from "react";

interface Props {
  btnType: "button" | "submit" | "reset";
  btnText: string;
  onClick?: () => void;
}
const Button: React.FC<Props> = (props) => {
  const { btnType, btnText, onClick } = props;
  return (
    <div>
      <button type={btnType} onClick={onClick}>
        {btnText}
      </button>
    </div>
  );
};

export default Button;
