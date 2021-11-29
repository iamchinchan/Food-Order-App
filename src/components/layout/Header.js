import React, { Fragment } from "react";
import styles from "../../css/Header.module.css";
import mealsImage from "../../assets/meals.jpg";
import HeaderCartButton from "./HeaderCartButton";
const Header = (props) => (
  <Fragment>
    <header className={styles.header}>
      <h1>Meals</h1>
      <HeaderCartButton onClick={props.onShowCart}></HeaderCartButton>
    </header>
    <div className={styles["main-image"]}>
      <img src={mealsImage} alt="a table full of delecious food" />
    </div>
  </Fragment>
);

export default Header;
