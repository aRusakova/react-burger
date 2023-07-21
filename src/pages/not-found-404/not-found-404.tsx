import styles from "./not-found-404.module.scss";
import classNames from "classnames";
import {
  InfoIcon,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link } from "react-router-dom";

function NotFound404(): JSX.Element {
  return (
    <section className={styles.wrapper}>
      <div className={styles.top}>
        <InfoIcon type="error" />
        <p className={classNames(styles.text, "text text_type_main-large")}>
          404
        </p>
        <InfoIcon type="error" />
      </div>
      <p className={classNames("mt-6", "text text_type_main-medium")}>
        Упс! Здесь ничего нет
      </p>
      <p
        className={classNames(
          "mt-3",
          "text text_type_main-medium",
          styles.text
        )}
      >
        Попробуйте вернуться на{" "}
        <Link to="/">
          <Button
            htmlType="button"
            type="secondary"
            size="large"
            extraClass={classNames(styles.button, "text text_type_main-medium")}
          >
            ГЛАВНУЮ СТРАНИЦУ
          </Button>
        </Link>{" "}
        и попробовать снова
      </p>
    </section>
  );
}

export default NotFound404;
