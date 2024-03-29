import styles from "./order-details.module.scss";
import classNames from "classnames";
import Done from '../../../images/done.jpg';
import { useSelector } from "../../../services/store";

function OrderDetails(): JSX.Element {

  const { order } = useSelector((store) => store.order);

  return (
    <section className={classNames(styles.wrapper, "mt-30 mb-30")}>
      <p className={classNames("text text_type_digits-large", "mb-8")}>{order?.order.number}</p>
      <p className={classNames("text text_type_main-large", "mb-15")}>идентификатор заказа</p>
      <img className="mb-15" src={Done} alt="" />
      <p className={classNames("text text_type_main-default", "mb-2")}>Ваш заказ начали готовить</p>
      <p className={"text text_type_main-default text_color_inactive"}>Дождитесь готовности на орбитальной станции</p>
    </section>
  );
}

export default OrderDetails;