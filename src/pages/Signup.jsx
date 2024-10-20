import { useState } from 'react'
import { BASE_URL } from '../utils/constants';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const Signup = () => {

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [emailId, setEmailId] = useState('');
    const [password, setPassword] = useState('');
    const [error,setError] = useState('');
    const navigate = useNavigate();

    const handleSignup = async () => {
        try{
            const res = await axios.post(BASE_URL+"/signup",
                {firstName,lastName,emailId,password},
                {withCredentials:true}
            );
            navigate("/login");
        }
        catch(err){
            setError(err?.response?.data || "Something went wrong");
            console.log(err);
        }
    };

    return (
        <div className="flex justify-center my-24">
          <div className="card bg-base-300 w-96 shadow-xl">
            <div className="card-body">
              <h2 className="card-title justify-center text-2xl">Sign Up</h2>
    
              <div>
                <label className="form-control w-full max-w-xs my-2">
                  <div className="label">
                    <span className="label-text text-lg">First Name</span>
                  </div>
                  <input 
                    type="text" 
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="input input-bordered w-full max-w-xs" 
                  />
                </label>

                <label className="form-control w-full max-w-xs my-2">
                  <div className="label">
                    <span className="label-text text-lg">Last Name</span>
                  </div>
                  <input 
                    type="text" 
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="input input-bordered w-full max-w-xs" 
                  />
                </label>

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
                    onClick={handleSignup}
                >
                  Sign Up
                </button>
              </div>

                <div className='flex justify-center'>
                    <p className='ml-4'>Already in Linkr? </p>
                    <Link to="/login" className='mr-4 underline cursor-pointer font-semibold'>Login</Link>
                </div>
    
            </div>
          </div>
        </div>
      )
}

export default Signup
