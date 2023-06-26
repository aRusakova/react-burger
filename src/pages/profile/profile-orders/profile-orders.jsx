import styles from "./profile-orders.module.scss";

function ProfileOrders() {
  return (
    <section className={styles.wrapper}>
      <p className="text text_type_main-medium">У вас пока нет заказов</p>
    </section>
  );
}

export default ProfileOrders;