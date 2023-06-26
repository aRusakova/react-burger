import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import Loader from "./loader/loader";

const Protected = ({ onlyAuth, component }) => {
  const isAuthChecked = useSelector((store) => store.user.isAuthChecked);
  const user = useSelector((store) => store.user.user);
  const location = useLocation();

  if (!isAuthChecked) {
    return <Loader />;
  }

  if (!onlyAuth && user) {
    // Пользователь авторизован, но роут предназначен для неавторизованного пользователя
    const { from } = location.state || { from: { pathname: "/" } };
    return <Navigate to={from} />;
  }

  if (onlyAuth && !user) {
    // Пользователь не авторизован, а роут предназначен только для авторизованных
    return <Navigate to="/login" state={{ from: location }} />;
  }

  // onlyAuth && user Пользователь авторизован и роут для авторизованного пользователя
  return component;
};

export const OnlyAuth = ({ component }) => (
  <Protected onlyAuth={true} component={component} />
);
export const OnlyUnAuth = ({ component }) => (
  <Protected onlyAuth={false} component={component} />
);
