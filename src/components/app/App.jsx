import styles from "./app.module.scss";
import { useEffect } from "react";
import AppHeader from "../app-header/app-header";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import Main from "../../pages/main/main.jsx";
import NotFound404 from "../../pages/not-found-404/not-found-404.jsx";
import Login from "../../pages/login/login.jsx";
import Register from "../../pages/register/register.jsx";
import ForgotPassword from "../../pages/forgot-password/forgot-password.jsx";
import ResetPassword from "../../pages/reset-password/reset-password";
import Profile from "../../pages/profile/profile";
import ProfileOrders from "../../pages/profile/profile-orders/profile-orders";
import ProfileEditing from "../../pages/profile/profile-editing/profile-editing";
import IngredientDetails from "../burger-ingredients/ingridient-details/ingridient-details";
import Modal from "../modal/modal";
import { loadIngredients } from "../../services/burger-ingredients/actions";
import { useDispatch } from "react-redux";
import { checkUserAuth } from "../../services/user/actions";
import { OnlyAuth, OnlyUnAuth } from "../protected-route";

function App() {

  const location = useLocation();
  const navigate = useNavigate();
  const background = location.state && location.state.background;

  const handleModalClose = () => {
    navigate(-1);
  };

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadIngredients());
    dispatch(checkUserAuth());
  }, []);
  

  return (
    <DndProvider backend={HTML5Backend}>
      <AppHeader />
      <Routes location={background || location}>
        <Route path="/" element={<Main />} />
        <Route path="/login" element={<OnlyUnAuth component={<Login />} />} />
        <Route path="/register" element={<OnlyUnAuth component={<Register />} />} />
        <Route path="/forgot-password" element={<OnlyUnAuth component={<ForgotPassword />} />} />
        <Route path="/reset-password" element={<OnlyUnAuth component={<ResetPassword />} />} />

        <Route path="/profile" element={<OnlyAuth component={<Profile />} />}>
          <Route index element={<OnlyAuth component={<ProfileEditing />} />} />
          <Route path="orders" element={<OnlyAuth component={<ProfileOrders />} />} />
        </Route>

        <Route
          path="/ingredients/:ingredientId"
          element={<IngredientDetails />}
        />


        <Route path="*" element={<NotFound404 />} />
      </Routes>

      {background && (
          <Routes>
            <Route
              path="/ingredients/:ingredientId"
              element={
                <Modal closeModal={handleModalClose}>
                  <IngredientDetails />
                </Modal>
              }
            />
          </Routes>
        )}
    </DndProvider>
  );
}

export default App;
