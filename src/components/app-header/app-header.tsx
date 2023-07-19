import styles from "./app-header.module.scss";
import {
  Logo,
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import classNames from "classnames";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { IUser } from "../../utils/types";

function AppHeader(): JSX.Element {

  //@ts-ignore
  const user: IUser = useSelector((store) => store.user.user);

  return (
    <header className={classNames(styles.header, "p-4")}>
      <div className={styles.logoWrapper}>
        <Logo />
      </div>
      <nav className={styles.menu}>
        <div className={styles.leftCol}>
          <div className="pl-5 pr-5 pb-4 pt-4">
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? styles.menuItemActive : styles.menuItem
              }
            >
              <BurgerIcon type="primary" />
              <p
                className={classNames(
                  styles.menuText,
                  "text text_type_main-default",
                  "ml-2"
                )}
              >
                Конструктор
              </p>
            </NavLink>
          </div>
          <div className="pl-5 pr-5 pb-4 pt-4">
            <NavLink
              to="/orders"
              className={({ isActive }) =>
                isActive ? styles.menuItemActive : styles.menuItem
              }
            >
              <ListIcon type="secondary" />
              <p
                className={classNames(
                  styles.menuText,
                  "text text_type_main-default",
                  "ml-2"
                )}
              >
                Лента заказов
              </p>
            </NavLink>
          </div>
        </div>
        <div className="pl-5 pr-5 pb-4 pt-4">
          <NavLink
            to="/profile"
            className={({ isActive }) =>
              isActive ? styles.menuItemActive : styles.menuItem
            }
          >
            <ProfileIcon type="secondary" />
            <p
              className={classNames(
                styles.menuText,
                "text text_type_main-default",
                "ml-2"
              )}
            >{user ? user.name : 'Личный кабинет'}
            </p>
          </NavLink>
        </div>
      </nav>
    </header>
  );
}

export default AppHeader;
