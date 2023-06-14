import styles from "./burger-constructor-item.module.scss";
import PropTypes from "prop-types";
import { ingridietPropTypes } from "../../../utils/data";
import classNames from "classnames";
import {
  ConstructorElement,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useDrag, useDrop } from "react-dnd";
import { useDispatch, useSelector } from "react-redux";
import { moveConstructIngredients } from "../../../services/burger-constructor/reducer";

BurgerConstructorItem.propTypes = {
  data: ingridietPropTypes,
  deleteIngredient: PropTypes.func,
  index: PropTypes.number,
  type: PropTypes.string,
  isHoverBun: PropTypes.bool,
  isHoverIngr: PropTypes.bool,
  top: PropTypes.bool,
};

function BurgerConstructorItem({ data, deleteIngredient, index, type, isHoverBun, isHoverIngr, top }) {

    const dispatch = useDispatch();

    const { bun } = useSelector ((store) => store.construct.consruct);

    const [, dragRef] = useDrag({
      type: "ingredientConstr",
      item: { index },
    });

    const [{ isHover }, dropRef] = useDrop({
      accept: "ingredientConstr",
      drop(item) {
        const draggableIndex  = item.index;

        if (index === draggableIndex) {
          return;
        }

        if (index != null) {
          console.log(draggableIndex, index);
          // item.index = index;
          dispatch(moveConstructIngredients({draggableIndex, index}));
          
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
          text={bun ? `${bun.name} ${top ? "(верх)" : "(низ)"}` : "Выберите булочку"}
          price={bun && bun.price}
          thumbnail={bun && bun.image}
          extraClass={classNames(isHoverBun && styles.hover, !bun && styles.empty)}
        />
      )}

       {type === "ingredient" && (
        <div className={data && styles.ingredientWrapper} ref={dropRef}>
            <div className={styles.ingredientContainer} ref={dragRef}>
                {data && <DragIcon type="primary" />}
            <ConstructorElement
                isLocked={false}
                text={data ? data.name : "Выберите ингредиенты"}
                price={data && data.price}
                thumbnail={data && data.image}
                handleClose={() => deleteIngredient(data.key)}
                extraClass={classNames(!data && styles.empty, isHoverIngr && styles.hover, isHover && styles.ingridientHover)}
            />
            </div>
        </div>)}
    </>
  );
}

export default BurgerConstructorItem;
