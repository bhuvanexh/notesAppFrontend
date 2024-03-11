import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, Navigate, NavLink, Outlet, redirect, useNavigate } from "react-router-dom"
import { getUser, setUser, setUserState } from "../../features/usersSlice"
import { SignOutUser } from "../../utils/util";
import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai';
import { PiSignOutFill } from "react-icons/pi";
export function Navbar() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    let user = getUser()

    useEffect(() => {
        if (localStorage.getItem('user') == 'guest') {
            dispatch(setUser('guest'))
        }
    }, [])
    async function signoutHandle() {
        let res = await SignOutUser()
        dispatch(setUserState('idle'))
        return navigate('/')
    }


    const [nav, setNav] = useState(false);
    const activeStyles = {
        borderBottom: '1px solid',
        paddingBottom: '3px',
        color: 'violet'
    }
    const activeStylesNav = {
        backgroundColor: 'rgb(51,65,85)'
    }

    return (
        <>
            {!user.msg || (localStorage.getItem('user') == 'guest') ?
                <>
                    <div className="navbar bg-gray-800">
                        <div className='flex justify-between items-center h-24 max-w-[1240px] mx-auto px-4 text-white'>
                            <h1 className='w-full text-5xl font-bold font-comic text-[#00df9a]'>AnonPad</h1>
                            <ul className='hidden md:flex items-center'>
                                <li className='p-4 text-xl hover:text-blue-300 hover:scale-110 transition-transform ease-in-out'> <NavLink style={({ isActive }) => isActive ? activeStyles : null} to={'/'} end> Home</NavLink></li>
                                <li className='p-4 text-xl hover:text-blue-300 hover:scale-110 transition-transform ease-in-out'> <NavLink style={({ isActive }) => isActive ? activeStyles : null} to={'/notes'}> Notes</NavLink></li>
                                <li className='p-4 text-xl hover:text-blue-300 hover:scale-110 transition-transform ease-in-out'> <NavLink style={({ isActive }) => isActive ? activeStyles : null} to={'/tools'}> Tools</NavLink></li>
                                <li className='p-4 text-xl hover:text-blue-300 hover:scale-110 cursor-pointer transition-transform ease-in-out'>  {(user != 'guest') ? <PiSignOutFill size={30} className={'text-red-400'} onClick={signoutHandle} /> : <NavLink to={'/login'}>Login</NavLink>}</li>
                            </ul>
                            <div onClick={() => setNav(nav => !nav)} className='block md:hidden cursor-pointer'>
                                {nav ? <AiOutlineClose size={20} /> : <AiOutlineMenu size={20} />}
                            </div>
                            <ul className={nav ? 'fixed z-10 flex flex-col left-0 top-0 w-[60%] h-full border-r border-r-gray-900 bg-[#000300] ease-in-out duration-500' : 'ease-in-out duration-500 fixed left-[-150%]'}>
                                <h1 className='w-full text-3xl font-bold text-[#00df9a] m-4'>REACT.</h1>
                                <NavLink className='p-4 border-b border-gray-600 text-xl hover:text-blue-300 cursor-pointer transition-transform ease-in-out' style={({ isActive }) => isActive ? activeStylesNav : null} to={'/'} end> Home</NavLink>
                                <NavLink className='p-4 border-b border-gray-600 text-xl hover:text-blue-300  cursor-pointer transition-transform ease-in-out' style={({ isActive }) => isActive ? activeStylesNav : null} to={'/notes'}> Notes</NavLink>
                                <NavLink className='p-4 border-b border-gray-600 text-xl hover:text-blue-300  cursor-pointer transition-transform ease-in-out' style={({ isActive }) => isActive ? activeStylesNav : null} to={'/tools'}> Tools</NavLink>
                                <NavLink className='p-4 border-b border-gray-600 text-xl hover:text-blue-300  cursor-pointer transition-transform ease-in-out' style={({ isActive }) => isActive ? activeStylesNav : null} to={'/Login'}> Login</NavLink>
                            </ul>
                        </div>
                    </div>
                    {/* {(user != 'guest') ? <button onClick={signoutHandle}>sign out</button> : <Link to={'/login'}>Login</Link>} */}
                    <Outlet context={user} />
                </>
                : <Navigate to={'/login'} />
            }
        </>
    )
}