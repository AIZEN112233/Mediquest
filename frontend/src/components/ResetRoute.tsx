import { Navigate, Outlet } from "react-router-dom";

const ResetRoute = () => {
  const ResetCode = localStorage.getItem("resetPassword");
  return ResetCode ? <Outlet /> : <Navigate to='/login' replace />;
};
export default ResetRoute;
