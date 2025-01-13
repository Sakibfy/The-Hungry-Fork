import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";


const useAdmin = () => {
  const { user,loading } = useAuth()
  const axiosSecure = useAxiosSecure();
  const { data: isadmin, isPending: isAdminLoading } = useQuery({
    queryKey: [user?.email, 'isadmin'],
    enabled: !loading,
    queryFn: async () => {
      
      const res = await axiosSecure.get(`/users/admin/${user.email}`);
      console.log(res.data);
      return res.data?.admin;
    }
  })
  return [isadmin,isAdminLoading]
};

export default useAdmin;