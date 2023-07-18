import styles from "./error.module.scss";
import { InfoIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import classNames from "classnames";

function Error(): JSX.Element {
  return (
    <section className={styles.wrapper}>
        <InfoIcon type="error" />
        <p
          className={classNames(
            styles.text,
            "mt-3",
            "text text_type_main-medium"
          )}
        >
          Что-то пошло не так . . .
        </p>
        <p
          className={classNames(
            styles.text,
            "mt-3",
            "text text_type_main-medium"
          )}
        >
          Пожалуйста попробуйте перезагрузить страницу
        </p>
    </section>
  );
}

export default Error;
