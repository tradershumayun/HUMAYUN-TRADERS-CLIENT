import { UserAuth } from "@/app/(auth)/context/AuthContext";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

const useAllCostData = () => {
  const { loading } = UserAuth();
  const axiosPublic = useAxiosPublic();

  const {
    data: costData,
    isPending,
    refetch,
  } = useQuery({
    queryKey: ["costData"],
    enabled: !loading,
    queryFn: async () => {
      const res = await axiosPublic.get("/cost");
      return res?.data;
    },
  });

  return { costData, isPending, refetch };
};
export default useAllCostData;
