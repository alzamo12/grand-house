import { useQuery } from "@tanstack/react-query";
import Categories from "../../components/Categories/Categories";
import Rooms from "../../components/Home/Rooms";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useLocation} from "react-router";

const Home = () => {
    const axiosSecure = useAxiosSecure();
    const location = useLocation();

    // get data of all the rooms
    const { data: rooms = [], isLoading } = useQuery({
        queryKey: ['room', location.search],
        queryFn: async () => {
            const res = await axiosSecure.get(`/rooms${location.search}`);
            return res.data
        }
    });

    return (
        <div>
            {/* give a title */}
            <title>Grand House &nbsp;| |&nbsp; Home</title>

            {/* categories section */}
            <Categories />

            {/* rooms */}
            <Rooms rooms={rooms} isLoading={isLoading} />
        </div>
    );
};

export default Home;