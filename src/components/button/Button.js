import React from "react";

const Button = ({ onClick, full = false, children }) => {
  return (
    <button
      onClick={onClick}
      className={`py-3 px-6 rounded-lg bg-primary capitalize mt-auto ${
        full ? "w-full" : ""
      } `}
    >
      {children}
    </button>
  );
};

export default Button;
