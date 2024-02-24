import axios from "axios";

const axiosPublic = axios.create({
  //   baseURL:
  baseURL: "https://humayun-treders.vercel.app",
});

const useAxiosPublic = () => {
  return axiosPublic;
};

export default useAxiosPublic;
