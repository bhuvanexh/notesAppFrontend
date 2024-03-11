import { Link, Navigate, NavLink, Outlet } from "react-router-dom"
import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai';

export function ToolsWrapper() {
    const activeStyles = {
        borderBottom: '1px solid',
        paddingBottom: '3px',
        color: 'violet'
    }
    return (
        <>
            <div className='flex w-full bg-black justify-center items-center h-12 px-4 text-white'>
                <ul className='flex sm:gap-4'>
                    <li className='p-4 text-lg sm:text-xl hover:text-blue-300 hover:scale-110 transition-transform ease-in-out'> <NavLink style={({ isActive }) => isActive ? activeStyles : null} to={'/tools'} end>Translator </NavLink></li>
                    <li className='p-4 text-lg sm:text-xl hover:text-blue-300 hover:scale-110 transition-transform ease-in-out'> <NavLink style={({ isActive }) => isActive ? activeStyles : null} to={'/tools/todo'}>Todo </NavLink></li>
                    <li className='p-4 text-lg sm:text-xl hover:text-blue-300 hover:scale-110 transition-transform ease-in-out'> <NavLink style={({ isActive }) => isActive ? activeStyles : null} to={'/tools/counter'}>Counter </NavLink></li>
                </ul>
            </div>
            <Outlet />
        </>
    )
}