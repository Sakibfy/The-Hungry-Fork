import { useEffect, useState } from "react";

const useMenu = () => {
  
  const [menu, setMenu] = useState([]);
  const [loding, setLoding] = useState(true);
  
    useEffect(() => {
        fetch('http://localhost:5000/menu')
            .then(res => res.json())
            .then(data => {
                
              setMenu(data);
              setLoding(false);
            })
    }, [])
 
  return [menu,loding]
  
};

export default useMenu;