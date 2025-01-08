import { useSelector } from "react-redux";
import ProfileEditrofileEdit from "./profileEdit";

const Profile = () => {
  const user = useSelector((store) => structuredClone.user);
  return (
    <div>
      Profile Section
      <ProfileEditrofileEdit />
    </div>
  );
};

export default Profile;
