import { useMemo, useRef, useState } from "react";
import styles from "./burger-ingredients.module.scss";
import classNames from "classnames";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import BurgerIngredientsList from "./burger-ingredients-list/burger-ingredients-list";
import { useSelector } from "react-redux";

function BurgerIngredients() {

  const [category, setCategory] = useState("buns");

  const { ingredients } = useSelector((store) => store.ingredients);

  const tabsRef = useRef();
  const bunsRef = useRef();
  const saucesRef = useRef();
  const mainsRef = useRef();

  const currentTab = () => {
    const tubsPosition = tabsRef?.current?.getBoundingClientRect().bottom;
    const bunsPosition  = bunsRef?.current?.getBoundingClientRect().top;
    const saucesPosition  = saucesRef?.current?.getBoundingClientRect().top;
    const mainsPosition  = mainsRef?.current?.getBoundingClientRect().top;

    const bunsToTubs = Math.abs(tubsPosition - bunsPosition);
    const saucesToTabs = Math.abs(tubsPosition - saucesPosition);
    const mainsToTubs = Math.abs(tubsPosition - mainsPosition);

    const minimum = Math.min(bunsToTubs, saucesToTabs, mainsToTubs);

    return minimum === bunsToTubs ? setCategory("buns") : minimum === saucesToTabs ? setCategory("sauces") : minimum === mainsToTubs ? setCategory("mains") : '';

  };

  const buns = useMemo(
    () => ingredients.filter((item) => item.type === "bun"),
    [ingredients]
  );
  const sauces = useMemo(
    () => ingredients.filter((item) => item.type === "sauce"),
    [ingredients]
  );
  const mains = useMemo(
    () => ingredients.filter((item) => item.type === "main"),
    [ingredients]
  );

  const scrollTo = (id) => {
    setCategory(id);
    const element = document.getElementById(id);
    if (element) element.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
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
        <nav className={classNames(styles.toggleBlock, "mb-10")} ref={tabsRef}>
          <Tab
            value="Булки"
            active={category === "buns"}
            onClick={() => scrollTo("buns")}
          >
            Булки
          </Tab>
          <Tab
            value="Соусы"
            active={category === "sauces"}
            onClick={() => scrollTo("sauces")}
          >
            Соусы
          </Tab>
          <div>
            <Tab
              value="Начинки"
              active={category === "mains"}
              onClick={() => scrollTo("mains")}
            >
              Начинки
            </Tab>
          </div>
        </nav>
        <div
          className={classNames(styles.block, "custom-scroll")}
          onScroll={currentTab}
        >
          <div ref={bunsRef}>
            <BurgerIngredientsList
              title="Булки"
              data={buns}
              type="buns"
            />
          </div>
          <div ref={saucesRef}>
            <BurgerIngredientsList
              title="Соусы"
              data={sauces}
              type="sauces"
            />
          </div>
          <div ref={mainsRef}>
            <BurgerIngredientsList
              title="Начинки"
              data={mains}
              type="mains"
            />
          </div>
        </div>
      </section>
    </>
  );
}

export default BurgerIngredients;
