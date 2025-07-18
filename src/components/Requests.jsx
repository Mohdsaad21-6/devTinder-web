import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "../utils/constants";
import { addRequest, removeRequest } from "../utils/requestSlice";
import { useEffect } from "react";

const Requests = () => {
  const request = useSelector((state) => state.request);
  const dispatch = useDispatch();

  const reviewRequest = async (status, _id) => {
    try {
      await axios.post(
        BASE_URL + "/request/review/" + status + "/" + _id,
        {},
        { withCredentials: true }
      );
      dispatch(removeRequest(_id));
    } catch (error) {
      console.log(error.message);
    }
  };

  const fetchRequest = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/request/recieved", {
        withCredentials: true,
      });
      dispatch(addRequest(res.data.data));
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    fetchRequest();
  }, []);

  if (!request) return null;

  if (request.length === 0)
    return <h1 className="my-20 flex justify-center">No Connections!!!</h1>;

  return (
    <div className="text-center my-20 px-4">
      <h1 className="text-bold text-white text-3xl mb-8">Connections Requests</h1>
      {request.map((request) => {
        const { firstName, lastName, photoUrl, age, gender, about, _id } =
          request.fromUserId;
        return (
          <div
            key={_id}
            className="flex flex-col md:flex-row justify-between items-center m-4 p-4 rounded-lg bg-base-300 w-[90%] md:w-2/3 mx-auto"
          >
            <div>
              <img
                alt="photo"
                className="w-16 h-16 md:w-20 md:h-20 rounded-full"
                src={photoUrl}
              />
            </div>
            <div className="text-center md:text-left mx-4 my-2 md:my-0">
              <h2 className="font-bold text-lg md:text-xl">
                {firstName + " " + lastName}
              </h2>
              {age && gender && (
                <p className="text-sm md:text-base">{age + ", " + gender}</p>
              )}
              <p className="text-sm md:text-base">{about}</p>
            </div>
            <div className="flex gap-2 mt-2 md:mt-0">
              <button
                onClick={() => reviewRequest("rejected", request._id)}
                className="btn btn-primary text-xs md:text-sm"
              >
                Reject
              </button>
              <button
                onClick={() => reviewRequest("accepted", request._id)}
                className="btn btn-secondary text-xs md:text-sm"
              >
                Accept
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Requests;
