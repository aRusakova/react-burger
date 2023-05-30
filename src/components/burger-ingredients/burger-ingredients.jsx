import { useMemo, useState } from "react";
import { ingridietPropTypes } from "../../utils/data";
import PropTypes from "prop-types";
import styles from "./burger-ingredients.module.scss";
import classNames from "classnames";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import BurgerIngredientsList from "./burger-ingredients-list/burger-ingredients-list";
import Modal from "../modal/modal";
import IngredientDetails from "./ingridient-details/ingridient-details";

BurgerIngredients.propTypes = {
  data: PropTypes.arrayOf(ingridietPropTypes).isRequired,
};

function BurgerIngredients({ data }) {
  const [category, setCategory] = useState("buns");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [ingrInModal, setIngrInModal] = useState(null);

  const buns = useMemo(
    () => data.filter((item) => item.type === "bun"),
    [data]
  );
  const sauces = useMemo(
    () => data.filter((item) => item.type === "sauce"),
    [data]
  );
  const mains = useMemo(
    () => data.filter((item) => item.type === "main"),
    [data]
  );

  const scrollTo = (id) => {
    setCategory(id);
    const element = document.getElementById(id);
    if (element) element.scrollIntoView({ behavior: "smooth" });
  };

  const clickOnIngridient = (ingridient) => {
    setIngrInModal(ingridient);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIngrInModal(null);
    setIsModalOpen(false);
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
        <nav className={classNames(styles.toggleBlock, "mb-10")}>
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
        <div className={classNames(styles.block, "custom-scroll")}>
          <BurgerIngredientsList
            title="Булки"
            data={buns}
            type="buns"
            clickOnIngridient={clickOnIngridient}
          />
          <BurgerIngredientsList
            title="Соусы"
            data={sauces}
            type="sauces"
            clickOnIngridient={clickOnIngridient}
          />
          <BurgerIngredientsList
            title="Начинки"
            data={mains}
            type="mains"
            clickOnIngridient={clickOnIngridient}
          />
        </div>
      </section>
      <Modal isOpen={isModalOpen} closeModal={closeModal}>
        <IngredientDetails {...ingrInModal}/>
      </Modal>
    </>
  );
}

export default BurgerIngredients;
