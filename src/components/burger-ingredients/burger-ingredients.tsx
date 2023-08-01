import { useMemo, useRef, useState } from "react";
import styles from "./burger-ingredients.module.scss";
import classNames from "classnames";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import BurgerIngredientsList from "./burger-ingredients-list/burger-ingredients-list";
import { useSelector } from "../../services/store";

export type TCategoty = "bun" | "sauce" | "main"; 

function BurgerIngredients(): JSX.Element {

  const BUNS = "bun";
  const SAUCES = "sauce";
  const MAINS = "main";

  const [category, setCategory] = useState<TCategoty>(BUNS);
  
  const ingredients = useSelector((store) => store.ingredients.ingredients);

  const tabsRef = useRef<HTMLElement | null>(null);
  const bunsRef = useRef<HTMLDivElement | null >(null);
  const saucesRef = useRef<HTMLDivElement | null>(null);
  const mainsRef = useRef<HTMLDivElement | null>(null);

  const currentTab = () => {
    const tubsPosition = tabsRef?.current?.getBoundingClientRect().bottom;
    const bunsPosition  = bunsRef?.current?.getBoundingClientRect().top;
    const saucesPosition  = saucesRef?.current?.getBoundingClientRect().top;
    const mainsPosition  = mainsRef?.current?.getBoundingClientRect().top;

    if (!tubsPosition || !bunsPosition || !saucesPosition || !mainsPosition) return;
    const bunsToTubs = Math.abs(tubsPosition - bunsPosition);
    const saucesToTabs = Math.abs(tubsPosition - saucesPosition);
    const mainsToTubs = Math.abs(tubsPosition - mainsPosition);

    const minimum = Math.min(bunsToTubs, saucesToTabs, mainsToTubs);

    return minimum === bunsToTubs ? setCategory(BUNS) : minimum === saucesToTabs ? setCategory(SAUCES) : minimum === mainsToTubs ? setCategory(MAINS) : '';

  };

  const buns = useMemo(
    () => ingredients?.filter((item) => item.type === BUNS),
    [ingredients]
  );
  const sauces = useMemo(
    () => ingredients?.filter((item) => item.type === SAUCES),
    [ingredients]
  );
  const mains = useMemo(
    () => ingredients?.filter((item) => item.type === MAINS),
    [ingredients]
  );

  const scrollTo = (id: TCategoty):void => {
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
            active={category === BUNS}
            onClick={() => scrollTo(BUNS)}
          >
            Булки
          </Tab>
          <Tab
            value="Соусы"
            active={category === SAUCES}
            onClick={() => scrollTo(SAUCES)}
          >
            Соусы
          </Tab>
          <div>
            <Tab
              value="Начинки"
              active={category === MAINS}
              onClick={() => scrollTo(MAINS)}
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
              type={BUNS}
            />
          </div>
          <div ref={saucesRef}>
            <BurgerIngredientsList
              title="Соусы"
              data={sauces}
              type={SAUCES}
            />
          </div>
          <div ref={mainsRef}>
            <BurgerIngredientsList
              title="Начинки"
              data={mains}
              type={MAINS}
            />
          </div>
        </div>
      </section>
    </>
  );
}

export default BurgerIngredients;
