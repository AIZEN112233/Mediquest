import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Form, Row, Col } from "react-bootstrap";
import { Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../components/Loader";
import FormContainer from "../../components/FormContainer";
import StyledButton from "../../components/Button";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import {
  useLoginMutation,
  useSendOTPMutation,
} from "../../slices/usersApiSlice";
import { setCredentials } from "../../slices/authSlice";
import { toast } from "react-toastify";
import "./LoginScreen.css";
const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [isEyeToggled, setIsEyeToggeled] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [login, { isLoading }] = useLoginMutation();
  const [sendOTP, { isLoading: loadingOTP }] = useSendOTPMutation();

  const { userInfoMediquest } = useSelector((state) => state.auth);

  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get("redirect") || "/";

  useEffect(() => {
    if (userInfoMediquest) {
      navigate(redirect);
    }
  }, [navigate, redirect, userInfoMediquest]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await login({ email, password }).unwrap();
      dispatch(setCredentials({ ...res }));
      navigate(redirect);
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  const navigateToOTP = async () => {
    if (email) {
      const otp = Math.floor(Math.random() * 9000 + 1000);
      const data = { email: { email }, otp: otp };
      try {
        await sendOTP({ recipient_email: email, OTP: otp }).unwrap();
        localStorage.setItem("otpCode", JSON.stringify(true));
        setTimeout(() => localStorage.removeItem("otpCode"), 600000);
        navigate("/forgotpassword", { state: data });
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    } else {
      toast.error("you must enter your email");
    }
  };

  return (
    <div className='login-bg grid h-screen place-items-center pt-[100px]'>
      <div className='flex flex-col gap-6 rounded-md  bg-[#1616169b] backdrop-blur px-[54px] py-[40px] text-center'>
        <div className='flex flex-col gap-3'>
          <h1 className='font-playFair text-[64px] font-[500]'>Welcome</h1>
          <p className='text-[24px] font-[300]'>
            Login to continue to{" "}
            <span className='font-playFair'>
              Medi<span className='font-playFair text-primary-green'>Q</span>
              uest
            </span>
          </p>
        </div>
        <form className='flex flex-col gap-6' onSubmit={submitHandler}>
          <input
            type='text'
            value={email}
            placeholder='Email'
            className='w-full rounded-md border-2 bg-[#161616] px-3 py-2 focus-within:border-primary-green focus-within:outline-none max-md:px-2'
            onChange={(e) => setEmail(e.target.value)}
          />
          <div className='relative'>
            <input
              type={isEyeToggled ? "text" : "password"}
              value={password}
              placeholder='Password'
              className='w-full rounded-md border-2 bg-[#161616] px-3 py-2 focus-within:border-primary-green focus-within:outline-none'
              onChange={(e) => setPassword(e.target.value)}
            />
            {isEyeToggled ? (
              <IoEyeOffOutline
                onClick={() => setIsEyeToggeled(false)}
                className='absolute right-5 top-1/2 -translate-y-1/2 text-[24px] hover:text-primary-green'
              />
            ) : (
              <IoEyeOutline
                onClick={() => setIsEyeToggeled(true)}
                className='absolute right-5 top-1/2 -translate-y-1/2 text-[24px] hover:text-primary-green'
              />
            )}
          </div>
          <p
            id='forgotPassword'
            className='cursor-pointer text-primary-green underline'
            onClick={() => navigateToOTP()}
          >
            Forgot Password?
          </p>
          <div className='mx-auto'>
            <StyledButton text='START LEARNING' type='submit' />
          </div>
        </form>
        {loadingOTP && <Loader style={{ color: "white !important" }} />}
        {isLoading && (
          <Spinner
            animation='border'
            role='status'
            style={{
              width: "100px",
              height: "100px",
              margin: "auto",
              display: "block",
              color: "white",
            }}
          ></Spinner>
        )}
        <Row className='py-3'>
          <Col className='white'>
            Don't have an account?{" "}
            <Link
              to={redirect ? `/register?redirect=${redirect}` : "/register"}
              style={{ color: "#75dab4" }}
            >
              {" "}
              Register
            </Link>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default LoginScreen;

// font-weight: 300;
