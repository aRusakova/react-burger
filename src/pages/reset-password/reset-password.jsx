import styles from "../form-styles.module.scss";
import classNames from "classnames";
import {
  Input,
  PasswordInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, Navigate, useNavigate } from "react-router-dom";
import useForm from "../../hooks/useForm";
import { fetchWithRefresh } from "../../utils/burger-api";

function ResetPassword() {

  const navigate = useNavigate();

  const { formValues, handleInputChange } = useForm({
    password: "",
    code: "",
  });

  const handleSubmit = async(e) => {
    e.preventDefault();
    try {
      const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: localStorage.getItem("accessToken"),
        },
        body: JSON.stringify({
          password: formValues.password,
          token: formValues.code,
        }),
      };
      await fetchWithRefresh("/password-reset/reset", requestOptions);
      localStorage.removeItem("fromForgotPasswordPage", true);
      navigate("/login");
    } catch (error) {
      console.log(error.message);
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
          value={formValues.password}
          placeholder={"Введите новый пароль"}
          name={"password"}
          extraClass="mb-6"
        />
        <Input
          type={"text"}
          placeholder={"Введите код из письма"}
          onChange={handleInputChange}
          value={formValues.code}
          name={"code"}
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

