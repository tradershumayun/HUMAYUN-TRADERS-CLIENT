import axios from "axios";

const axiosPublic = axios.create({
  baseURL: "https://humayun-treders.vercel.app",
});

const useAxiosPublic = () => {
  return axiosPublic;
};

export default useAxiosPublic;
