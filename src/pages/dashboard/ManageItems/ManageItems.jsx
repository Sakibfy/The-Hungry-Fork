import { RiDeleteBinLine } from "react-icons/ri";
import SectionTitle from "../../../component/SectionTitle/SectionTitle";
import useMenu from "../../../hooks/useMenu";
import { FaEdit } from "react-icons/fa";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { Link } from "react-router-dom";



const ManageItems = () => {
  const [menu, , refetch] = useMenu();
    const axiosSecure = useAxiosSecure();

    const handleDeleteItem = (item) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                const res = await axiosSecure.delete(`/menu/${item._id}`);
                console.log(res.data);
                if (res.data.deletedCount > 0) {
                    // refetch to update the ui
                    refetch();
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: `${item.name} has been deleted`,
                        showConfirmButton: false,
                        timer: 1500
                    });
                }


            }
        });
    }

  return (
    <div className="-mt-12">
      <SectionTitle subHeading="hurry up" heading="Manage All Items "></SectionTitle>
      <div>
        <div className="overflow-x-auto">
  <table className="table w-full">
    {/* head */}
    <thead>
      <tr>
        <th>
         #
        </th>
        <th>Image</th>
        <th>Item</th>
        <th>Price</th>
        <th>Updata</th>
        <th>Delete</th>
      </tr>
    </thead>
    <tbody>
      {menu.map((item , index) => <tr key={item._id}>
        <th>
          {index +1}
        </th>
        <td>
          <div className="flex items-center gap-3">
            <div className="avatar">
              <div className="mask mask-squircle h-12 w-12">
                <img
                  src={item.image} />
              </div>
            </div>
           
          </div>
        </td>
        
        <td>{ item.name}</td>
        <td>
          {item.price}
        </td>
         <td>
          <Link to={`/dashboard/updateItem/${item._id}`}>
            <button  className="btn-ghost p-3 rounded-sm bg-[#d1a054] text-white text-[14px] "><FaEdit></FaEdit></button>
          </Link>
         </td>
         <td>
        <button onClick={()=> handleDeleteItem(item)} className=" bg-[#B91C1C] text-white p-3 rounded-sm"><RiDeleteBinLine /></button>
         </td>
      </tr>)}
      
    </tbody>
  </table>
</div>
     </div>
    </div>
  );
};

export default ManageItems;