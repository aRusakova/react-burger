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

BurgerConstructor.propTypes = {
  data: PropTypes.arrayOf(ingridietPropTypes).isRequired,
};

function BurgerConstructor(props) {
  const buns = props.data.filter((item) => item.type === "bun");
  const fillings = props.data.filter(
    (item) => item.type === "sauce" || item.type === "main"
  );
  const totalCounter = fillings.reduce(
    (acc, elem) => acc + elem.price,
    buns[0].price * 2
  );

  return (
    <section className={classNames(styles.wrapper, "pt-25")}>
      <ul className={classNames(styles.constructorList, "mb-10")}>
        <li className={styles.constructorItem}>
          <ConstructorElement
            type="top"
            isLocked={true}
            text={`${buns[0].name} (верх)`}
            price={buns[0].price}
            thumbnail={buns[0].image}
          />
        </li>
        <ul className={classNames(styles.fillingsList, "custom-scroll")}>
          {fillings.map((elem) => (
            <li className={styles.fillingsItem} key={elem._id}>
              <DragIcon type="primary" />
              <ConstructorElement
                type="bottom"
                isLocked={false}
                text={elem.name}
                price={elem.price}
                thumbnail={elem.image}
              />
            </li>
          ))}
        </ul>
        <li className={styles.constructorItem}>
          <ConstructorElement
            type="bottom"
            isLocked={true}
            text={`${buns[0].name} (низ)`}
            price={buns[0].price}
            thumbnail={buns[0].image}
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
        <Button htmlType="button" type="primary" size="large">
          Оформить заказ
        </Button>
      </div>
    </section>
  );
}

export default BurgerConstructor;
