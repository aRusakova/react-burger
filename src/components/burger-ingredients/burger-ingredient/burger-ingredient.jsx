import styles from "./burger-ingredient.module.scss";
import { ingridietPropTypes } from "../../../utils/data";
import classNames from "classnames";
import { CurrencyIcon, Counter } from "@ya.praktikum/react-developer-burger-ui-components";

BurgerIngredient.propTypes = {
  data: ingridietPropTypes,
};

function BurgerIngredient(props) {
  return (
    <section className={styles.wrapper}>
      <img src={props.data.image} alt="" className="mb-1"/>
      <div className={classNames(styles.priceBlock, "mb-1")}>
        <p className="text text_type_digits-default">{props.data.price}</p>
        <CurrencyIcon type="primary" />
      </div>
      <p className={classNames(styles.name, "text text_type_main-default")}>{props.data.name}</p>
      <Counter count={props.data.__v} size="default" extraClass="m-1" />
    </section>
  );
}

export default BurgerIngredient;
