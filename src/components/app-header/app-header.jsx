import React from "react";
import styles from "./app-header.module.scss";
import {
  Logo,
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import classNames from 'classnames';

function AppHeader() {
  return (
    <header className={classNames(styles.header, 'p-4')}>
      <div className={styles.logoWrapper}>
        <Logo />
      </div>
      <nav className={styles.menu}>
        <div className={styles.leftCol}>
            <button className={classNames(styles.menuItem, "pl-5 pr-5 pb-4 pt-4")}>
          <BurgerIcon type="primary" />
          <p className={classNames(styles.menuText, "text text_type_main-default", "ml-2")}>Конструктор</p> 
        </button>
        <button className={classNames(styles.menuItem, "pl-5 pr-5 pb-4 pt-4", "ml-2")}>
          <ListIcon type="secondary" />
          <p className={classNames(styles.menuText, "text text_type_main-default", "ml-2")}>Лента заказов</p> 
        </button>
        </div>
        <button className={classNames(styles.menuItem, "pl-5 pr-5 pb-4 pt-4")}>
          <ProfileIcon type="secondary" />
          <p className={classNames(styles.menuText, "text text_type_main-default", "ml-2")}>Личный кабинет</p> 
        </button>
      </nav>
    </header>
  );
}

export default AppHeader;
