import { Outlet, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';

import Navbar from './Navbar';
import Footer from './Footer';
import { BASE_URL } from '../utils/constants';
import { addUser } from '../utils/userSlice';

const Body = () => {

  const dispatch = useDispatch();
  const navigate =useNavigate();
  const userData = useSelector((state) => state.user);

  //Fetch user data from the server so that it can be stored in the Redux store as soon as the application loads
  // and used throughout the application, so that the user can be authenticated before going to any route
  const fetchUser = async () => {

    if(userData) return;
    //Make an API call to fetch user data only if the user data is not already present in the Redux store
    try{
    const user = await axios.get(BASE_URL + "/profile/view",
      {withCredentials: true});

      //User data will be stored in Redux store
      dispatch(addUser(user.data));
    } 
    catch(err){
      if(err.status === 401){
        navigate("/login")
      }
      console.log(err);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <div>
      <Navbar />
      {/* Any children routes of the Body Route will be rendered using the Outlet component */}
      <Outlet />
      <Footer />
    </div>
  )
}

export default Body
