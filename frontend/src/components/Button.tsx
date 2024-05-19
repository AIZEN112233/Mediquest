import { FaArrowRightLong } from "react-icons/fa6";

type StyledButtonProps = {
  text: string;
  type: "submit" | "reset" | "button" | undefined;
  style?: React.CSSProperties | undefined;
};

const StyledButton = ({ text, type, style }: StyledButtonProps) => {
  return (
    <div>
      <button
        className='flex items-center gap-2 rounded-md bg-primary-green px-10 py-3 text-base font-semibold text-black duration-500 hover:scale-110 hover:bg-white hover:text-primary-green'
        type={type}
        style={style}
      >
        {text} <FaArrowRightLong color='black' size={23} />
      </button>
    </div>
  );
};

export default StyledButton;
