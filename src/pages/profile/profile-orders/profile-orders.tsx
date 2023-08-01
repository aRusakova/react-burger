import styles from "./profile-orders.module.scss";
import OrdersList from "../../../components/orders/orders-list/orders-list";

function ProfileOrders(): JSX.Element {
  return (
    <section className={styles.wrapper}>
      <div className={styles.ordersBox}>
        <OrdersList />
      </div>
    </section>
  );
}

export default ProfileOrders;
