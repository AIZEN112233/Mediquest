import React from "react";
import { FaArrowRightLong } from "react-icons/fa6";

const StyledButton = ({ text, type }) => {
  return (
    <div>
      <button
        className='flex items-center gap-2 rounded-md bg-primary-green px-10 py-3 text-base font-semibold text-black'
        type={type}
      >
        {text} <FaArrowRightLong color='black' size={23} />
      </button>
    </div>
  );
};

export default StyledButton;
