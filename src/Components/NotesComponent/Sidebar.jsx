import { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { FaPlus } from "react-icons/fa";
import { TfiMoreAlt } from "react-icons/tfi";

const Sidebar = ({ children, notes, addNote }) => {
    const [sidebar, setSidebar] = useState(false);


    return (
        <div className="flex flex-grow relative">

            <div className="bg-gray-900 md lg:w-60 w-[20%] border-r-2 hidden md:block">
                <div className="p-4 flex items-center border-b-2 border-white bg-black gap-7 pr-5 justify-between text-white font-montserrat text-xl lg:text-2xl font-bold">
                    <span>
                        Notes
                    </span>
                    <button className="text-white font-poppins text-lg active:scale-90 transition-transform ease-in-out" onClick={addNote}><FaPlus className="lg:text-[20px] text-[15px]" /></button>
                </div>
                <ul className="py-2 px-2 flex-col gap-2 flex">
                    {notes}
                </ul>
            </div>
            <div className={sidebar ? "fixed h-full left-0 z-10 bg-gray-900 md:hidden w-52 border-r-2 ease-in-out duration-200" : 'fixed z-10 bg-gray-900 left-[-100%] h-full ease-in-out duration-500'}>
                <div className="p-4 flex items-center border-b-2 border-white bg-black gap-4 pr-5 justify-between text-white font-montserrat text-xl lg:text-2xl font-bold">
                    <span>
                        Notes
                    </span>
                    <button className="text-white font-poppins text-lg active:scale-90 transition-transform ease-in-out" onClick={addNote}><FaPlus className="lg:text-[20px] text-[15px]" /></button>
                    <div onClick={() => setSidebar(s => !s)} className='block cursor-pointer active:scale-90 transition-transform ease-in-out'>
                        <AiOutlineClose size={20} />
                    </div>
                </div>
                <ul className="py-2 px-2 flex-col gap-2 flex">
                    {notes}
                </ul>
            </div>

            {/* Main content */}
            <div className="flex-grow flex flex-col bg-gray-900">


                <div className="p-4 text-white border-b-2 border-white text-xl items-center lg:text-2xl bg-black flex gap-3">

                    <div onClick={() => setSidebar(s => !s)} className='block md:hidden cursor-pointer'>
                        <TfiMoreAlt />
                    </div>

                    Header
                </div>
                {/* Main content area */}
                <div className="flex justify-center flex-grow items-center">
                    {children}
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
