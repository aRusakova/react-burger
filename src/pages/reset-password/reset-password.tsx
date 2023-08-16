import styles from "../form-styles.module.scss";
import classNames from "classnames";
import {
  Input,
  PasswordInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, Navigate, useNavigate } from "react-router-dom";
import useForm from "../../hooks/useForm";
import { createReguestOptions, fetchWithRefresh } from "../../utils/burger-api";
import { FormEvent } from "react";

function ResetPassword(): JSX.Element {

  const navigate = useNavigate();

  const { formValues, handleInputChange } = useForm({
    password: "",
    token: "",
  });

  const handleSubmit = async(e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const requestOptions = createReguestOptions("POST", formValues, true);
      await fetchWithRefresh("/password-reset/reset", requestOptions);
      localStorage.removeItem("fromForgotPasswordPage");
      navigate("/login");
    } catch (error) {
      navigate("/forgot-password");
    }
  };

  if (!localStorage.getItem("fromForgotPasswordPage")) {
    return <Navigate to="/" />;
  }

  return (
    <section className={styles.wrapper}>
      <p className={classNames("mb-6", "text text_type_main-medium")}>
        Восстановление пароля
      </p>
      <form onSubmit={handleSubmit} className={styles.form}>
        <PasswordInput
          onChange={handleInputChange}
          value={formValues.password ?? ''}
          placeholder={"Введите новый пароль"}
          name={"password"}
          extraClass="mb-6"
        />
        <Input
          type={"text"}
          placeholder={"Введите код из письма"}
          onChange={handleInputChange}
          value={formValues.token ?? ''}
          name={"token"}
          size={"default"}
          extraClass="mb-6"
        />
        <Button
          htmlType="submit"
          type="primary"
          size="medium"
          extraClass="mb-20"
        >
          Сохранить
        </Button>
      </form>
      <p className="text text_type_main-default">
        Вспомнили пароль?&nbsp;
        <Link to="/login">
          <Button
            htmlType="button"
            type="secondary"
            size="medium"
            extraClass={styles.button}
          >
            Войти
          </Button>
        </Link>
      </p>
    </section>
  );
}

export default ResetPassword;

