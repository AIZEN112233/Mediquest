const Input = ({ handleChange, value, title, name, color }) => {
  return (
    <label className='sidebar-label-container flex gap-4'>
      <input
        onChange={handleChange}
        type='radio'
        className='border-2 border-primary-green checked:bg-primary-green'
        value={value}
        name={name}
      />
      {title}
    </label>
  );
};

export default Input;
