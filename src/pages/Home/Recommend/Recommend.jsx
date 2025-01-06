
import './Recommend.css'
import servis from'../../../assets/home/chef-service.jpg'
const Recommend = () => {
  return (
    <div className='relative'>
      <div className=''>
       <img src={servis} alt="" />
         </div>
       <div className="md:ml-10 absolute w-8/12 mx-auto left-32 p-10 text-center bg-white top-32 rounded-md">
        <h3 className='text-2xl font-bold'>Bistro Boss</h3>

         <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus, libero accusamus laborum deserunt ratione dolor officiis praesentium! Deserunt magni aperiam dolor eius dolore at, nihil iusto ducimus incidunt quibusdam nemo.</p>
         
         </div>
    </div>
  );
};

export default Recommend;