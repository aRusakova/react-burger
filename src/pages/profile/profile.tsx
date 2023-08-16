import styles from "./profile.module.scss";
import classNames from "classnames";
import { useDispatch } from "../../services/store";
import { NavLink } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { logoutUser } from "../../services/user/actions";

function Profile(): JSX.Element {

  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(logoutUser());
  };

  return (
    <section className={styles.wrapper}>
      <div className={classNames(styles.profileMenu, "mr-15")}>
        <div className={styles.menuItem}>
            <NavLink end to={"/profile"} className={({isActive}) => isActive ? styles.active : styles.pending}>
                <p className={classNames(styles.menuItemText,"text text_type_main-medium")}>Профиль</p>
            </NavLink>
        </div>
        <div className={styles.menuItem}>
            <NavLink to={"/profile/orders"} className={({isActive}) => isActive ? styles.active : styles.pending}>
                <p className={classNames(styles.menuItemText,"text text_type_main-medium")}>История заказов</p>
            </NavLink>
        </div>
        <div className={styles.menuItem}>
            <button onClick={handleClick} className={classNames(styles.pending, styles.button)}>
                <p className={classNames(styles.menuItemText,"text text_type_main-medium")}>Выход</p>
            </button>
        </div>
      </div>
      <div className={styles.profileContent}>
        <Outlet />
      </div>
    </section>
  );
}

export default Profile;
