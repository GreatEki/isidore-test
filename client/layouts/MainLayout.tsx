import React, { PropsWithChildren } from "react";
import MainLayoutCSS from "./mainLayout.module.css";
import { Menu } from "../components";

const MainLayout: React.FC<PropsWithChildren<{}>> = ({ children }) => {
  return (
    <div className={MainLayoutCSS.mainLayout}>
      <Menu />
      {children}
    </div>
  );
};

export default MainLayout;
