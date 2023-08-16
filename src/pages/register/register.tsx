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
import { registerUser } from "../../services/user/actions";
import { FormEvent } from "react";


function Register(): JSX.Element {

  const dispatch = useDispatch();

  const { formValues, handleInputChange } = useForm({
    email: "",
    name: "",
    password: "",
  });

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(registerUser(formValues));

  };

  return (
    <section className={styles.wrapper}>
      <p className={classNames("mb-6", "text text_type_main-medium")}>
        Регистрация
      </p>
      <form onSubmit={handleSubmit} className={styles.form}>
        <Input
          type={"text"}
          placeholder={"Имя"}
          onChange={handleInputChange}
          value={formValues.name ?? ''}
          name={"name"}
          size={"default"}
          extraClass="mb-6"
        />
        <Input
          type={"text"}
          placeholder={"E-mail"}
          onChange={handleInputChange}
          value={formValues.email ?? ''}
          name={"email"}
          size={"default"}
          extraClass="mb-6"
        />
        <PasswordInput
          onChange={handleInputChange}
          value={formValues.password ?? ''}
          name={"password"}
          extraClass="mb-6"
        />
        <Button
          htmlType="submit"
          type="primary"
          size="medium"
          extraClass="mb-20"
        >
          Зарегистрироваться
        </Button>
      </form>
      <p className="text text_type_main-default">
        Уже зарегистрированы?&nbsp;
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

export default Register;
