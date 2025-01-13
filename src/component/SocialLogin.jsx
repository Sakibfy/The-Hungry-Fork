import { FcGoogle } from "react-icons/fc";
import useAuth from "../hooks/useAuth";
import useAxiosPublic from "../hooks/useAxiosPublic";
import { useNavigate } from "react-router-dom";

const SocialLogin = () => {
  const { googleSingIn } = useAuth();
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate()
  const handleGoogleSingIn = () => {
    googleSingIn()
      .then(result => {
        console.log(result);
        const userinfo = {
          email: result.user?.email,
          name: result.user?.displayName
        }
        axiosPublic.post('/users', userinfo)
          .then(res => {
            console.log(res.data);
            navigate('/')
        })
    })
}
  return (
    <div className="flex justify-center">
       <div className="divider"></div>
      <button onClick={handleGoogleSingIn} className='btn mb-3'> <FcGoogle /> Google</button>
    </div>
  );
};

export default SocialLogin;