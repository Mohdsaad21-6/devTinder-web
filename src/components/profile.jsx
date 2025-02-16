import { useSelector } from "react-redux";
import EditProfile from "./EditProfile";
// import ProfileEdit from "./EditProfile";
// import ProfileEdit from "./profileEdit";

const Profile = () => {
  const user = useSelector((store) => store.user);
  return (
    user && (
      <div>
        {/* <ProfileEdit user={user} /> */}
        {/* <ProfileEdit user={user}/> */}
        <EditProfile user={user} />
      </div>
    )
  );
};

export default Profile;
