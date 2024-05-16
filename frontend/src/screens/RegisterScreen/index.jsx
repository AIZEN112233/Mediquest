import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Spinner, Form, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { Button as StyledButton } from "../../components";
import {
  useRegisterMutation,
  useSendCodeMutation,
} from "../../slices/usersApiSlice";
import { setCredentials } from "../../slices/authSlice";
import "./RegisterScreen.css";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";

const RegisterScreen = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isEyeToggled, setIsEyeToggeled] = useState(false);

  const [showOTPinput, setShowOTPinput] = useState(false);
  const [timerCount, setTimer] = useState(60);
  const [OTPinput, setOTPinput] = useState("");
  const [otpCode, setOTPCode] = useState();

  const [disable, setDisable] = useState(true);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [register, { isLoading }] = useRegisterMutation();
  const [sendCode, { isLoading: LoadingOTP }] = useSendCodeMutation();

  const { userInfoMediquest } = useSelector((state) => state.auth);

  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get("redirect") || "/";

  useEffect(() => {
    if (userInfoMediquest) {
      navigate(redirect);
    }
    let interval = setInterval(() => {
      setTimer((lastTimerCount) => {
        lastTimerCount <= 1 && clearInterval(interval);
        if (lastTimerCount <= 1) setDisable(false);
        if (lastTimerCount <= 0) return lastTimerCount;
        return lastTimerCount - 1;
      });
    }, 1000); //each count lasts for a second
    //cleanup the interval on complete
    return () => clearInterval(interval);
  }, [navigate, redirect, userInfoMediquest, disable]);

  const submitHandler = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
    } else {
      try {
        const res = await register({ name, email, password }).unwrap();
        dispatch(setCredentials({ ...res }));
        navigate(redirect);
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  const sendConfirmationCode = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
    } else if (!password || password.length < 8) {
      toast.error(`Password must be at least 8 characters long`);
    } else {
      if (email && name && password) {
        const otp = Math.floor(Math.random() * 9000 + 1000);
        setOTPCode(otp);
        setTimeout(() => setOTPCode(null), 300000);
        try {
          await sendCode({ recipient_email: email, OTP: otp }).unwrap();
          toast.success("A Confirmation Code is sent to your email");
          setShowOTPinput(true);
        } catch (err) {
          toast.error(err?.data?.message || err.error);
        }
      } else {
        toast.error("you must enter your informations");
      }
    }
  };
  const resendCode = async () => {
    const OTP = Math.floor(Math.random() * 9000 + 1000);
    setOTPCode(OTP);
    if (disable) {
      toast.error("Wait for 1 min to ask for another OTP code");
    } else {
      try {
        await sendCode({ recipient_email: email, OTP: OTP }).unwrap();
        setTimeout(() => setOTPCode(null), 300000);
        setDisable(true);
        setTimer(60);
        toast.success("A new Code has succesfully been sent to your email.");
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };
  const verfiyCode = async (e) => {
    e.preventDefault();

    if (parseInt(OTPinput) === otpCode) {
      try {
        const res = await register({ name, email, password }).unwrap();
        dispatch(setCredentials({ ...res }));
        navigate(redirect);
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    } else {
      toast.error("The code is not incorrect, try again or re-send the code");
    }
  };
  return (
    <div className='register-container'>
      <div className='register-form-container flex h-screen items-center justify-center'>
        <Col md={8}>
          {!showOTPinput ? (
            <div className=' mx-auto flex w-full max-w-[500px] flex-col gap-3 rounded-xl bg-[#1616169f] px-[50px] py-[25px] backdrop-blur-sm max-md:bg-transparent max-md:px-2'>
              <h1 className='white mb-3 mt-4 font-playFair text-5xl'>
                Welcome
              </h1>
              <p className='white '>
                Sign Up to continue to Medi
                <span style={{ color: "#75dab4" }}>Q</span>uest
              </p>
              <form
                className='flex flex-col gap-2'
                onSubmit={sendConfirmationCode}
              >
                <input
                  type='text'
                  value={name}
                  placeholder='User Name'
                  className='w-full rounded-md border-2 bg-[#161616] px-3 py-2 focus-within:border-primary-green focus-within:outline-none'
                  onChange={(e) => setName(e.target.value)}
                />

                <input
                  type='text'
                  value={email}
                  placeholder='Email'
                  className='w-full rounded-md border-2 bg-[#161616] px-3 py-2 focus-within:border-primary-green focus-within:outline-none'
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
                <div className='relative'>
                  <input
                    type={isEyeToggled ? "text" : "password"}
                    value={confirmPassword}
                    placeholder='Confirm Password'
                    className='w-full rounded-md border-2 bg-[#161616] px-3 py-2 focus-within:border-primary-green focus-within:outline-none'
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>

                {LoadingOTP && (
                  <Spinner
                    animation='border'
                    role='status'
                    style={{
                      width: "50px",
                      height: "50px",
                      margin: "auto",
                      display: "block",
                      color: "white",
                    }}
                  ></Spinner>
                )}
                <div>
                  <StyledButton
                    text='REGISTER'
                    type='submit'
                    style={{
                      margin: "auto",
                      display: "block",
                      display: "flex",
                      marginTop: "1rem",
                    }}
                  />
                </div>
              </form>

              <Row className='py-3'>
                <Col className='white'>
                  Already have an account?{" "}
                  <Link
                    to={redirect ? `/login?redirect=${redirect}` : "/login"}
                    style={{ color: "#75dab4" }}
                  >
                    {" "}
                    {/*to={redirect ? `/register?redirect=${redirect}` : '/register'*/}
                    Log In
                  </Link>
                </Col>
              </Row>
            </div>
          ) : (
            <>
              <Col md={8} className='mx-auto mt-5'>
                <div className='mx-auto max-w-[500px] rounded-lg bg-[#161616af] px-[50px] max-md:bg-transparent'>
                  <h3 className='white py-3 font-playFair text-3xl font-bold tracking-wide'>
                    Enter Confirmation Code
                  </h3>
                  <p className='text-base text-white'>
                    Enter the confirmation code we sent to {email}.{" "}
                    <a
                      style={{
                        color: disable ? "gray" : "#38b58b",
                        cursor: disable ? "none" : "pointer",
                        textDecorationLine: disable ? "none" : "underline",
                        fontSize: "medium",
                      }}
                      onClick={() => resendCode()}
                    >
                      {disable
                        ? `Resend Code in ${timerCount}s`
                        : "Resend Code"}
                    </a>
                  </p>
                  {LoadingOTP && (
                    <Spinner
                      animation='border'
                      role='status'
                      style={{
                        width: "50px",
                        height: "50px",
                        margin: "auto",
                        display: "block",
                        color: "white",
                      }}
                    ></Spinner>
                  )}
                  <Form onSubmit={verfiyCode}>
                    <Form.Group
                      className='white my-2 mb-2 mt-3'
                      controlId='otp-input'
                    >
                      <Form.Control
                        className='w-full rounded-md border-2 bg-[#161616] px-3 py-2 focus-within:border-primary-green focus-within:bg-[#161616]'
                        type='name'
                        placeholder='Confirmation Code'
                        value={OTPinput}
                        onChange={(e) => setOTPinput(e.target.value)}
                      ></Form.Control>
                    </Form.Group>
                    <Button
                      style={{ width: "100%", fontWeight: "700" }}
                      className='verify-btn btn-block mb-3 mt-2 shadow-none'
                      type='submit'
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <Spinner
                          animation='border'
                          role='status'
                          style={{
                            width: "20px",
                            height: "20px",
                            margin: "auto",
                            display: "block",
                          }}
                        ></Spinner>
                      ) : (
                        "Next"
                      )}
                    </Button>
                    <a
                      className='block pb-3'
                      style={{
                        color: "#38b58b",
                        cursor: "pointer",
                        fontSize: "large",
                        fontWeight: "600",
                        textDecoration: "none",
                        marginTop: "10px",
                      }}
                      onClick={() => setShowOTPinput(false)}
                    >
                      Go Back
                    </a>
                  </Form>
                </div>
              </Col>
            </>
          )}
        </Col>
      </div>
    </div>
  );
};

export default RegisterScreen;
