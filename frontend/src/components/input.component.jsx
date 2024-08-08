import { useState } from "react";

const Input = ({ name, type, id, value, placeholder, icon }) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  return (
    <div className="relative w-full mb-4">
      <input
        type={type == "password" ? (isPasswordVisible ? "text" : type) : type}
        name={name}
        id={id}
        defaultValue={value}
        placeholder={placeholder}
        className="input-box"
      />
      <i className={`fi fi-rr-${icon} input-icon`}></i>
      {type == "password" && (
        <i
          className={`fi fi-rr-eye${
            !isPasswordVisible ? "-crossed" : ""
          } input-icon left-auto right-4 cursor-pointer`}
          onClick={() => setIsPasswordVisible((prev) => !prev)}
        ></i>
      )}
    </div>
  );
};

export default Input;
