import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";
import { useLocation, useNavigate } from  'react-router-dom'
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useCart from "../../hooks/useCart";


const Foodcard = ({ item }) => {
  const { name, image, price, recipe, _id } = item;
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const axiosSecure = useAxiosSecure();
  const[, refetch] = useCart()
  


  const handleAddToCart = () => {
    if (user && user.email) {
      // send cart item to the database

      const cartItem = {
        menuId:  _id,
        email: user.email,
        name,
        image,
        price
     }
      axiosSecure.post('/carts', cartItem)
        .then(res => {
          console.log(res.data);
          if (res.data.insertedId) {
            Swal.fire({
            position: "top-right",
            icon: "success",
            title: `${name} added to your cart` ,
            showConfirmButton: false,
            timer: 2000
            });
            // refetch the cart
            refetch();
          }
      })

    }
    else {
      Swal.fire({
  title: "You are not logged In",
  text: "Please login to then cart",
  icon: "warning",
  showCancelButton: true,
  confirmButtonColor: "#3085d6",
  cancelButtonColor: "#d33",
  confirmButtonText: "Yes, Login"
}).then((result) => {
  if (result.isConfirmed) {
    // send to the login page
    navigate('/login', { state: {from: location}})
  }
});
    }
  }

  return (
    <div>
      <div className="card bg-base-100 w-96 shadow-xl relative">
  <figure>
    <img className="rounded-xl p-2"
       src={ image} />
        </figure>
    <p className="bg-slate-800 hover:bg-slate-950 duration-300 rounded-md absolute text-white py-1 top-6 right-5 px-3">${ price}</p>
  <div className="card-body items-center">
          <h2 className="card-title text-center">{name}</h2>
          <p>{ recipe}</p>
    <div className=" justify-center">
      <button onClick={handleAddToCart} className="bg-[#e8e8e8] text-[#BB8506] hover:bg-[#111827] rounded-lg px-4 p-3 duration-300  border-b-4 btn btn-outline border-0   mt-4">Add To cart</button>
    </div>
  </div>
</div>
    </div> 
  );
};

export default Foodcard;