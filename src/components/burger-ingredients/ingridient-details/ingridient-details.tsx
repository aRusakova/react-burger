import styles from "./ingridient-details.module.scss";
import classNames from "classnames";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router";
import { TIngredient } from "../../../utils/types";

function IngredientDetails(): JSX.Element {
  //@ts-ignore
  const { ingredients }: {ingredients: TIngredient[]} = useSelector((store) => store.ingredients);
  let { ingredientId } = useParams();

  const ingredient = useMemo(
    () => ingredients.find((ingredient) => ingredient._id === ingredientId),
    [ingredientId, ingredients]
  );

  return (
    <section className={classNames(styles.wrapper, "mt-10 mr-10 mb-15 ml-10")}>
      <p className={classNames(styles.title, "text text_type_main-large")}>
        Детали ингредиента
      </p>
      <img
        src={ingredient?.image_large}
        alt={ingredient?.name}
        className="mb-4"
      />
      <p className={classNames("text text_type_main-medium", "mb-8")}>
        {ingredient?.name}
      </p>
      <ul className={styles.elementsBlock}>
        <li className={classNames(styles.elementsItem, "mr-5")}>
          <p className="text text_type_main-default text_color_inactive">
            Калории,ккал
          </p>
          <p className="text text_type_digits-default text_color_inactive">
            {ingredient?.calories}
          </p>
        </li>
        <li className={classNames(styles.elementsItem, "mr-5")}>
          <p className="text text_type_main-default text_color_inactive">
            Белки, г
          </p>
          <p className="text text_type_digits-default text_color_inactive">
            {ingredient?.proteins}
          </p>
        </li>
        <li className={classNames(styles.elementsItem, "mr-5")}>
          <p className="text text_type_main-default text_color_inactive">
            Жиры, г
          </p>
          <p className="text text_type_digits-default text_color_inactive">
            {ingredient?.fat}
          </p>
        </li>
        <li className={styles.elementsItem}>
          <p className="text text_type_main-default text_color_inactive">
            Углеводы, г
          </p>
          <p className="text text_type_digits-default text_color_inactive">
            {ingredient?.carbohydrates}
          </p>
        </li>
      </ul>
    </section>
  );
}

export default IngredientDetails;
