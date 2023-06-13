import styles from "./burger-constructor.module.scss";
import PropTypes from "prop-types";
import { ingridietPropTypes } from "../../utils/data";
import classNames from "classnames";
import {
  ConstructorElement,
  DragIcon,
  Button,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useEffect, useMemo, useState } from "react";
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

// BurgerConstructor.propTypes = {
//   data: PropTypes.arrayOf(ingridietPropTypes).isRequired,
// };

// function BurgerConstructor({ data }) {
function BurgerConstructor() {
  const dispatch = useDispatch();
  const allIngredients = useSelector((store) => store.ingredients.ingredients);

  const onDropHandler = (id) => {
    console.log(id);
    const draggedElement = allIngredients.find((item) => item._id === id);
    console.log(draggedElement);
    dispatch(addConstructIngredient(draggedElement));
  };

  // const [isModalOpen, setIsModalOpen] = useState(false);

  const { bun } = useSelector((store) => store.construct.consruct);
  const { ingredients } = useSelector((store) => store.construct.consruct);
  const { error, loading, order } = useSelector((store) => store.order);

  // const buns = useMemo(
  //   () => data.filter((item) => item.type === "bun"),
  //   [data]
  // );

  // const fillings = useMemo(
  //   () => data.filter((item) => item.type === "sauce" || item.type === "main"),
  //   [data]
  // );

  // const totalCounter = useMemo(
  //   () => fillings.reduce((acc, elem) => acc + elem.price, buns[0].price * 2),
  //   [fillings, buns]
  // );

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

  const [, dropTarget] = useDrop({
    accept: "ingredient",
    drop: (itemId) => {
      console.log(itemId);
      onDropHandler(itemId);
    },
  });

  return (
    <>
      <section className={classNames(styles.wrapper, "pt-25")}>
        <ul className={classNames(styles.constructorList, "mb-10")}>
          <li className={styles.constructorItem}>
            {bun ? (
              <ConstructorElement
                type="top"
                isLocked={true}
                text={`${bun.name} (верх)`}
                price={bun.price}
                thumbnail={bun.image}
              />
            ) : (
              <p>добавьте булку</p>
            )}
          </li>
          <ul
            className={classNames(styles.fillingsList, "custom-scroll")}
            ref={dropTarget}
          >
            {ingredients.length ? (
              ingredients.map((elem) => (
                <li className={styles.fillingsItem} key={elem.key}>
                  <DragIcon type="primary" />
                  <ConstructorElement
                    type="bottom"
                    isLocked={false}
                    text={elem.name}
                    price={elem.price}
                    thumbnail={elem.image}
                    handleClose={() => deleteIngredient(elem.key)}
                  />
                </li>
              ))
            ) : (
              <p>Добавьте ингридиенты</p>
            )}
          </ul>
          <li className={styles.constructorItem}>
            {bun ? (
              <ConstructorElement
                type="bottom"
                isLocked={true}
                text={`${bun.name} (низ)`}
                price={bun.price}
                thumbnail={bun.image}
              />
            ) : (
              <p>добавьте булку</p>
            )}
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
