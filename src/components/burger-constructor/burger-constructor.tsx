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
import { addOrder, clearOrder } from "../../services/burger-order/actions";
import Loader from "../loader/loader";
import Error from "../error/error";
import { useDrop } from "react-dnd";
import BurgerConstructorItem from "./burger-constructor-item/burger-constructor-item";
import { useNavigate } from "react-router";
import { IIngredient, IOrder, IUser } from "../../utils/types";
import { AnyAction } from "redux";

interface IOrderRequest {
  error: boolean,
  loading: boolean,
  order: IOrder,
};
export interface IIngredientWithKey extends IIngredient {
  key: number
};

function BurgerConstructor(): JSX.Element {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //@ts-ignore
  const allIngredients: IIngredient[] = useSelector((store) => store.ingredients.ingredients);
  //@ts-ignore
  const { bun }: {bun: IIngredient} = useSelector((store) => store.construct.consruct);
  //@ts-ignore
  const { ingredients }: {ingredients: IIngredientWithKey[]} = useSelector((store) => store.construct.consruct);
  //@ts-ignore
  const { error, loading, order }: IOrderRequest = useSelector((store) => store.order);
  //@ts-ignore
  const user: IUser  = useSelector((store) => store.user.user);

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

  const deleteIngredient = (id: number):void => {
    dispatch(deleteConstructIngredient(id));
  };

  const createOrder = (ingredients: IIngredient[], bun: IIngredient): void => {
    const orderProductsId = [...ingredients, bun, bun].map((elem) => elem._id);
    //@ts-ignore
    dispatch(addOrder(orderProductsId) as unknown as AnyAction);
  };

  const closeOrderDetails = () => {
    dispatch(deleteAllConstructIngredients() as unknown as AnyAction);
    dispatch(clearOrder());
  };

  interface IMonitor {
    name: string,
    type: string
  }

  interface IItem {
    id: string
  }

  const [{ isHoverBun, isHoverIngr }, dropTarget] = useDrop({
    accept: "ingredient",
    drop: (item: IItem) => {
      onDropHandler(item);
    },
    
    collect: (monitor) => ({
      isHoverBun: monitor.isOver() && monitor.getItem<IMonitor>().type === "bun",
      isHoverIngr:
        monitor.isOver() &&
        (monitor.getItem<IMonitor>().type === "main" ||
          monitor.getItem<IMonitor>().type === "sauce"),
    }),
  });


  const onDropHandler = (item: IItem) => {
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
              bun={bun}
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
              bun={bun}
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
              onClick={() => user ? createOrder(ingredients, bun) : navigate("/login")}
            >
              Оформить заказ
            </Button>
          ) : (
            <div></div>
          )}
        </div>
      </section>
      {order && !loading && !error && bun && ingredients.length && (
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
