import { useState } from "react";
import UserCard from "./UserCard";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

const EditProfile = ({user}) => {

    const dispatch = useDispatch();

    const [firstName, setFirstName] = useState(user?.firstName);
    const [lastName, setLastName] = useState(user?.lastName);
    const [age, setAge] = useState(user?.age);
    const[about, setAbout] = useState(user?.about);
    const [photoUrl, setPhotoUrl] = useState(user?.photoUrl);
    const [gender, setGender] = useState(user?.gender);
    const [error,setError] = useState("");
    const [toast,setToast] = useState(false);

    const saveProfile = async() => {
        
        //Clear errors
        setError("");
        try{
            //API call to save the user profile
            //withCredentials: true allows us to make authenticated requests
            const res = await axios.patch(BASE_URL + "/profile/edit",{
                firstName, lastName, age, about, photoUrl, gender
            },{withCredentials: true});
            dispatch(addUser(res?.data?.data));
            setToast(true);
            setTimeout(() => {
                setToast(false);
            }, 3000);
        }
        catch(err){
            setError(err?.response?.data || "Something went wrong");
            console.log(err);
        }
    }

    return (
    <>
        <h2 className="card-title justify-center text-3xl mt-6">Edit Profile</h2>
        <div className="flex justify-center gap-6 my-2">
            
            <div className="card bg-base-300 w-96 shadow-xl mt-8 h-[650px]">
                <div className="card-body">
                <div>
                    <label className="form-control w-full max-w-xs">
                    <div className="label">
                        <span className="label-text text-md">First Name</span>
                    </div>
                    <input 
                        type="text" 
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        className="input input-bordered w-full max-w-xs" 
                    />
                    </label>

                    <label className="form-control w-full max-w-xs">
                    <div className="label">
                        <span className="label-text text-md">Last Name</span>
                    </div>
                    <input 
                        type="text" 
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        className="input input-bordered w-full max-w-xs" 
                    />
                    </label>

                    <label className="form-control w-full max-w-xs">
                    <div className="label">
                        <span className="label-text text-md">Profile Photo</span>
                    </div>
                    <input 
                        type="text" 
                        value={photoUrl}
                        onChange={(e) => setPhotoUrl(e.target.value)}
                        className="input input-bordered w-full max-w-xs" 
                    />
                    </label>

                    <label className="form-control w-full max-w-xs">
                    <div className="label">
                        <span className="label-text text-md">Age</span>
                    </div>
                    <input 
                        type="number" 
                        value={age}
                        onChange={(e) => setAge(e.target.value)}
                        className="input input-bordered w-full max-w-xs" 
                    />
                    </label>

                    <label className="form-control w-full max-w-xs">
                    <div className="label">
                        <span className="label-text text-md">Gender</span>
                    </div>
                    <input 
                        type="text" 
                        value={gender}
                        onChange={(e) => setGender(e.target.value)}
                        className="input input-bordered w-full max-w-xs" 
                    />
                    </label>

                    <label className="form-control w-full max-w-xs">
                    <div className="label">
                        <span className="label-text text-md">About</span>
                    </div>
                    <input 
                        type="text" 
                        value={about}
                        onChange={(e) => setAbout(e.target.value)}
                        className="input input-bordered w-full max-w-xs" 
                    />
                    </label>

                </div>

                <p className='text-red-500'>{error}</p>
                <div className="card-actions justify-center">
                    <button 
                        className="btn btn-primary w-full text-md"
                        onClick={saveProfile}
                    >
                    Save Profile
                    </button>
                </div>

                </div>
            </div>

            <UserCard user={{firstName,lastName,photoUrl,age,about,gender}} />
            {toast &&
                <div className="toast toast-top toast-center">
                    <div className="alert alert-success">
                    <span>Profile saved successfully!!!</span>
                    </div>
            </div>
            }
        </div>
    </>
    )
}

export default EditProfile;
