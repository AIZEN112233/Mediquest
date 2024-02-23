import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Image } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { BsFillHeartFill, BsHeart } from "react-icons/bs";
import "../screens/exams/ExamsSCreen.css";
import { GoComment } from "react-icons/go";
import {
  useGetUserProfileQuery,
  useAddToFavMutation,
} from "../slices/usersApiSlice";

const ExamCard = ({ document }) => {
  const [likes, setLikes] = useState(document.numLikes);
  const [color, setColor] = useState();

  const [addToFav] = useAddToFavMutation();
  const { _id: documentId } = document;

  const { data: userProfile, refetch } = useGetUserProfileQuery();

  useEffect(() => {
    const found = userProfile?.favourites.find((obj) => {
      return obj._id === document._id;
    });
    setColor(found ? "#fa3e5f" : "#75dab4");
  }, [userProfile?.favourites]);

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const res = await addToFav({
        _id: documentId,
        name: document.name,
        image: document.image,
        rating: document.rating,
        numReviews: document.numReviews,
        numLikes: likes,
      }).unwrap();
      refetch();

      if (color === "#75dab4") setColor("#fa3e5f");
      else if (color === "#fa3e5f") setColor("#75dab4");
      setLikes(res.likes);
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <>
      <div className='card rounded-md border border-white font-sans'>
        <Link to={`/document/${document._id}`} className='product-image'>
          <Image className='product-image' src={document.image} />
        </Link>
        <Link className='py-2.5' to={`/document/${document._id}`}>
          <p
            className='product-title px-1 font-normal'
            style={{ color: "white", marginBottom: "0" }}
          >
            {document.name}
          </p>
        </Link>

        {/* <Rating value={document.rating} /> */}
        {/*text={`${document.numReviews} reviews`} */}
        <div className='flex items-center  px-2'>
          {color === "#75dab4" ? (
            <BsHeart
              onClick={submitHandler}
              size={27}
              className='cursor-pointer text-primary-green'
            />
          ) : (
            <BsFillHeartFill
              onClick={submitHandler}
              size={27}
              className='text-primary-green'
            />
          )}

          <span className='color-primary-green mx-1 cursor-pointer text-primary-green'>
            {document.numReviews}
          </span>
          <GoComment size={29} color='#75dab4' />
          <span
            style={{
              color: `#75dab4`,
              fontSize: "24",
              marginLeft: "0.2rem",
              cursor: "pointer",
            }}
          >
            {likes}
            {/*document.numLikes*/}
          </span>
        </div>
      </div>
    </>
  );
};

export default ExamCard;
