import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from './useAxiosSecure';

const useGetAllUserData = () => {
    const axiosSecure = useAxiosSecure();

    const { data: users = [], isLoading: userLoading, refetch: userFetching } = useQuery({
        queryKey: ["users"],
        queryFn: async () => {
            const res = await axiosSecure.get('/user')
            return res.data;
        }
    })
    return {users, userLoading, userFetching};
};

export default useGetAllUserData;