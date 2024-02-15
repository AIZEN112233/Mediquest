const Input = ({ handleChange, value, title, name }) => {
  return (
    <label className='sidebar-label-containe flex gap-4 items-center max-md:block max-md:mx-2 py-2 md:mx-4'>
      <input
        onChange={handleChange}
        type='radio'
        className='border-2 w-4 h-4 rounded-sm border-primary-green checked:bg-primary-green appearance-none'
        value={value}
        name={name}
      />
      {title}
    </label>
  );
};

export default Input;

// FIXME: fix issue for pressing the checkmark twice to get activated
