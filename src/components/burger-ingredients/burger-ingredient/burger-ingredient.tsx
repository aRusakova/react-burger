import styles from "./burger-ingredient.module.scss";
import classNames from "classnames";
import {
  CurrencyIcon,
  Counter,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useSelector } from "../../../services/store";
import { useMemo } from "react";
import { useDrag } from "react-dnd";
import { Link, useLocation } from "react-router-dom";
import { IIngredient } from "../../../utils/types";

export interface ICounter {
  [name: string]: number;
};

interface IComponentProps {
  data: IIngredient
}

function BurgerIngredient({ data }: IComponentProps): JSX.Element {

  const BUNS = "bun";

  const location = useLocation();

  const { ingredients, bun } = useSelector((store) => store.construct.consruct);

  const bunCounter = useMemo(() => {
    if (bun) {
      return bun._id === data._id ? 2 : "";
    }
  }, [bun, data._id]);

  const ingredientCounter = useMemo(() => {
    let counter: ICounter = {};
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
        data-testid={data.type === BUNS ? 'bun' : 'ingr'}
        >
        <img src={data.image} alt="" className="mb-1" />
        <div className={classNames(styles.priceBlock, "mb-1")}>
          <p className="text text_type_digits-default">{data.price}</p>
          <CurrencyIcon type="primary" />
        </div>
        <p className={classNames(styles.name, "text text_type_main-default")}>
          {data.name}
        </p>
        <div data-testid="counter">
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
        </div>
        
      </Link>
  );
}

export default BurgerIngredient;
