import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../Hook/useAxiosSecure";

const Text = () => {
  const axiosSecure = useAxiosSecure();
  const { data: user = [], refetch } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const res = await axiosSecure.get("/user", {});
      return res.data;
    },
  });

  return (
    <div>
      <p>total user {user?.length}</p>
    </div>
  );
};

export default Text;
