

import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addConnection } from "../utils/connectionSlice";
import { Link } from "react-router-dom";

const Connections = () => {
  const dispatch = useDispatch();
  const connections = useSelector((state) => state.connection);

  const fetchConnections = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/connection", {
        withCredentials: true,
      });
      dispatch(addConnection(res.data.data));
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  if (!connections) return null;

  if (connections.length === 0)
    return <h1 className="flex justify-center align-middle my-48 text-2xl">No Connections!!!</h1>;

  return (
    <div className="text-center my-20 px-4">
      <h1 className="text-bold text-white text-3xl mb-8">Connections</h1>
      {connections.map((connection) => {
        const { firstName, lastName, photoUrl, age, gender, about, _id } = connection;
        return (
          <div
            key={_id}
            className="flex flex-col md:flex-row items-center justify-between m-4 p-4 rounded-lg bg-base-300 w-[90%] md:w-1/2 mx-auto"
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
            <Link to={"/chat/" + _id}  className="mt-2 md:mt-0">
              <button className="btn btn-primary text-xs md:text-sm">Chat</button>
            </Link>
          </div>
        );
      })}
    </div>
  );
};

export default Connections;
