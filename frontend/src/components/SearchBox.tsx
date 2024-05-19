import React, { FormEvent, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { IoIosSearch } from "react-icons/io";

const SearchBox = () => {
  const navigate = useNavigate();
  const { keyword: urlKeyword } = useParams();

  // FIX: uncontrolled input - urlKeyword may be undefined
  const [keyword, setKeyword] = useState(urlKeyword || "");

  const submitHandler = (e: FormEvent) => {
    e.preventDefault();
    if (keyword.trim()) {
      navigate(`/search/${keyword.trim()}`);
      setKeyword("");
    } else {
      navigate("/");
    }
  };

  return (
    <form
      onSubmit={submitHandler}
      className='flex items-center rounded-md border-2 bg-transparent px-2 py-1 text-white outline-none duration-500 focus-within:border-primary-green'
    >
      <input
        type='text'
        name='q'
        onChange={(e) => setKeyword(e.target.value)}
        value={keyword}
        placeholder='Search...'
        className='bg-transparent focus-within:outline-none'
      />
      <IoIosSearch type='submit' className='text-[25px] text-white' />
    </form>
  );
};

export default SearchBox;
