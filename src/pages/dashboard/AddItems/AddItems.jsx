import { useForm } from "react-hook-form";
import SectionTitle from "../../../component/SectionTitle/SectionTitle";
import {  FaUtensils } from "react-icons/fa";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from 'sweetalert2'


const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const AddItems = () => {
  const { register, handleSubmit , reset} = useForm()
  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();
  const onSubmit = async (data) => {
    console.log(data)
    // image upload to imgbb and then get an url
    const imageFile = { image: data.image[0] }    
    
    const res = await axiosPublic.post(image_hosting_api, imageFile, {
      headers: {
        'content-type': 'multipart/form-data'
      }
    });
    if (res.data.success) {
      // now send the menu item data to the server with the image url
      const menuItem = {
        name: data.name,
        category: data.category,
        price: parseFloat(data.price),
        recipe: data.recipe,
        image: res.data.data.display_url
      }
      const menuRes = await axiosSecure.post('/menu', menuItem);
      console.log(menuRes.data);
      if (menuRes.data.insertedId) {
        // show the seccess meg
        reset()
        Swal.fire({
         position: "top-end",
         icon: "success",
         title: `${data.name} is added to the menu.`,
         showConfirmButton: false,
         timer: 1500
       });
      }
      
    }
    console.log('with img url',res.data);
  }


  return (
    <div className="-mt-10">
      <SectionTitle subHeading="add an item" heading="What's new? "></SectionTitle>
      <div className="w-10/12 mx-auto bg-slate-300 p-5">
         <form onSubmit={handleSubmit(onSubmit)}>
          
     <label className="form-control w-full my-6">
    <div className="label">
    <span className="label-text font-semibold text-[20px]">Recipe Name*</span>
    
     </div>
        <input {...register("name" ,{required:true}) }
          type="text" placeholder="Recipe Name" className="input input-bordered w-full " />
          </label>
          
          <div className="flex gap-5">
            {/* category */}
             <label className="form-control w-full max-w-xl">
          <div className="label">
          <span className="label-text font-semibold text-[20px]">Category</span>
     </div>
       <select defaultValue="default" {...register('category',{required:true})}
           className="select select-bordered w-full max-w-xl">
        <option disabled value="default" >Selet a category </option>
        <option value="salad">Salad</option>
        <option value="pizza">Pizza</option>
        <option value="soup">Soup</option>
        <option value="dessert">Dessert</option>
        <option value="drinks">Drinks</option>
      </select>
            </label>
         {/* price */}
     <label className="form-control w-full max-w-xs">
    <div className="label">
    <span className="label-text font-semibold text-[20px]">Price*</span>
    
     </div>
        <input {...register("price",{required:true})}
          type="text" placeholder="price" className="input input-bordered w-full max-w-xs" />
          </label>
          </div>
          <label className="form-control">
  <div className="label mt-4 ">
    <span className="label-text font-semibold text-[20px] mt-y">Recipe Details*</span>
   </div>
     <textarea
     {...register("recipe",{required:true})}
           className="textarea textarea-bordered h-24" placeholder="Recipe Details*"></textarea>
  <div className="label">
    
  <div>
                <input
                  {...register("image",{required:true})}
                  type="file" className="my-4 file-input file-input-bordered w-full max-w-xs" />
  </div>
  </div>
</label>
    <button className="bg-[#8b6325] btn btn-ghost font-bold text-white">Add Item <FaUtensils></FaUtensils></button>
    </form>
   </div>
    </div>
  );
};

export default AddItems;