import React from "react";

import "./InputMed.css";

const InputMed = ({
  type,
  placeholder,
  name,
  value,
  onChange,
  onClick,
  children,
  multiple,
  radio,
  checked,
}) => {
  return (
    <div className={`inputmed ${radio}`}>
      <div>{children}</div>
      <input
        type={type}
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onChange}
        onClick={onClick}
        multiple={multiple}
        checked={checked}
      />
    </div>
  );
};

export default InputMed;
