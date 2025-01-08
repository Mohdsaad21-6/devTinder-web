import { useState } from "react";

const ProfileEdit = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [about, setAbout] = useState("");
  const [photoUrl, setPhotoUrl] = useState("");
  const [error, setError] = useState("");
  return (
    <div className="flex justify-center my-10 ">
      <div className="card bg-base-300 w-96 shadow-xl">
        <div className="card-body">
          <h2 className="card-title">Edit Profile</h2>
          <div>
            <label className="form-control w-full max-w-xs my-2">
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
            <label className="form-control w-full max-w-xs my-2">
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
            <label className="form-control w-full max-w-xs my-2">
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
            <label className="form-control w-full max-w-xs my-2">
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
            <label className="form-control w-full max-w-xs my-2">
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
            <label className="form-control w-full max-w-xs my-2">
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

          <div className="card-actions justify-center m-2">
            <button className="btn btn-primary">Save Profile </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileEdit;
