import axios from "axios";

const axiosSecure = axios.create({
 
  baseURL: "https://humayun-treders.vercel.app",
});

const useAxiosSecure = () => {
  return axiosSecure;
};

export default useAxiosSecure;
