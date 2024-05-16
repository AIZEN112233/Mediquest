import { Link } from "react-router-dom";
import { FaArrowRightLong } from "react-icons/fa6";
import "./HomeScreen.css";

const HomeScreen = () => {
  return (
    <div className='home-container grid h-screen place-items-center text-center'>
      <div className='flex flex-col items-center gap-20 max-md:gap-16'>
        <h1 className='font-playFair text-[85px] font-[600] max-md:text-[40px]'>
          Improve your skills with
          <br /> Medi
          <span className='font-playFair text-primary-green'>Q</span>uest
        </h1>
        <p className='max-w-[680px]'>
          we are small team that aims to end your problems in searching for what
          concerns you by providing a large amount of tools that will make you
          advance in your future studies
        </p>
        <Link to='/exams'>
          <button className='flex items-center gap-3 rounded-md bg-primary-green px-12 py-3 text-[1rem] font-semibold text-black duration-500 hover:scale-110 hover:bg-white hover:text-primary-green max-md:px-10 max-md:py-2 max-md:text-[15px]'>
            START LEARNING
            <FaArrowRightLong
              color='black'
              className='text-[27px] max-md:text-[20px]'
            />
          </button>
        </Link>
      </div>
    </div>
  );
};

export default HomeScreen;
