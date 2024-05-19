import { toast } from "react-toastify";
import { useAddToFavMutation } from "../slices/usersApiSlice";
import { FaRegHeart } from "react-icons/fa6";
import { FormEvent } from "react";

type HeartPorps = {
  id: string;
};

const Heart = ({ id }: HeartPorps) => {
  const [addTofav] = useAddToFavMutation();

  const submitHandler = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await addTofav(id).unwrap();
      console.log("added to favourites");
    } catch (err: any) {
      toast.error(err?.data?.message || err.error);
    }
  };
  return (
    <>
      <FaRegHeart
        onClick={submitHandler}
        size={17}
        color='#75dab4'
        style={{ lineHeight: "50%" }}
      />
    </>
  );
};

export default Heart;
