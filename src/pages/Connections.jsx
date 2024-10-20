import { BASE_URL } from "../utils/constants";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { addConnection } from "../utils/connectionSlice";
import { useSelector } from "react-redux";
import UserCard from "../components/UserCard";

const Connections = () => {

    const connections = useSelector(store => store.connection);
    const dispatch = useDispatch();

    const fetchConnections = async () => {
        // fetch connections from the server
        try{
            const res = await axios.get(BASE_URL + "/user/connections", {withCredentials: true});
            dispatch(addConnection(res.data.data));
        }catch(err){
            console.log(err)
        }
    }

    useEffect(() => {
        fetchConnections();
    }, [])

    console.log(connections)

    if(!connections) return;
    if(connections.length === 0) return (
        <div className="flex justify-center my-10">
            <h1 className="font-bold text-2xl">No Connections</h1>
        </div>
    )

    return (
        <div className="mb-5">
            <div className="flex justify-center">
            <h1 className="font-bold text-3xl my-8">Connections</h1>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 justify-items-center">
                {connections.map((connection) => (
                    <div key={connection._id}>
                        <div className="card bg-base-300 w-96 shadow-xl h-[650px]">
                            <figure>
                                <img
                                    src={connection.photoUrl}
                                    alt="User Profile"
                                    className="mx-6 w-full object-cover"
                                    style={{height: "350px"}}
                                    
                                />
                            </figure>
                            <div className="card-body w-96 h-56">
                                <h2 className="card-title">{connection.firstName + " " + connection.lastName}</h2>
                                {connection.age && 
                                    <p>{connection.age + ", " + connection.gender}</p>
                                }
                                <p>{connection.about}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Connections;
