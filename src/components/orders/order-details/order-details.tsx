import { useEffect, useMemo } from "react";
import styles from "./order-details.module.scss";
import classNames from "classnames";
import { useParams } from "react-router";
import {
  CurrencyIcon,
  FormattedDate,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useDispatch, useSelector } from "../../../services/store";
import Loader from "../../loader/loader";
import { getOrder } from "../../../services/burger-order-details/actions";
import { ICounter } from "../../burger-ingredients/burger-ingredient/burger-ingredient";
import { IIngredient } from "../../../utils/types";

function OrderDetails(): JSX.Element {

  const dispatch = useDispatch();

  const { orderDetails, loading, error } = useSelector((store) => store.orderDetails);

  const { ingredients } = useSelector((store) => store.ingredients);

  let { orderId } = useParams();

  useEffect(() => {
    if (orderId) {
      dispatch(getOrder(orderId));
    }
  }, [orderId])

  const validateStatus = (status: string ='') => {
    if (status === "done") {
      return "Выполнен";
    }
  };

  const ingredientsSet = useMemo(() => {
    let set = new Set<IIngredient>();
    if (orderDetails?.ingredients) {
      orderDetails.ingredients?.forEach((elem) => {
        const res = ingredients?.find((ingr) => {
          return ingr?._id === elem;
        });
        if(res) set.add(res);
      });
    }
    return Array.from(set);
  }, [ingredients, orderDetails?.ingredients]);

  const ingredientCounter = useMemo(() => {
    let counter:ICounter = {};
    orderDetails?.ingredients?.map((ingredient) => {
      if (!counter[ingredient]) {
        counter[ingredient] = 1;
      } else {
        counter[ingredient]++;
      }
      return counter;
    });
    return counter;
  }, [orderDetails?.ingredients]);

  const totalPrice = useMemo(() => {
    const ingredientsArray = orderDetails?.ingredients.map((elem) => ingredients?.find((ingredient) => ingredient._id === elem));
    let total;
    if (ingredientsArray) {
      total = ingredientsArray.reduce((acc, elem) => {
        if (elem?.price) {
          return acc + elem.price
        } else {
          return acc + 0
        }
      },0);
      return total;
    }
  },[ingredients, orderDetails?.ingredients]);

 

  return (
    <>
    {orderDetails && !loading && !error && 
    (<section className={styles.wrapper}>
      <p
        className={classNames(
          styles.number,
          "text text_type_digits-default",
          "mb-10"
        )}
      >
        #{orderDetails?.number}
      </p>
      <p className={classNames("text text_type_main-medium", "mb-3")}>
        {orderDetails?.name}
      </p>
      <p
        className={classNames(
          styles.status,
          "text text_type_main-default text_color_inactive",
          "mb-15"
        )}
      >
        {validateStatus(orderDetails?.status)}
      </p>
      <p className={classNames("text text_type_main-medium", "mb-6")}>
        Состав:
      </p>
      <div className={classNames(styles.ingredients, "custom-scroll", "mb-10")}>
        {ingredientsSet?.map((elem: IIngredient, index) => (
          <div className={styles.ingredient} key={index}>
          <div className={styles.ingredientImgWrapper}>
            <img
              className={styles.ingredientImg}
              src={elem!.image_mobile}
              alt=""
            />
          </div>
          <p className={classNames(styles.name, "text text_type_main-default")}>{elem?.name}</p>
          <div className={styles.price}>
            {ingredientCounter[elem?._id] > 1 ? 
            <p className="text text_type_digits-default">{ingredientCounter[elem._id]}x{elem?.price}</p>
            : <p className="text text_type_digits-default">{elem?.price}</p>}
            <CurrencyIcon type="primary" />
          </div>
          </div>
        ))}
      </div>
      <div className={styles.footer}>
        {orderDetails && <FormattedDate
          date={new Date(orderDetails?.createdAt)}
          className="text text_type_main-default text_color_inactive"
        />}
        
        <div className={styles.priceBlock}>
          <p
            className={classNames(
              styles.totalCounter,
              "text text_type_digits-default"
            )}
          >
            {totalPrice}
          </p>
          <CurrencyIcon type="primary" />
        </div>
      </div>
    </section>)}
    {loading && !error && <Loader />}
    </>
  );
}

export default OrderDetails;
