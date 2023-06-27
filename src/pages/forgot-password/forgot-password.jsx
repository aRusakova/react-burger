import styles from "../form-styles.module.scss";
import classNames from "classnames";
import {
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, useNavigate } from "react-router-dom";
import useForm from "../../hooks/useForm";
import { createReguestOptions, fetchWithRefresh } from "../../utils/burger-api";

function ForfotPassword() {

  const navigate = useNavigate();

  const { formValues, handleInputChange } = useForm({
    email: "",
  });

  const handleSubmit = async(e) => {
    e.preventDefault();
    try {
      const requestOptions = createReguestOptions("POST", formValues, true);
      await fetchWithRefresh("/password-reset", requestOptions);
      localStorage.setItem("fromForgotPasswordPage", true);
      navigate("/reset-password");
    } catch (error) {
      navigate("/login");
    }
  };

  return (
    <section className={styles.wrapper}>
      <p className={classNames("mb-6", "text text_type_main-medium")}>
        Восстановление пароля
      </p>
      <form onSubmit={handleSubmit} className={styles.form}>
        <Input
          type={"text"}
          placeholder="Укажите e-mail"
          onChange={handleInputChange}
          value={formValues.email}
          name={"email"}
          size={"default"}
          extraClass="mb-6"
        />
        <Button
          htmlType="submit"
          type="primary"
          size="medium"
          extraClass="mb-20"
        >
          Восстановить
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

export default ForfotPassword;
