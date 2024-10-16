import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';

const Body = () => {
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
