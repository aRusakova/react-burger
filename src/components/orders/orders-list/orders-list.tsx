import styles from "./orders-list.module.scss";
import classNames from "classnames";
import {
  CurrencyIcon,
  FormattedDate,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useDispatch, useSelector } from "../../../services/store";
import { useEffect, useMemo,  } from "react";
import { Link, useLocation, useMatch } from "react-router-dom";
import { connect, disconnect } from "../../../services/burger-orders-profile/actions";
import Loader from "../../loader/loader";
import { IOrdersFeedStore } from "../../../services/burger-orders-feeds/reducer";

const ORDERS_PROFILE_SERVER_URL = "wss://norma.nomoreparties.space/orders";

function OrdersList({ ordersFeed }: {ordersFeed?: IOrdersFeedStore}): JSX.Element {

  const dispatch = useDispatch();

  const matches = useMatch("/profile/orders");

  const location = useLocation();

  const { ordersProfile, status } = useSelector((state) => state.ordersProfile);
  const { ingredients } = useSelector((store) => store.ingredients);

  useEffect(() => {
    if (matches) {
      dispatch(connect(ORDERS_PROFILE_SERVER_URL));

      return () => {
        dispatch(disconnect());
      };
    }
  }, [matches]);


  const orders = useMemo(() => {
    if (matches) {
      return ordersProfile;
    } else {
      return ordersFeed?.ordersFeed;
    }
  },[ordersProfile, ordersFeed, matches])

  const validateStatus = (status: string) => {
    if (status === "done") {
      return "Выполнен";
    }
    if (status === "pending") {
      return "В работе";
    }
    if (status === "created") {
      return "Принят";
    }
  };

  const findIngredient = (id: string) => {
    const res = ingredients?.find((ingredient) => ingredient._id === id);
    return res;
  };

  const calculateTotalPrice = (ingrs:Array<string>) => {
    const ingredientsArray = ingrs.map((elem) => ingredients?.find((ingredient) => ingredient._id === elem));
    let total = 0;
    if (ingredientsArray) {
      total = ingredientsArray.reduce((acc, elem) => {
        if (elem?.price) {
          return acc + elem.price
        } else {
          return acc + 0
        }
      },0);
    }
    return total;
  };

  return (
    <>
    {matches && !orders && <p className="text text_type_main-medium">У вас пока нет заказов</p>}
    {matches && status === 'CONNECTING' && <Loader />}
    {((matches && status === 'ONLINE') || ordersFeed?.status === 'ONLINE')  && 
    <section className={classNames(styles.orders, "custom-scroll")}>
      {orders?.orders.map((order) => (
        <Link
          to={
            matches
              ? `/profile/orders/${order.number}`
              : `/feed/${order.number}`
          }
          key={order._id}
          state={{ background: location }}
          className={classNames(styles.order, "p-6")}
        >
          <div className={classNames(styles.orderHeader, "mb-6")}>
            <p className="text text_type_digits-default">#{order?.number}</p>
            <FormattedDate
              date={new Date(order?.createdAt)}
              className="text text_type_main-default text_color_inactive"
            />
          </div>
          <p className={classNames("text text_type_main-medium", "mb-2")}>
            {order?.name}
          </p>
          <p className={classNames("text text_type_main-small", "mb-6")}>
            {validateStatus(order?.status)}
          </p>
          <div className={styles.orderFooter}>
            <div className={styles.ingredients}>
              {order?.ingredients?.map((ingredient: string, index: number) =>
                index < 5 ? (
                  <div className={styles.ingredient} key={index}>
                    <img
                      className={styles.ingredientImg}
                      src={findIngredient(ingredient)?.image_mobile}
                      alt=""
                    />
                  </div>
                ) : index === 5 ? (
                  <div
                    className={classNames(
                      styles.ingredient,
                      styles.ingredient_last
                    )}
                    key={index}
                  >
                    <img
                      className={styles.ingredientImg}
                      src={findIngredient(ingredient)?.image_mobile}
                      alt=""
                    />
                    <div
                      className={classNames(
                        styles.overIngredientsNum,
                        "text text_type_main-default"
                      )}
                    >
                      +{order.ingredients?.length - 6}
                    </div>
                  </div>
                ) : (
                  ""
                )
              )}
            </div>
            <div className={styles.priceBlock}>
              <p
                className={classNames(
                  styles.totalCounter,
                  "text text_type_digits-default"
                )}
              >
                {calculateTotalPrice(order.ingredients)}
              </p>
              <CurrencyIcon type="primary" />
            </div>
          </div>
        </Link>
      ))}
    </section>}
    </>
  );
}

export default OrdersList;
