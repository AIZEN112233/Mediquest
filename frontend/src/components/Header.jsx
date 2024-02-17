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
  const { userInfoMediquest } = useSelector((state) => state.auth);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navigate = useNavigate();
  const router = useLocation();
  const dispatch = useDispatch();
  const [logoutApi] = useLogoutMutation();
  const logoutHandler = async () => {
    try {
      await logoutApi();
      dispatch(logout());
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <header
      className={`fixed top-0 z-50 w-full ${router.pathname === "/" ? "" : "border-b bg-gray-950/60 backdrop-blur-md"}`}
    >
      <nav className='container mx-auto flex items-center justify-between py-4 lg:px-36'>
        <div className='flex items-center'>
          <Link
            to='/'
            className='font-playFair text-3xl font-bold text-white max-md:text-lg'
          >
            Medi<span className='font-playFair text-primary-green'>Q</span>uest
          </Link>
        </div>

        <div
          className={`flex items-center space-x-4 text-white max-md:fixed max-md:inset-0 max-md:h-screen max-md:w-screen max-md:flex-col max-md:justify-center max-md:gap-10 max-md:backdrop-blur ${isMenuOpen ? "max-md:translate-x-0" : "max-md:translate-x-full"}`}
        >
          <Link
            to='/exams'
            className={`cursor-pointer underline-offset-2 hover:text-primary-green hover:underline max-md:text-2xl max-md:font-[600] md:relative md:left-0 lg:-left-1/3 ${router.pathname === "/exams" ? "text-primary-green underline" : ""}`}
          >
            Exams
          </Link>
          <Link
            to='/courses'
            className={`cursor-pointer underline-offset-2 hover:text-primary-green hover:underline max-md:text-2xl max-md:font-[600] md:relative md:left-0 lg:-left-1/3 ${router.pathname === "/courses" ? "text-primary-green underline" : ""}`}
          >
            Courses
          </Link>
          <Link
            to='/summaries'
            className={`cursor-pointer underline-offset-2 hover:text-primary-green hover:underline max-md:text-2xl max-md:font-[600] md:relative md:left-0 lg:-left-1/3 ${router.pathname === "/summaries" ? "text-primary-green underline" : ""}`}
          >
            Summaries
          </Link>
          {/* Admin Links */}
          <SearchBox />
          {userInfoMediquest && userInfoMediquest.isAdmin && (
            <div className='group relative'>
              <button className='cursor-pointer text-white'>Dashboard</button>
              <div className='absolute hidden space-y-2 bg-gray-800 p-2 group-hover:block'>
                <Link to='/admin/documentlist'>Documents</Link>
                <Link to='/admin/userlist'>Users</Link>
              </div>
            </div>
          )}
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
                  alt='user image'
                  className='h-8 w-8 rounded-full'
                />
              </Link>
            </div>
          ) : (
            <Link to='/login' className='cursor-pointer text-white'>
              <FaUserCircle className='ml-1' color='white' size={30} />
            </Link>
          )}
          <HiArrowLongLeft
            size={35}
            className='hidden text-white max-md:block'
            onClick={() => setIsMenuOpen(false)}
          />
        </div>
        <IoMenuSharp
          size={32}
          className='hidden text-white hover:text-primary-green max-md:block'
          onClick={() => setIsMenuOpen(true)}
        />
      </nav>
    </header>
  );
};

export default Header;
