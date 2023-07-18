import BurgerIngredient from "../burger-ingredient/burger-ingredient";
import styles from "./burger-ingredients-list.module.scss";
import classNames from "classnames";
import { TIngredient } from "../../../utils/types";
import { TCategoty } from "../burger-ingredients";

type TIngredientInStore = {
  data?: TIngredient[],
  title: string,
  type: TCategoty,
}

function BurgerIngredientsList({data, title, type }: TIngredientInStore): JSX.Element {

  return (
    <section className={styles.ingridientsBlock} id={type}>
      <p
        className={classNames(
          styles.title,
          "text text_type_main-medium",
          "mb-6"
        )}
      >
        {title}
      </p>
      <ul className={classNames(styles.ingridientsList, "ml-4 mb-10 mr-4")}>
        {data?.map((item) => (
          <li key={item._id}>
            <BurgerIngredient data={item} />
          </li>
        ))}
      </ul>
    </section>

  );
}

export default BurgerIngredientsList;
