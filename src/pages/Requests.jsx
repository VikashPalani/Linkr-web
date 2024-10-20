import {BASE_URL} from '../utils/constants';
import axios from 'axios';
import {useDispatch, useSelector} from 'react-redux';
import {addRequests, removeRequest} from '../utils/requestSlice';
import { useEffect } from 'react';

const Requests = () => {

  const dispatch = useDispatch();
  const requests = useSelector(state => state.requests);

  console.log(requests)

  const reviewRequest = async(status,_id) => {
    try{
      const res = await axios.post(BASE_URL + "/request/review/"+status+"/"+_id,
        {},{withCredentials: true}
      );
      dispatch(removeRequest(_id));
    }catch(error){
      console.log(error)
    }
  }

  const fetchRequests = async () => {
    try{
      const res = await axios.get(BASE_URL + "/user/requests/received", 
        {withCredentials: true}
      );
      dispatch(addRequests(res.data.data));
    }catch(error){
      console.log(error)
    }
  }

  useEffect(() => { 
    fetchRequests();
  }, []);

  if(!requests) return;
  if(requests.length === 0) return (
      <div className="flex justify-center my-10">
          <h1 className="font-bold text-2xl">No Requests</h1>
      </div>
  )

  return (
    <>
      <div className="flex justify-center">
      <h1 className="font-bold text-3xl my-4">Requests</h1>
      </div>

      <div className="flex justify-center gap-4">
          {requests.map((requests) => (
              <div key={requests._id}>
                  <div className="card bg-base-300 w-96 shadow-xl h-[650px]">
                      <figure>
                          <img
                              src={requests.fromUserId.photoUrl}
                              alt="User Profile"
                              className="mx-6 h-[350px] w-[410px]"
                              
                          />
                      </figure>
                      <div className="card-body w-96 h-56">
                          <h2 className="card-title">{requests.fromUserId.firstName + " " + requests.fromUserId.lastName}</h2>
                          <p>{requests.fromUserId.age + ", " + requests.fromUserId.gender}</p>
                          <p>{requests.fromUserId.about}</p>
                          <div className="card-actions justify-center my-4 mt-2">
                            <button 
                              className="btn btn-primary text-lg" 
                              onClick={()=> reviewRequest("rejected",requests._id)}
                            >
                              Reject
                            </button>
                            <button 
                              className="btn btn-secondary text-lg"
                              onClick={()=> reviewRequest("accepted",requests._id)}
                            >
                              Accept
                            </button>
                        </div>
                      </div>
                  </div>
              </div>
          ))}
      </div>
    </>
  )
}

export default Requests
