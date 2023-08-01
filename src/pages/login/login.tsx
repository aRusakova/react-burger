import styles from "../form-styles.module.scss";
import classNames from "classnames";
import {
  Input,
  PasswordInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link } from "react-router-dom";
import useForm from "../../hooks/useForm";
import { useDispatch } from "../../services/store";
import { loginUser } from "../../services/user/actions";
import { FormEvent } from "react";

function Login(): JSX.Element {

  const dispatch = useDispatch();

  const { formValues, handleInputChange } = useForm({
    email: "",
    password: "",
  });

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(loginUser(formValues));
  };

  return (
    <section className={styles.wrapper}>
      <p className={classNames("mb-6", "text text_type_main-medium")}>Вход</p>
      <form onSubmit={handleSubmit} className={styles.form}>
        <Input
          type={"text"}
          placeholder={"E-mail"}
          onChange={handleInputChange}
          value={formValues.email}
          name={"email"}
          size={"default"}
          extraClass="mb-6"
        />
        <PasswordInput
          onChange={handleInputChange}
          value={formValues.password}
          name={"password"}
          extraClass="mb-6"
        />
        <Button
          htmlType="submit"
          type="primary"
          size="medium"
          extraClass="mb-20"
        >
          Войти
        </Button>
      </form>
      <p className={classNames("mb-4", "text text_type_main-default")}>
        Вы — новый пользователь?&nbsp;
        <Link to="/register">
          <Button
            htmlType="button"
            type="secondary"
            size="medium"
            extraClass={styles.button}
          >
            Зарегистрироваться
          </Button>
        </Link>
      </p>
      <p className="text text_type_main-default">
        Забыли пароль?&nbsp;
        <Link to="/forgot-password">
          <Button
            htmlType="button"
            type="secondary"
            size="medium"
            extraClass={styles.button}
          >
            Восстановить пароль
          </Button>
        </Link>
      </p>
    </section>
  );
}

export default Login;
