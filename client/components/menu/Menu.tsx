import React from "react";
import Link from "next/link";
import styles from "./Menu.module.css";

const Menu = () => {
  return (
    <nav className={styles.nav}>
      <ul className={styles.navLinks}>
        <li>
          <Link href="/">
            {" "}
            <a> User </a>
          </Link>
        </li>
        <li>
          <Link href="/business">
            {" "}
            <a> Business </a>
          </Link>
        </li>
        <li>
          <Link href="/customer">
            {" "}
            <a> Customer </a>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Menu;
