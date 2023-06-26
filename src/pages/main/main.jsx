import styles from "./main.module.scss";
import BurgerIngredients from "../../components/burger-ingredients/burger-ingredients";
import BurgerConstructor from "../../components/burger-constructor/burger-constructor";
import Error from "../../components/error/error";
import Loader from "../../components/loader/loader";
import { useSelector } from "react-redux";

function Main() {

  const { ingredients, loading, error } = useSelector(
    (store) => store.ingredients
  );

  return (
    <div className={styles.wrapper}>
      {loading && <Loader />}
      {!loading && !error && ingredients.length && (
        <main className={styles.main}>
          <BurgerIngredients />
          <BurgerConstructor />
        </main>
      )}
      {!loading && error && <Error />}
    </div>
  );
}

export default Main;
