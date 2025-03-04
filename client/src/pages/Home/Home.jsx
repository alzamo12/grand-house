import Categories from "../../components/Categories/Categories";
import Rooms from "../../components/Home/Rooms";

const Home = () => {
    return (
        <div>
            {/* categories section */}
           <Categories/>

           {/* rooms */}
           <Rooms/>
        </div>
    );
};

export default Home;