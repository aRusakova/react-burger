import styles from "./burger-ingredient.module.scss";
import { ingridietPropTypes } from "../../../utils/data";
import classNames from "classnames";
import {
  CurrencyIcon,
  Counter,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useSelector } from "react-redux";
import { useMemo } from "react";
import { useDrag } from "react-dnd";
import { Link, useLocation } from "react-router-dom";

BurgerIngredient.propTypes = {
  data: ingridietPropTypes,
};

function BurgerIngredient({ data }) {

  const BUNS = "bun";

  const location = useLocation();

  const { ingredients, bun } = useSelector((store) => store.construct.consruct);

  const bunCounter = useMemo(() => {
    if (bun) {
      return bun._id === data._id ? 2 : "";
    }
  }, [bun, data._id]);

  const ingredientCounter = useMemo(() => {
    let counter = {};
    ingredients.map((ingredient) => {
      if (!counter[ingredient._id]) {
        counter[ingredient._id] = 1;
      } else {
        counter[ingredient._id]++;
      }
      return counter;
    });
    return counter[data._id];
  }, [ingredients, data._id]);

  const [, dragRef] = useDrag({
    type: "ingredient",
    item: { id: data._id, type: data.type },
  });

  return (
      <Link
        className={styles.wrapper}
        ref={dragRef}
        to={`/ingredients/${data._id}`}
        state={{background: location }}
        >
        <img src={data.image} alt="" className="mb-1" />
        <div className={classNames(styles.priceBlock, "mb-1")}>
          <p className="text text_type_digits-default">{data.price}</p>
          <CurrencyIcon type="primary" />
        </div>
        <p className={classNames(styles.name, "text text_type_main-default")}>
          {data.name}
        </p>
        {data.type === BUNS
          ? bunCounter && (
              <Counter count={bunCounter} size="default" extraClass="m-1" />
            )
          : ingredientCounter && (
              <Counter
                count={ingredientCounter}
                size="default"
                extraClass="m-1"
              />
            )}
      </Link>
  );
}

export default BurgerIngredient;
