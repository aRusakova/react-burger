import { useMemo, useRef, useState, useEffect } from "react";
// import { ingridietPropTypes } from "../../utils/data";
// import PropTypes from "prop-types";
import styles from "./burger-ingredients.module.scss";
import classNames from "classnames";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import BurgerIngredientsList from "./burger-ingredients-list/burger-ingredients-list";
import Modal from "../modal/modal";
import IngredientDetails from "./ingridient-details/ingridient-details";
import { useSelector, useDispatch } from 'react-redux';
import { deleteIngredient } from "../../services/burger-ingredient/reducer";

// BurgerIngredients.propTypes = {
//   data: PropTypes.arrayOf(ingridietPropTypes).isRequired,
// };

// function BurgerIngredients({ data }) {
function BurgerIngredients() {

  const dispatch = useDispatch();

  const { ingredients } = useSelector((store) => store.ingredients);
  const { ingredient } = useSelector((store) => store.ingredient);

  const tabsRef = useRef();
  const bunsRef = useRef();
  const saucesRef = useRef();
  const mainsRef = useRef();

  // console.log(tabsRef?.current?.getBoundingClientRect());
  // console.log(tabsRef.getBoundingClientRect())

  const currentTab = () => {
    const tubs = tabsRef?.current?.getBoundingClientRect().bottom;

    const buns = bunsRef?.current?.getBoundingClientRect().top;
    const sauces = saucesRef?.current?.getBoundingClientRect().top;
    const mains = mainsRef?.current?.getBoundingClientRect().top;

    console.log(tubs, buns, sauces, mains)

    const a = Math.abs(tubs - buns);
    const b = Math.abs(tubs - sauces);
    const c = Math.abs(tubs - mains);

    const res = Math.min(a, b, c);

    if (res === a ) {
      setCategory("buns")
    }
    if (res === b ) {
      setCategory("sauces")
    }
    if (res === c ) {
      setCategory("mains")
    }
  }

  // useEffect(() => {
  //   document.addEventListener("scroll", currentTab);
  //   return () => {
  //     document.removeEventListener("scroll", currentTab);
  //   };
  // }, [currentTab]);

  const [category, setCategory] = useState("buns");
  // const [isModalOpen, setIsModalOpen] = useState(false);
  // const [ingrInModal, setIngrInModal] = useState(null);

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

  // const clickOnIngridient = (ingridient) => {
  //   setIngrInModal(ingridient);
  //   setIsModalOpen(true);
  // };

  // const closeModal = () => {
  //   setIngrInModal(null);
  //   setIsModalOpen(false);
  // };

  const closeModal = () => {
    dispatch(deleteIngredient());
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
        <div className={classNames(styles.block, "custom-scroll")} onScroll={currentTab}>
          <div ref={bunsRef}>
            <BurgerIngredientsList
            title="Булки"
            data={buns}
            type="buns"
            // clickOnIngridient={clickOnIngridient}
          />
          </div>
          <div ref={saucesRef}>
            <BurgerIngredientsList
            title="Соусы"
            data={sauces}
            type="sauces"
            // clickOnIngridient={clickOnIngridient}
          />
          </div>
          <div ref={mainsRef}>
            <BurgerIngredientsList
            title="Начинки"
            data={mains}
            type="mains"
            // clickOnIngridient={clickOnIngridient}
          />
          </div>
          
        </div>
      </section>
      {ingredient && (
        <Modal closeModal={closeModal}>
          {/* <IngredientDetails {...ingrInModal} /> */}
          <IngredientDetails />
        </Modal>
      )}
    </>
  );
}

export default BurgerIngredients;
