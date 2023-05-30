import styles from "./ingridient-details.module.scss";
import classNames from "classnames";
import { ingridietPropTypes } from "../../../utils/data";

IngredientDetails.propTypes = {
  ingrInModal: ingridietPropTypes,
};

function IngredientDetails(ingrInModal) {
  return (
    <section className={classNames(styles.wrapper, "mt-10 mr-10 mb-15 ml-10")}>
      <p className={classNames(styles.title, "text text_type_main-large")}>
        Детали ингредиента
      </p>
      <img
        src={ingrInModal.image_large}
        alt={ingrInModal.name}
        className="mb-4"
      />
      <p className={classNames("text text_type_main-medium", "mb-8")}>
        {ingrInModal.name}
      </p>
      <ul className={styles.elementsBlock}>
        <li className={classNames(styles.elementsItem, "mr-5")}>
          <p className="text text_type_main-default text_color_inactive">
            Калории,ккал
          </p>
          <p className="text text_type_digits-default text_color_inactive">
            {ingrInModal.calories}
          </p>
        </li>
        <li className={classNames(styles.elementsItem, "mr-5")}>
          <p className="text text_type_main-default text_color_inactive">
            Белки, г
          </p>
          <p className="text text_type_digits-default text_color_inactive">
            {ingrInModal.proteins}
          </p>
        </li>
        <li className={classNames(styles.elementsItem, "mr-5")}>
          <p className="text text_type_main-default text_color_inactive">
            Жиры, г
          </p>
          <p className="text text_type_digits-default text_color_inactive">
            {ingrInModal.fat}
          </p>
        </li>
        <li className={styles.elementsItem}>
          <p className="text text_type_main-default text_color_inactive">
            Углеводы, г
          </p>
          <p className="text text_type_digits-default text_color_inactive">
            {ingrInModal.carbohydrates}
          </p>
        </li>
      </ul>
    </section>
  );
}

export default IngredientDetails;
