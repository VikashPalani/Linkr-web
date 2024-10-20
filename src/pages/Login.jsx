import { useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';
import { Link, useNavigate } from 'react-router-dom';
import { BASE_URL } from '../utils/constants';

const Login = () => {

  const [emailId, setEmailId] = useState('@gmail.com');
  const [password, setPassword] = useState('@123');
  const [error,setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try{
      const res = await axios.post(BASE_URL + "/login",
        {emailId,password},
        {withCredentials: true}
      );
        //User data will be stored in Redux store
        dispatch(addUser(res.data));
        navigate('/');
    }
    catch(err){
      setError(err?.response?.data || "Something went wrong");
      console.log(err);
    }
  };

  return (
    <div className="flex justify-center my-36">
      <div className="card bg-base-300 w-96 shadow-xl">
        <div className="card-body">
          <h2 className="card-title justify-center text-2xl">Login</h2>

          <div>
            <label className="form-control w-full max-w-xs my-2">
              <div className="label">
                <span className="label-text text-lg">Email ID</span>
              </div>
              <input 
                type="text" 
                value={emailId}
                onChange={(e) => setEmailId(e.target.value)}
                className="input input-bordered w-full max-w-xs" 
              />
            </label>

            <label className="form-control w-full max-w-xs my-2">
              <div className="label">
                <span className="label-text text-lg">Password</span>
              </div>
              <input 
                type="password" 
                value = {password}
                onChange = {(e) => setPassword(e.target.value)}
                className="input input-bordered w-full max-w-xs" 
              />
            </label>
          </div>

          <p className='text-red-500'>{error}</p>
          <div className="card-actions justify-center m-2">
            <button 
                className="btn btn-primary w-full text-lg"
                onClick={handleLogin}
            >
              Login
            </button>
          </div>
          <div className='flex justify-center'>
            <p className='ml-4'>New to Linkr? </p>
            <Link to="/signup" className='mr-4 underline cursor-pointer font-semibold'>Signup</Link>
          </div>

        </div>
      </div>
    </div>
  )
}

export default Login;
