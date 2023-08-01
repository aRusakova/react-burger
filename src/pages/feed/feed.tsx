import styles from "./feed.module.scss";
import classNames from "classnames";
import OrdersList from "../../components/orders/orders-list/orders-list";
import Loader from "../../components/loader/loader";
import { useEffect } from "react";
import { useDispatch, useSelector } from "../../services/store";
import {
  connect,
  disconnect,
} from "../../services/burger-orders-feeds/actions";

function Feed(): JSX.Element {
  const ORDERS_FEED_SERVER_URL = "wss://norma.nomoreparties.space/orders/all";

  const dispatch = useDispatch();

  const ordersFeeds = useSelector((state) => state.ordersFeeds);

  useEffect(() => {
    dispatch(connect(ORDERS_FEED_SERVER_URL));

    return () => {
      dispatch(disconnect());
    };
  }, []);

  return (
    <>
      {ordersFeeds.status ==="CONNECTING" && <Loader />}
      {ordersFeeds.status ==="ONLINE" && (
        <section className={styles.wrapper}>
          <h3 className="text text_type_main-large">Лента заказов</h3>
          <div className={styles.pageContainer}>
            <div className={styles.ordersBox}>
              <OrdersList ordersFeed={ordersFeeds} />
            </div>
            <div className={classNames(styles.ordersInfo, "ml-15")}>
              <div className={classNames(styles.ordersStatus, "mb-15")}>
                <div className={classNames(styles.doneBlock, "mr-9")}>
                  <p
                    className={classNames(
                      styles.doneTitle,
                      "text text_type_main-medium",
                      "mb-6"
                    )}
                  >
                    Готовы:
                  </p>
                  <div className={styles.doneNums}>
                    {ordersFeeds.ordersFeed?.orders
                      .filter((order) => order.status === "done")
                      .slice(0,5)
                      .map((order) => (
                        <p
                          className={classNames(
                            "text text_type_digits-default",
                            "mb-2"
                          )}
                          key={order._id}
                        >
                          {order.number}
                        </p>
                      ))}
                  </div>
                </div>
                <div className={styles.notDoneBlock}>
                  <p
                    className={classNames(
                      styles.notDoneTitle,
                      "text text_type_main-medium",
                      "mb-6"
                    )}
                  >
                    В работе:
                  </p>
                  <div className={styles.notDoneNums}>
                    {ordersFeeds.ordersFeed?.orders
                      .filter((order) => order.status === "created" || order.status === "pending")
                      .splice(0,5)
                      .map((order) => (
                        <p
                          className={classNames(
                            "text text_type_digits-default",
                            "mb-2"
                          )}
                        >
                          {order?.number}
                        </p>
                      ))}
                  </div>
                </div>
              </div>
              <div className="mb-15">
                <p className="text text_type_main-medium">
                  Выполнено за все время:
                </p>
                <p className="text text_type_digits-large">
                  {ordersFeeds.ordersFeed?.total}
                </p>
              </div>
              <div className={styles.ordersTotalToday}>
                <p className="text text_type_main-medium">
                  Выполнено за сегодня:
                </p>
                <p className="text text_type_digits-large">
                  {ordersFeeds.ordersFeed?.totalToday}
                </p>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
}

export default Feed;
