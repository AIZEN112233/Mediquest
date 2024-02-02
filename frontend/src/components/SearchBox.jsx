import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const SearchBox = () => {
  const navigate = useNavigate();
  const { keyword: urlKeyword } = useParams();

  // FIX: uncontrolled input - urlKeyword may be undefined
  const [keyword, setKeyword] = useState(urlKeyword || "");

  const submitHandler = (e) => {
    e.preventDefault();
    if (keyword) {
      navigate(`/search/${keyword.trim()}`);
      setKeyword("");
    } else {
      navigate("/");
    }
  };

  return (
    <form onSubmit={submitHandler} className='flex'>
      <input
        type='text'
        name='q'
        onChange={(e) => setKeyword(e.target.value)}
        value={keyword}
        placeholder='Search...'
        className='rounded-md border-2 bg-transparent px-3 text-white outline-none duration-500 focus-within:border-primary-green'
      />
      <Button
        type='submit'
        variant='outline-light'
        className='mx-2 rounded-lg p-2'
      >
        Search
      </Button>
    </form>
  );
};

export default SearchBox;
