import styles from "./burger-constructor.module.scss";
import classNames from "classnames";
import {
  Button,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useMemo } from "react";
import Modal from "../modal/modal";
import OrderDetails from "./order-details/order-details";
import { useDispatch, useSelector } from "react-redux";
import {
  addConstructIngredient,
  deleteAllConstructIngredients,
  deleteConstructIngredient,
} from "../../services/burger-constructor/reducer";
import { addOrder } from "../../services/burger-order/actions";
import Loader from "../loader/loader";
import Error from "../error/error";
import { useDrop } from "react-dnd";
import BurgerConstructorItem from "./burger-constructor-item/burger-constructor-item";

function BurgerConstructor() {
  const dispatch = useDispatch();

  const allIngredients = useSelector((store) => store.ingredients.ingredients);
  const { bun } = useSelector((store) => store.construct.consruct);
  const { ingredients } = useSelector((store) => store.construct.consruct);
  const { error, loading, order } = useSelector((store) => store.order);

  const totalCounter = useMemo(() => {
    let total;
    if (ingredients) {
      total = ingredients.reduce((acc, elem) => acc + elem.price, 0);
      if (bun) {
        total += bun.price * 2;
      }
      return total;
    }
  }, [ingredients, bun]);

  const deleteIngredient = (id) => {
    dispatch(deleteConstructIngredient(id));
  };

  const createOrder = (ingredients, bun) => {
    const orderProductsId = [...ingredients, bun, bun].map((elem) => elem._id);
    console.log(orderProductsId);
    dispatch(addOrder(orderProductsId));
  };

  const closeOrderDetails = () => {
    dispatch(deleteAllConstructIngredients());
  };

  const [{ isHoverBun, isHoverIngr }, dropTarget] = useDrop({
    accept: "ingredient",
    drop: (item) => {
      onDropHandler(item);
    },
    collect: (monitor) => ({
      isHoverBun: monitor.isOver() && monitor.getItem().type === "bun",
      isHoverIngr:
        monitor.isOver() &&
        (monitor.getItem().type === "main" ||
          monitor.getItem().type === "sauce"),
    }),
  });

  const onDropHandler = (item) => {
    const draggedElement = allIngredients.find((elem) => elem._id === item.id);
    dispatch(addConstructIngredient(draggedElement));
  };

  return (
    <>
      <section className={classNames(styles.wrapper, "pt-25")}>
        <ul
          className={classNames(styles.constructorList, "mb-10")}
          ref={dropTarget}
        >
          <li className={styles.constructorItem}>
            <BurgerConstructorItem
              type="bun"
              top={true}
              isHoverBun={isHoverBun}
            />
          </li>
          <ul
            className={classNames(
              styles.fillingsList,
              "custom-scroll",
              isHoverIngr && ingredients.length && styles.hover
            )}
          >
            {ingredients.length ? (
              ingredients.map((elem, index) => (
                <li className={styles.fillingsItem} key={elem.key}>
                  <BurgerConstructorItem
                    type="ingredient"
                    data={elem}
                    index={index}
                    deleteIngredient={deleteIngredient}
                  />
                </li>
              ))
            ) : (
              <li
                className={classNames(
                  styles.fillingsItem,
                  styles.fillingsItem_empty
                )}
              >
                <BurgerConstructorItem
                  type="ingredient"
                  isHoverIngr={isHoverIngr}
                />
              </li>
            )}
          </ul>
          <li className={styles.constructorItem}>
            <BurgerConstructorItem
              type="bun"
              top={false}
              isHoverBun={isHoverBun}
            />
          </li>
        </ul>
        <div className={styles.totalBlock}>
          <div className={classNames(styles.total, "mr-10")}>
            <p
              className={classNames(
                styles.totalCounter,
                "text text_type_digits-medium"
              )}
            >
              {totalCounter}
            </p>
            <CurrencyIcon type="primary" />
          </div>
          {ingredients.length && bun ? (
            <Button
              htmlType="button"
              type="primary"
              size="large"
              onClick={() => createOrder(ingredients, bun)}
            >
              Оформить заказ
            </Button>
          ) : (
            <div></div>
          )}
        </div>
      </section>
      {order && ingredients.length && bun && !loading && !error && (
        <Modal closeModal={closeOrderDetails}>
          <OrderDetails />
        </Modal>
      )}
      {loading && <Loader />}
      {error && <Error />}
    </>
  );
}

export default BurgerConstructor;
