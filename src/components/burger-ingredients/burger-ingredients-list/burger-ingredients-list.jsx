import BurgerIngredient from "../burger-ingredient/burger-ingredient";
import PropTypes from "prop-types";
import { ingridietPropTypes } from "../../../utils/data";
import styles from "./burger-ingredients-list.module.scss";
import classNames from "classnames";

BurgerIngredientsList.propTypes = {
  title: PropTypes.string.isRequired,
  data: PropTypes.arrayOf(ingridietPropTypes).isRequired,
};

function BurgerIngredientsList(props) {
  return (
    <section className={styles.ingridientsBlock}>
      <p
        className={classNames(
          styles.title,
          "text text_type_main-medium",
          "mb-6"
        )}
      >
        {props.title}
      </p>
      <ul className={classNames(styles.ingridientsList, "ml-4 mb-10 mr-4")}>
        {props.data.map((item) => (
          <li key={item._id}>
            <BurgerIngredient data={item} />
          </li>
        ))}
      </ul>
    </section>
  );
}

export default BurgerIngredientsList;
