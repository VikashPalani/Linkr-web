import EditProfile from "../components/EditProfile";
import { useSelector } from "react-redux";

const Profile = () => {

  const user = useSelector((store) => store.user)
  return (
    user && (
      <div>
        <EditProfile user={user}/>
      </div>
    )
  )
}

export default Profile
