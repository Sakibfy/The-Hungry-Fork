import Swal from "sweetalert2";
import useCart from "../../../hooks/useCart";
import { RiDeleteBinLine } from "react-icons/ri";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const Cart = () => {
  const [cart, refetch] = useCart();
  const price = cart.reduce( (total, item) => total + item.price, 0)
 const totalPrice =  Math.floor(price);
  const axiosSecure = useAxiosSecure();
  const handleDlete = (id) => {
    console.log(id);
    Swal.fire({
  title: "Are you sure?",
  text: "You won't be able to revert this!",
  icon: "warning",
  showCancelButton: true,
  confirmButtonColor: "#3085d6",
  cancelButtonColor: "#d33",
  confirmButtonText: "Yes, delete it!"
}).then((result) => {
  if (result.isConfirmed) {
    

    axiosSecure.delete(`/carts/${id}`)
      .then(res => {
        if (res.data.deletedCount > 0) {
          refetch();
        Swal.fire({
      title: "Deleted!",
      text: "Your file has been deleted.",
      icon: "success"
    });
      }
    })
  }
});
  }
  
 
  
  return (
    <div>
      <div className="md:flex md:justify-evenly">
        <h2 className="text-3xl">Total Order: { cart.length}</h2>
        <h2 className="text-3xl">Total Price:$ {totalPrice}</h2>
        <button className="btn btn-primary">Pay</button>
      </div>
      <div className="overflow-x-auto mt-4">
  <table className="table border rounded-2xl">
    {/* head */}
    <thead className="bg-[#D1A054] text-xl text-black uppercase">
      <tr>
        <th>
          #
        </th>
        <th>Image</th>
        <th>Name</th>
        <th>Price</th>
        <th>Action</th>
      </tr>
    </thead>
    <tbody>
    {
        cart.map((item, index) => <tr key={item._id}>
        <th>
          {index + 1}
        </th>
        <td>
          <div className="flex items-center gap-3">
            <div className="avatar">
              <div className="mask mask-squircle h-12 w-12">
                <img
                  src={item.image}
                  alt="Avatar Tailwind CSS Component" />
              </div>
            </div>
            
              
          </div>
        </td>
        <td>
          {item.name}
        </td>
          <td>${ item.price}</td>
        <th>
          <button onClick={()=> handleDlete(item._id)} className=" bg-[#B91C1C] text-white p-3 rounded-sm"><RiDeleteBinLine /></button>
        </th>
      </tr>)      
    }
      
    </tbody>
   
  </table>
</div>
    </div>
  );
};

export default Cart;