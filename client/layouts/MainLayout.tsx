import React, { PropsWithChildren } from "react";
import MainLayoutCSS from "./mainLayout.module.css";

const MainLayout: React.FC<PropsWithChildren<{}>> = ({ children }) => {
  return <div className={MainLayoutCSS.mainLayout}>{children}</div>;
};

export default MainLayout;
