import { useState } from "react";
import UserCard from "./userCard";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

const ProfileEdit = ({ user }) => {
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setlastName] = useState(user.lastName);
  const [photoUrl, setPhotoUrl] = useState(user.photoUrl);
  const [age, setAge] = useState(user.age);
  const [gender, setGender] = useState(user.gender);
  const [about, setAbout] = useState(user.about);
  const [error, setError] = useState();
  const [showToast, setShowToast] = useState(false);
  const dispatch = useDispatch();

  const handleEdit = async () => {
    try {
      const res = await axios.patch(
        BASE_URL + "/profile/edit",
        {
          firstName,
          lastName,
          photoUrl,
          age,
          gender,
          about,
        },
        {
          withCredentials: true,
        }
      );
      dispatch(addUser(res?.data?.data));
      setShowToast(true);

      setTimeout(()=>{
        setShowToast(false)
      },2500)
    } catch (error) {
      setError(error.response.data);
    }
  };

  return (
    <>
      <div className="flex justify-center my-20 ">
        <div className="flex justify-center mx-10 ">
          <div className="card bg-base-300 w-96 shadow-xl h-auto">
            <div className="card-body p-4">
              <div className="flex justify-between">
                <h2 className="card-title">Edit Profile</h2>
                <div className="card-actions justify-center m-2">
                  <button
                    onClick={handleEdit}
                    className="btn btn-outline btn-accent"
                  >
                    Save Profile{" "}
                  </button>
                </div>
              </div>
              <div>
                <label className="form-control w-full max-w-xs my-1">
                  <div className="label">
                    <span className="label-text">First Name</span>
                  </div>
                  <input
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    type="text"
                    className="input input-bordered w-full max-w-xs"
                  />
                </label>
                <label className="form-control w-full max-w-xs my-1">
                  <div className="label">
                    <span className="label-text">Last Name</span>
                  </div>
                  <input
                    value={lastName}
                    onChange={(e) => setlastName(e.target.value)}
                    type="text"
                    className="input input-bordered w-full max-w-xs"
                  />
                </label>
                <label className="form-control w-full max-w-xs my-1">
                  <div className="label">
                    <span className="label-text">Photo</span>
                  </div>
                  <input
                    value={photoUrl}
                    onChange={(e) => setPhotoUrl(e.target.value)}
                    type="text"
                    className="input input-bordered w-full max-w-xs"
                  />
                </label>
                <label className="form-control w-full max-w-xs my-1">
                  <div className="label">
                    <span className="label-text">Age</span>
                  </div>
                  <input
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    type="text"
                    className="input input-bordered w-full max-w-xs"
                  />
                </label>
                <label className="form-control w-full max-w-xs my-1">
                  <div className="label">
                    <span className="label-text">Gender</span>
                  </div>
                  <input
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                    type="text"
                    className="input input-bordered w-full max-w-xs"
                  />
                </label>
                <label className="form-control w-full max-w-xs my-1">
                  <div className="label">
                    <span className="label-text">About</span>
                  </div>
                  <input
                    value={about}
                    onChange={(e) => setAbout(e.target.value)}
                    type="text"
                    className="input input-bordered w-full max-w-xs"
                  />
                </label>
              </div>
              <p className="text-red-500">{error}</p>
            </div>
          </div>
        </div>
        <UserCard
          user={{ firstName, lastName, photoUrl, age, about, gender }}
        />
      </div>
      {showToast&&<div className="toast  toast-center toast-middle">
        <div className="alert alert-success">
          <span>Profile Saved successfully.</span>
        </div>
      </div>}
      
    </>
  );
};

export default ProfileEdit;
