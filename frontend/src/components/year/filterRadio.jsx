import "./filterRadio.css";
import Input from "../../components/Input";
import { useState } from "react";

function Year({ handleChange }) {
  const [isHidden, setIshidden] = useState(false);
  return (
    <div className='m-auto ml-3'>
      <h1 className='relative -translate-x-10 text-4xl font-semibold'>
        Filter
      </h1>
      <h2
        className='sidebar-title'
        onClick={() => setIshidden((prev) => !prev)}
      >
        Year
      </h2>

      <div
        className={`filter-container duration-500 ${isHidden && "opacity-0"}`}
        style={{ margin: "auto" }}
      >
        <label className='sidebar-label-container'>
          <input
            onChange={handleChange}
            className='mr-10 h-5 w-5 appearance-none rounded-sm border-2 border-primary-green checked:bg-primary-green'
            type='radio'
            value=''
            name='test'
          />
          <span className='text-xl'>All</span>
        </label>
        <Input handleChange={handleChange} value='1' title='1' name='test' />
        <Input handleChange={handleChange} value='2' title='2' name='test' />
        <Input handleChange={handleChange} value='3' title='3' name='test' />
        <Input handleChange={handleChange} value='4' title='4' name='test' />

        <Input handleChange={handleChange} value='5' title='5' name='test' />
        <Input handleChange={handleChange} value='6' title='6' name='test' />
        <Input handleChange={handleChange} value='7' title='7' name='test' />
      </div>
    </div>
  );
}

export default Year;
