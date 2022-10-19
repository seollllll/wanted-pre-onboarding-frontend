import React from "react";
import "../../style/Template.css";

const Template = ({ children }) => {
  return (
    <div className="Template">
      <div className="title">ToDo List</div>
      <div>{children}</div>
    </div>
  );
};

export default Template;
