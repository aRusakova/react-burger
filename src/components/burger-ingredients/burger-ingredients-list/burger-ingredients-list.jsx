import BurgerIngredient from "../burger-ingredient/burger-ingredient";
import PropTypes from "prop-types";
import { ingridietPropTypes } from "../../../utils/data";
import styles from "./burger-ingredients-list.module.scss";
import classNames from "classnames";

BurgerIngredientsList.propTypes = {
  title: PropTypes.string.isRequired,
  data: PropTypes.arrayOf(ingridietPropTypes).isRequired,
  type: PropTypes.string.isRequired,
  clickOnIngridient: PropTypes.func.isRequired,
};

function BurgerIngredientsList({data, title, type, clickOnIngridient}) {

  return (
    <section className={styles.ingridientsBlock} id={type}>
      <p
        className={classNames(
          styles.title,
          "text text_type_main-medium",
          "mb-6"
        )}
      >
        {title}
      </p>
      <ul className={classNames(styles.ingridientsList, "ml-4 mb-10 mr-4")}>
        {data.map((item) => (
          <li key={item._id}>
            <BurgerIngredient data={item} clickOnIngridient={clickOnIngridient}/>
          </li>
        ))}
      </ul>
    </section>

  );
}

export default BurgerIngredientsList;
