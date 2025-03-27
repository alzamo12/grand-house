import { HiMenuAlt1 } from "react-icons/hi";
import { VscGraphLine } from "react-icons/vsc";
import { MdAddHomeWork, MdHomeWork } from "react-icons/md";
import logo from "../../assets/images/logo.png"
import { Link, NavLink } from "react-router";

const Sidebar = () => {

    return (
        <div className="drawer lg:drawer-open">
            <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content flex flex-col items-center justify-center">
                {/* Page content here */}
                <label htmlFor="my-drawer-2" className="btn bg-[#F6536D] text-white drawer-button lg:hidden">
                    <HiMenuAlt1 />
                </label>
            </div>
            <div className="drawer-side pt-8 overflow-y-hidden">
            <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay bg-white "></label>
                <img className="w-44 mx-auto " src={logo} alt="" />
                <div className="flex flex-col justify-between h-full">
                    <ul className="menu text-base-content w-80 min-h-1/2 mt-10 lg:pt-16 gap-8">
                        {/* Sidebar content here */}
                        <NavLink className="flex items-center gap-8 text-2xl font-medium hover:bg-gray-200 py-2 px-8 w-full">
                            <MdAddHomeWork />
                            <span>Add Room</span>
                        </NavLink>
                        <NavLink className="flex items-center gap-8 text-2xl font-medium hover:bg-gray-200 py-2 px-8 w-full">
                            <MdAddHomeWork />
                            <span>Add Room</span>
                        </NavLink>
                        <NavLink className="flex items-center gap-8 text-2xl font-medium hover:bg-gray-200 py-2 px-8 w-full">
                            <MdHomeWork />
                            <span>My Listings</span>
                        </NavLink>
                    </ul>
                    <ul className="menu text-base-content w-80 h-1/3 mt-10 lg:pt-16 gap-8 overflow-y-hiddens">
                        {/* Sidebar content here */}
                     
                        <NavLink className="flex items-center gap-8 text-2xl font-medium hover:bg-gray-200 py-2 px-8 w-full">
                            <MdAddHomeWork />
                            <span>Add Room</span>
                        </NavLink>
                        <NavLink className="flex items-center gap-8 text-2xl font-medium hover:bg-gray-200 py-2 px-8 w-full">
                            <MdHomeWork />
                            <span>My Listings</span>
                        </NavLink>
                    </ul>

                </div>
            </div>
        </div>
    );
};

export default Sidebar;