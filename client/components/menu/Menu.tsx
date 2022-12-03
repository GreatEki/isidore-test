import React from "react";
import Link from "next/link";
import styles from "./Menu.module.css";

const Menu = () => {
  return (
    <nav className={styles.nav}>
      <ul className={styles.navLinks}>
        <li>
          <Link href="/"> User</Link>
        </li>
        <li>
          <Link href="/business"> Business</Link>
        </li>
        <li>
          <Link href="/customer"> Customer</Link>
        </li>
        <li>
          <Link href="/join"> Customer/Business </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Menu;
