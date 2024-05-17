import { Navigate, Outlet } from "react-router-dom";

const OtpRoute = () => {
  const otpCode = localStorage.getItem("otpCode");
  return otpCode ? <Outlet /> : <Navigate to='/login' replace />;
};
export default OtpRoute;
