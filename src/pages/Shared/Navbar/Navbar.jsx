import { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../../../provider/AuthProvider";
import { BsCart4 } from "react-icons/bs";
import useCart from "../../../hooks/useCart";


const Navbar = () => {
  const { user, logOut } = useContext(AuthContext)
  const [cart] = useCart()
  console.log(cart);
    const handleLogOut = () => {
        logOut()
         .then(() => { })
        .catch(error => console.log(error));
        
    }
  const navOptions = <>
       <NavLink to={'/'}><li>HOME</li></NavLink>
       <NavLink to={'/fd'}><li>CONTACT US</li></NavLink>
       <NavLink to={'dfd/'}>DASHBOARD</NavLink>
       <NavLink to={'/menu'}>OUR MENU</NavLink>
       <NavLink to={'/order/salad'}> <li>Order Food</li></NavLink>
    <NavLink to={'/secret'}> <li>Secret</li></NavLink>
    
      <Link to={'/dashboard/cart'}>
      <button className="btn btn-ghost">
     <BsCart4 className="text-2xl  rounded-full "></BsCart4>
        <div className="badge badge-secondary">+{ cart.length}</div>
          </button>
      </Link>
    
    </>
  return (
     <>
     <div className="navbar backdrop-blur-lg fixed z-10 bg-opacity-30 max-w-screen-xl bg-black items-center text-center justify-between text-white">
    <div className="items-center ">
         <div className="dropdown">
              <label tabIndex={0} className="btn btn-ghost lg:hidden ">
                 <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
             </label>
             <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-slate-600 rounded-box w-52 ml-3 space-y-3">
                   {navOptions}
                        </ul>
                    </div>
                    <Link to={'/'}><p className="btn  btn-ghost text-xl">The Hungry Fork</p></Link>
                </div>
                <div className="navbar-center hidden  lg:flex ">
                    <ul className="menu menu-horizontal  text-center gap-4 ">
                        {navOptions}
                    </ul>
                </div>
              <div className="md:ml-10">
        <div className="dropdown dropdown-end text-center flex items-center">
            {
           user && <span className="mr-1 md:ml-6 font-bold text-blue-500 uppercase">{user?.displayName}</span>
        } 
         <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar border2 border-yellow-400">
                      
            <div className="w-10 rounded-full">
           {
            user && <span className="">{
             <img
            alt="photo"
            src={user?.photoURL} />}</span>
        }
          
        </div>
      </div>
      <ul
        tabIndex={0}
        className="menu menu-sm dropdown-content bg-slate-600 rounded-box z-[1] md:mt-32 mt-28 w-52 p-2 shadow">
               {
            user ? <>
                
                <button onClick={handleLogOut} className="btn btn-ghost text-red-500 border border-red-100">LogOut</button>
            </> : <>
                <li className="list-none bg-yellow-400 p-1 rounded-2xl"><Link to="/login">Login</Link></li>
            </>
        }
      </ul>
    </div>
            
              </div>
            </div>
        </>
  );
};

export default Navbar;