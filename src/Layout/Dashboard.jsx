import { NavLink, Outlet } from "react-router-dom";
import { RiShoppingCart2Fill } from "react-icons/ri";
import { IoMdHome } from "react-icons/io";
import { FaBook, FaCalendarAlt, FaHome, FaList, FaUsers, FaUtensils } from "react-icons/fa";
import { MdReviews } from "react-icons/md";
import { TbBrandBooking } from "react-icons/tb";
import { FaShoppingBag } from "react-icons/fa";
import { TiThMenu } from "react-icons/ti";
import { MdContactPhone } from "react-icons/md";
import { FiHome } from "react-icons/fi";
import useCart from "../hooks/useCart";
import useAdmin from "../hooks/useAdmin";
const Dashboard = () => {
  const [cart] = useCart();
  
  const [isAdmin] = useAdmin();
  return (
    <div className="flex ">
      {/* left side start*/}
      <div className=" w-52 min-h-screen bg-[#D1A054]">
        <ul className="menu p-  space-y-2 uppercase font-semibold">
          {/* share dashboard start */}
          {
            isAdmin ?
              <>
              <li>
            <NavLink to='/dashboard/adminHome'><FaHome/> Admin  Home</NavLink>
          </li>
          <li>
            <NavLink to='/dashboard/addItems'><FaUtensils /> add items</NavLink>
          </li>
          <li>
            <NavLink to='/dashboard/manageItems'><FaList />Manage Items </NavLink>
          </li>
          <li>
            <NavLink to='/dashboard/Booking'><FaBook /> Manage Booking</NavLink>
          </li>
          <li>
            <NavLink to='/dashboard/users'><FaUsers /> All user</NavLink>
          </li>
             </>
              :
              <>
                <li>
            <NavLink to='/dashboard/UserHome'><IoMdHome></IoMdHome> User Home</NavLink>
          </li>
          <li>
            <NavLink to='/dashboard/history'><FaCalendarAlt></FaCalendarAlt> Not History</NavLink>
          </li>
          <li>
            <NavLink to='/dashboard/cart'><RiShoppingCart2Fill></RiShoppingCart2Fill> My Cart ({ cart.length})</NavLink>
          </li>
          <li>
            <NavLink to='/dashboard/review'><MdReviews /> Add Review</NavLink>
          </li>
          <li>
            <NavLink to='/dashboard/paymenthistory'><TbBrandBooking />Real Payment Histroy</NavLink>
          </li>
              </>
          }
          
          {/* share dashboard end */}
          <div className="divider"></div>
          <li>
            <NavLink to='/'><FiHome />  Home</NavLink>
          </li>
          <li>
            <NavLink to='/order/salad'><TiThMenu />  Menu</NavLink>
          </li>
          <li>
            <NavLink to='/order/salad'><FaShoppingBag />  Shop</NavLink>
          </li>
          <li>
            <NavLink to='/'><MdContactPhone /> Contact</NavLink>
          </li>
        </ul>
      </div>
      {/* left side end*/}
      {/* Right side Start*/}
      <div className="flex-1 p-12  bg-slate-200">
        <Outlet></Outlet>
      </div>
      {/* Right side End*/}

    </div>
  );
};

export default Dashboard;
