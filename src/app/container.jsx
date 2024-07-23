import React from "react";

const Container = ({ children }) => {
  return (
    <div className="sm:container mx-auto">
      <div>{children}</div>
    </div>
  );
};

export default Container;