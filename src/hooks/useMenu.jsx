// import { useEffect, useState } from "react";

import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

const useMenu = () => {
  const axiosPublic = useAxiosPublic();
  // const [menu, setMenu] = useState([]);
  // const [loding, setLoding] = useState(true);
  
  //   useEffect(() => {
  //       fetch('https://bistro-boss-sever-two.vercel.app/menu')
  //           .then(res => res.json())
  //           .then(data => {
                
  //             setMenu(data);
  //             setLoding(false);
  //           })
  //   }, [])
 

   const {data: menu = [], isPending: loading, refetch} = useQuery({
        queryKey: ['menu'], 
        queryFn: async() =>{
            const res = await axiosPublic.get('/menu');
            return res.data;
        }
    })
    return [menu, loading, refetch]
  
};

export default useMenu;