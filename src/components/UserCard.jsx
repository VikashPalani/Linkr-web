import { useDispatch } from "react-redux";
import { BASE_URL } from "../utils/constants";
import axios from "axios";
import { removeUserFromFeed } from "../utils/feedSlice";

const UserCard = (user) => {

    const dispatch = useDispatch();

    //The second parameter {} is the data which we are sending to the server, since this is a post, we dont have any data to send
    const handleSendRequest = async (status,userId) => {
        try{
            const res = await axios.post(
                BASE_URL + "/request/send/"+status+"/"+userId,
                {},{withCredentials: true}
            );
            dispatch(removeUserFromFeed(userId));

        }catch(err){
            console.log(err);
        }
    }

    const{_id, firstName, lastName, photoUrl, age, gender, about, skills} = user?.user;
    return (
    <div>
        <div className="card bg-base-300 w-96 shadow-xl h-[650px] my-8">
            <figure>
                <img
                    src= {photoUrl}
                    alt="User Profile" 
                    className=" mx-6 h-[300px] w-[410px]"
                />
            </figure>
            <div className="card-body w-96 h-56">
                <h2 className="card-title">{firstName+" "+lastName}</h2>
                {age && 
                    <p>{age+", "+ gender}</p>
                }
                <p>{about}</p>
                <div className="card-actions justify-center my-4 mt-2">
                    <button 
                        className="btn btn-primary"
                        onClick={() => handleSendRequest("ignored",_id)}
                    >
                        Ignore
                    </button>
                    <button 
                        className="btn btn-secondary"
                        onClick={() => handleSendRequest("interested",_id)}
                    >
                        Interested
                    </button>
                </div>
            </div>
        </div>
    </div>
    )
}

export default UserCard
