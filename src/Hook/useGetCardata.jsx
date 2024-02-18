import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";
import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";

const useGetCardData = () => {
    
    const axiosPublic = useAxiosPublic();
    const {user} = useContext(AuthContext)

    const { data: product = [], isLoading: productLoading, refetch: productDataRefrtch, isPending, isLoading } = useQuery({
        queryKey: [user.email],
        queryFn: async () => {
            const res = await axiosPublic.get(`/card?user=${user.email}`)
            return res.data;
        }
    })
    return {product, productLoading, productDataRefrtch, isPending, isLoading};
};

export default useGetCardData;
