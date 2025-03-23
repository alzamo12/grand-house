import Categories from "../../components/Categories/Categories";
import Rooms from "../../components/Home/Rooms";

const Home = () => {
    return (
        <div>
            {/* give a title */}
            <title>Grand House &nbsp;| |&nbsp; Home</title>

            {/* categories section */}
            <Categories />

            {/* rooms */}
            <Rooms />
        </div>
    );
};

export default Home;