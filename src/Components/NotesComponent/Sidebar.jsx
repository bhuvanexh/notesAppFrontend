import { FaPlus } from "react-icons/fa";



const Sidebar = ({ children, notes, addNote }) => {
    return (
        <div className="flex flex-grow">
            {/* Sidebar */}
            <div className="bg-gray-900 w-64 border-r-2">
                <div className="p-4 flex items-center border-b-2 border-white bg-[#103e46] gap-7 pr-5 justify-between text-white font-montserrat text-2xl font-bold">
                    <span>
                        Notes
                    </span>
                    <button className="text-white font-poppins text-lg" onClick={addNote}><FaPlus size={20} /></button>
                </div>
                {/* Sidebar content */}
                <ul className="py-2 px-2 flex-col flex gap-2">
                    {notes}
                </ul>
            </div>

            {/* Main content */}
            <div className="flex-grow flex flex-col bg-slate-700">
                <div className="p-4 text-green-300 border-b-2 border-white text-2xl bg-purple-800">Header</div>
                {/* Main content area */}
                <div className="flex justify-center flex-grow items-center">
                    {children}
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
