import styles from "./burger-constructor-item.module.scss";
import classNames from "classnames";
import {
  ConstructorElement,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useDrag, useDrop } from "react-dnd";
import { useDispatch } from "react-redux";
import { moveConstructIngredients } from "../../../services/burger-constructor/reducer";
import { IIngredient } from "../../../utils/types";
import { IIngredientWithKey } from "../burger-constructor";

interface IBurgerConstructorProps {
  index?: number;
  type?: "ingredient" | "bun";
  data?: IIngredientWithKey;
  deleteIngredient?: (id: number) => void;
  isHoverIngr?: boolean;
  isHoverBun?: boolean;
  top?: boolean;
  bun?: IIngredient;
};

function BurgerConstructorItem({
  data,
  deleteIngredient,
  index,
  type,
  isHoverBun,
  isHoverIngr,
  top,
  bun,
}: IBurgerConstructorProps): JSX.Element {
  const dispatch = useDispatch();

  const [, dragRef] = useDrag({
    type: "ingredientConstr",
    item: { index },
  });

  const [{ isHover }, dropRef] = useDrop({
    accept: "ingredientConstr",
    drop(item: {index: number}) {
      const draggableIndex = item.index;

      if (index === draggableIndex) {
        return;
      }

      if (index != null) {
        dispatch(moveConstructIngredients({ draggableIndex, index }));
      }
    },
    collect(monitor) {
      return {
        isHover: monitor.isOver(),
      };
    },
  });

  return (
    <>
      {type === "bun" && (
        <ConstructorElement
          type={top ? "top" : "bottom"}
          isLocked={true}
          text={
            bun ? `${bun.name} ${top ? "(верх)" : "(низ)"}` : "Выберите булочку"
          }
          price={bun! && (bun?.price ?? 0)}
          thumbnail={bun! && (bun?.image ?? '')}
          extraClass={classNames(
            isHoverBun && styles.hover,
            !bun && styles.empty
          )}
        />
      )}
      {type === "ingredient" && (
        <div className={data && styles.ingredientWrapper} ref={dropRef}>
          <div className={styles.ingredientContainer} ref={dragRef}>
            {data && <DragIcon type="primary" />}
            <ConstructorElement
              isLocked={false}
              text={data ? data.name : "Выберите ингредиенты"}
              price={data! && (data?.price ?? 0)}
              thumbnail={data! && (data?.image ?? '')}
              handleClose={() => deleteIngredient!(data?.key ?? 0)}
              extraClass={classNames(
                !data && styles.empty,
                isHoverIngr && styles.hover,
                isHover && styles.ingridientHover
              )}
            />
          </div>
        </div>
      )}
    </>
  );
}

export default BurgerConstructorItem;
