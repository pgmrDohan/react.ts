import {Outlet} from "react-router";
import styles from "./index.module.scss";

export const Layout = () => {
  return (
    <>
      <Outlet />
    </>
  );
};
