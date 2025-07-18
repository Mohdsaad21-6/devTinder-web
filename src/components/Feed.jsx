import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../utils/feedSlice";
import { useEffect } from "react";
import UserCard from "./userCard";

const Feed = () => {
  const feed = useSelector((store) => store.feed);

  const dispatch = useDispatch();

  const getFeed = async () => {
    try {
      const res = await axios.get(BASE_URL + "/feed", {
        withCredentials: true,
      });
      dispatch(addFeed(res?.data?.data));
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getFeed();
  }, []);

  if (!feed) return;

  if (feed.length <= 0) return <h1 className="flex justify-center align-middle my-48 text-2xl">All Caught!!!</h1>;

  return (
    feed && (
      <div className="flex justify-center my-24">
        <UserCard user={feed[0]} />
      </div>
    )
  );
  // feed && <UserCard user={feed[0]} />;
};

export default Feed;
