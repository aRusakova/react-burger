import styles from "./burger-ingredient.module.scss";
import PropTypes from "prop-types";
import { ingridietPropTypes } from "../../../utils/data";
import classNames from "classnames";
import { CurrencyIcon, Counter } from "@ya.praktikum/react-developer-burger-ui-components";

BurgerIngredient.propTypes = {
  data: ingridietPropTypes,
  clickOnIngridient: PropTypes.func.isRequired,
};

function BurgerIngredient({data, clickOnIngridient}) {

  return (
    <section className={styles.wrapper} onClick={() => clickOnIngridient(data)}>
      <img src={data.image} alt="" className="mb-1"/>
      <div className={classNames(styles.priceBlock, "mb-1")}>
        <p className="text text_type_digits-default">{data.price}</p>
        <CurrencyIcon type="primary" />
      </div>
      <p className={classNames(styles.name, "text text_type_main-default")}>{data.name}</p>
      <Counter count={data.__v} size="default" extraClass="m-1" />  
    </section>
  );
}

export default BurgerIngredient;
