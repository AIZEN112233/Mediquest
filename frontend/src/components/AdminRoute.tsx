import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const AdminRoute = () => {
  // fix state type
  const { userInfoMediquest } = useSelector((state: any) => state.auth);
  return userInfoMediquest && userInfoMediquest.isAdmin ? (
    <Outlet />
  ) : (
    <Navigate to='/login' replace />
  );
};
export default AdminRoute;
