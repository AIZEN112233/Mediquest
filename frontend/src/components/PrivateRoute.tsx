import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRoute = () => {
  //fix state type
  const { userInfoMediquest } = useSelector((state: any) => state.auth);
  return userInfoMediquest ? <Outlet /> : <Navigate to='/login' replace />;
};
export default PrivateRoute;
