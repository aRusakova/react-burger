import styles from "./profile-editing.module.scss";
import classNames from "classnames";
import {
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useDispatch, useSelector } from "react-redux";
import useForm from "../../../hooks/useForm";
import { getEditedUser } from "../../../services/user/actions";

function ProfileEditing() {
  const dispatch = useDispatch();

  const user = useSelector((store) => store.user.user);

  const { formValues, handleInputChange, resetForm, hidePassword } = useForm({
    email: user.email,
    password: "",
    name: user.name,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(getEditedUser(formValues));
    hidePassword();
  };

  return (
    <form
      onSubmit={handleSubmit}
      onReset={resetForm}
      className={styles.wrapper}
    >
      <div className={styles.forms}>
        <Input
          type={"text"}
          placeholder={"Имя"}
          onChange={handleInputChange}
          icon={"EditIcon"}
          value={formValues.name}
          name={"name"}
          extraClass="ml-1"
        />
        <Input
          type={"text"}
          placeholder={"Логин"}
          onChange={handleInputChange}
          icon={"EditIcon"}
          value={formValues.email}
          name={"email"}
          size={"default"}
          extraClass="ml-1"
        />
        <Input
          type={"text"}
          placeholder={"Пароль"}
          onChange={handleInputChange}
          icon={"EditIcon"}
          value={formValues.password}
          name={"password"}
          // onIconClick={onIconClick}
          size={"default"}
          extraClass="ml-1"
        />
      </div>
      <div className={styles.footer}>
        <p className={classNames(styles.text, "text text_type_main-default")}>
          В этом разделе вы можете изменить свои персональные данные
        </p>
        {(user.name !== formValues.name ||
          user.email !== formValues.email ||
          formValues.password.length !== 0) && (
          <div className={styles.buttons}>
            <Button htmlType="reset" type="secondary" size="medium">
              Отмена
            </Button>
            <Button htmlType="submit" type="primary" size="medium">
              Сохранить
            </Button>
          </div>
        )}
      </div>
    </form>
  );
}

export default ProfileEditing;
