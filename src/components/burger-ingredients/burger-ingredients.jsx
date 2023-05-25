import { useState } from "react";
import { ingridietPropTypes } from "../../utils/data";
import PropTypes from "prop-types";
import styles from "./burger-ingredients.module.scss";
import classNames from "classnames";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import BurgerIngredientsList from "./burger-ingredients-list/burger-ingredients-list";

BurgerIngredients.propTypes = {
  data: PropTypes.arrayOf(ingridietPropTypes).isRequired,
};

function BurgerIngredients(props) {
  const [category, setCategory] = useState("Булки");

  const buns = props.data.filter((item) => item.type === "bun");
  const sauces = props.data.filter((item) => item.type === "sauce");
  const mains = props.data.filter((item) => item.type === "main");

  return (
    <section className={classNames(styles.wrapper, "pt-10 mr-10")}>
      <h3
        className={classNames(
          styles.title,
          "mb-5",
          "text text_type_main-large"
        )}
      >
        Соберите бургер
      </h3>
      <nav className={classNames(styles.toggleBlock, "mb-10")}>
        <Tab value="Булки" active={category === "Булки"} onClick={setCategory}>
          Булки
        </Tab>
        <Tab value="Соусы" active={category === "Соусы"} onClick={setCategory}>
          Соусы
        </Tab>
        <Tab
          value="Начинки"
          active={category === "Начинки"}
          onClick={setCategory}
        >
          Начинки
        </Tab>
      </nav>
      <div className={classNames(styles.block, "custom-scroll")}>
        <BurgerIngredientsList title="Булки" data={buns} />
        <BurgerIngredientsList title="Соусы" data={sauces} />
        <BurgerIngredientsList title="Начинки" data={mains} />
      </div>
    </section>
  );
}

export default BurgerIngredients;
