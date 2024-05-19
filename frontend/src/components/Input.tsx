type InputProps = {
  handleChange: () => void;
  value: string;
  title: string;
  name: string;
};

const Input = ({ handleChange, value, title, name }: InputProps) => {
  return (
    <label className='sidebar-label-containe flex items-center gap-4 py-2 max-md:mx-2 max-md:block md:mx-4'>
      <input
        onChange={handleChange}
        type='radio'
        className='h-4 w-4 appearance-none rounded-sm border-2 border-primary-green checked:bg-primary-green'
        value={value}
        name={name}
      />
      {title}
    </label>
  );
};

export default Input;

// FIXME: fix issue for pressing the checkmark twice to get activated
