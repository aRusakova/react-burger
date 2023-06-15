import { useEffect } from "react";
import styles from "./app.module.scss";
import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import Error from "../error/error";
import Loader from "../loader/loader";
import { loadIngredients } from "../../services/burger-ingredients/actions";
import { useDispatch, useSelector } from "react-redux";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

function App() {
  const dispatch = useDispatch();

  const { ingredients, loading, error } = useSelector(
    (store) => store.ingredients
  );

  useEffect(() => {
    dispatch(loadIngredients());
  }, []);

  return (
    <DndProvider backend={HTML5Backend}>
      <div className={styles.wrapper}>
        <AppHeader />
        {loading && <Loader />}
        {!loading && !error && ingredients.length && (
          <main className={styles.main}>
            <BurgerIngredients />
            <BurgerConstructor />
          </main>
        )}
        {!loading && error && <Error />}
      </div>
    </DndProvider>
  );
}

export default App;
