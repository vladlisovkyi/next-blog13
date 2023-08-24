import React from "react";

const PaddingContainer = ({ children }: { children: React.ReactNode }) => {
  return <div className="w-full px-8 mx-auto max-w-7xl">{children}</div>;
};

export default PaddingContainer;
