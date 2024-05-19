import React, { useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useLogoutMutation } from "../slices/usersApiSlice";
import { logout } from "../slices/authSlice";
import { IoMenuSharp } from "react-icons/io5";
import { HiArrowLongLeft } from "react-icons/hi2";
import SearchBox from "./SearchBox";

const Header = () => {
  // fix state type
  const { userInfoMediquest } = useSelector((state: any) => state.auth);
  const [isMenuOpen, setIsMenuOpen] = useState(true);

  const navigate = useNavigate();
  const router = useLocation();
  const dispatch = useDispatch();
  const [logoutApi] = useLogoutMutation();
  const logoutHandler = async () => {
    try {
      //fix exacting args
      await logoutApi("");
      dispatch(logout(""));
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <header
      className={`fixed top-0 z-50 w-full text-white ${router.pathname === "/" || "border-b bg-gray-950/60 backdrop-blur-md"}`}
    >
      <nav className='container mx-auto flex items-center justify-between py-3 md:items-end lg:px-36'>
        <div>
          <Link to='/' className='font-playFair text-3xl font-semibold'>
            Medi<span className=' font-playFair text-primary-green'>Q</span>uest
          </Link>
        </div>
        <ul
          className={`absolute inset-0 flex h-screen w-screen flex-col items-center justify-center gap-5 bg-black/55 text-3xl font-semibold backdrop-blur md:relative md:left-0 md:h-fit md:w-fit md:flex-row md:gap-2 md:bg-transparent md:text-base md:backdrop-blur-none ${isMenuOpen && "max-md:translate-x-full"} md:left-0 md:top-0`}
        >
          <li
            onClick={() => setIsMenuOpen(true)}
            className='duration-300 hover:text-primary-green'
          >
            <Link to='/exams'>Exams</Link>
          </li>
          <li
            onClick={() => setIsMenuOpen(true)}
            className='duration-300 hover:text-primary-green'
          >
            <Link to='/courses'>Courses</Link>
          </li>
          <li
            onClick={() => setIsMenuOpen(true)}
            className='duration-300 hover:text-primary-green'
          >
            <Link to='/summaries'>Summaries</Link>
          </li>
          <li
            onClick={() => setIsMenuOpen(true)}
            className='duration-300 hover:text-primary-green md:hidden'
          >
            <Link to='/profile'>Profile</Link>
          </li>
          {userInfoMediquest && userInfoMediquest.isAdmin && (
            <>
              <li
                onClick={() => setIsMenuOpen(true)}
                className='duration-300 hover:text-primary-green'
              >
                <Link to='/admin/documentlist'>Documents</Link>
              </li>
              <li
                onClick={() => setIsMenuOpen(true)}
                className='duration-300 hover:text-primary-green'
              >
                <Link to='admin/userlist'>Users</Link>
              </li>
            </>
          )}
          <li className='md:hidden'>
            <HiArrowLongLeft size={35} onClick={() => setIsMenuOpen(true)} />
          </li>
        </ul>
        <div className='flex gap-3'>
          <div className='md:hidden'>
            <SearchBox />
          </div>
          <IoMenuSharp
            className='md:hidden'
            onClick={() => setIsMenuOpen(false)}
            size={32}
          />
          <div className='flex items-center gap-3 max-md:hidden'>
            <SearchBox />
            {userInfoMediquest ? (
              <div className='flex items-center space-x-2'>
                <div className='group relative'>
                  <button className='cursor-pointer text-white'>
                    {userInfoMediquest.name}
                  </button>
                  <div className='absolute hidden space-y-2 bg-gray-800 p-2 group-hover:block'>
                    <Link to='/profile'>Profile</Link>
                    <button onClick={logoutHandler}>Logout</button>
                  </div>
                </div>
                <Link to='/profile' className='cursor-pointer'>
                  <img
                    src={userInfoMediquest.image}
                    alt='profile'
                    className='h-8 w-8 rounded-full'
                  />
                </Link>
              </div>
            ) : (
              <Link to='/login'>
                <FaUserCircle size={32} />
              </Link>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
