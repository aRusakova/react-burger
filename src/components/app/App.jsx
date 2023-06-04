import React, { useState, useEffect } from "react";
import "./App.scss";
import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import Error from "../error/error";
import Loader from "../loader/loader";
import { getIngredients } from "../../utils/burger-api";


function App() {

  const [state, setState] = useState({
    data: [],
    isLoading: false,
    isError: false,
  });

  useEffect(() => {
    const getData = async () => {
      setState({ ...state, isLoading: true });
      try {
        const result = await getIngredients();
        setState({
          ...state,
          data: result,
          isLoading: false,
          isError: false,
        });
      } catch (err) {
        setState({ ...state, isLoading: false, isError: true });
      }
    };
    getData();
  }, []);

  return (
    <div className="wrapper">
      <AppHeader />
      {state.isLoading && !state.isError && <Loader />}
      {state.data.length && !state.isError && (
        <main className="main">
          <BurgerIngredients data={state.data} />
          <BurgerConstructor data={state.data} />
        </main>
      )}
      {state.isError && <Error />}
    </div>
  );
}

export default App;
