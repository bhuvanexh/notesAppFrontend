import { useState } from "react";
import { MdDelete } from "react-icons/md";
import { NavLink } from "react-router-dom";

export default function Notelink({ n, handleDelete }) {
    const [showDelete, setShowDelete] = useState(false);

    const activeStyles = {
        backgroundColor: '#00df9a',
        borderRadius: '10px',
        borderBottom: '0px'
    }

    return (
        <NavLink style={({ isActive }) => isActive ? activeStyles : null} to={`${n.id}`}
            className="relative flex items-center py-2 px-3 text-white font-roboto lg:text-lg border-b border-gray-400 cursor-pointer"
            key={n.id}
            onMouseEnter={() => setShowDelete(true)}
            onMouseLeave={() => setShowDelete(false)}
        >
            <span className="block w-full h-full relative">
                {n.title.length > 20 ? n.title.substring(0, 20) + '...' : n.title || 'untitled'}
            </span>

            {showDelete && (
                <MdDelete
                    size={22}
                    onClick={(e) => {
                        e.preventDefault()
                        handleDelete(n.id)
                    }}
                    className="absolute self-center top-0 right-0 mt-[10px] mr-2 cursor-pointer"
                />
            )}
        </NavLink>
    )
}