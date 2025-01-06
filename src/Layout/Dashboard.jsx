import { NavLink, Outlet } from "react-router-dom";
import { RiShoppingCart2Fill } from "react-icons/ri";
import { IoMdHome } from "react-icons/io";
import { FaCalendarAlt } from "react-icons/fa";
import { MdReviews } from "react-icons/md";
import { TbBrandBooking } from "react-icons/tb";
import { FaShoppingBag } from "react-icons/fa";
import { TiThMenu } from "react-icons/ti";
import { MdContactPhone } from "react-icons/md";
import { FiHome } from "react-icons/fi";
import useCart from "../hooks/useCart";
const Dashboard = () => {
  const [cart] = useCart()
  return (
    <div className="flex ">
      {/* left side start*/}
      <div className=" w-64 min-h-screen bg-orange-400">
        <ul className="menu p-4 text-xl space-y-2 uppercase font-semibold">
          <li>
            <NavLink to='/dashboard/userHome'><IoMdHome></IoMdHome> User Home</NavLink>
          </li>
          <li>
            <NavLink to='/dashboard/reservation'><FaCalendarAlt></FaCalendarAlt> Reservation</NavLink>
          </li>
          <li>
            <NavLink to='/dashboard/cart'><RiShoppingCart2Fill></RiShoppingCart2Fill> My Cart ({ cart.length})</NavLink>
          </li>
          <li>
            <NavLink to='/dashboard/review'><MdReviews /> Add Review</NavLink>
          </li>
          <li>
            <NavLink to='/dashboard/booking'><TbBrandBooking /> My Booking</NavLink>
          </li>
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
