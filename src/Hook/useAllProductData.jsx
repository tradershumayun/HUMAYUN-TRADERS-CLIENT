import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

const useAllProductData = () => {
    
    const axiosPublic = useAxiosPublic();

    const { data: allProduct = [], isLoading: productLoading, refetch: productDataRefrtch, isPending } = useQuery({
        queryKey: ["AllProduct"],
        queryFn: async () => {
            const res = await axiosPublic.get('/product')
            console.log(res.data)
            return res.data;
        }
    })
    return {allProduct, productLoading, productDataRefrtch, isPending};
};

export default useAllProductData;
