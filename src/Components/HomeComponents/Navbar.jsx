import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, Navigate, Outlet, redirect, useNavigate } from "react-router-dom"
import { getUser, setUser, setUserState } from "../../features/usersSlice"
import { SignOutUser } from "../../utils/util";
import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai';

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


    return (
        <>
            {!user.msg || (localStorage.getItem('user') == 'guest') ?
                <>
                    <div className="navbar">
                        <div className='flex justify-between items-center h-24 max-w-[1240px] mx-auto px-4 text-white'>
                            <h1 className='w-full text-5xl font-bold font-comic text-[#00df9a]'>AnonPad</h1>
                            <ul className='hidden md:flex'>
                                <li className='p-4 text-xl'> <Link to={'/'}> Home</Link></li>
                                <li className='p-4 text-xl'> <Link to={'/notes'}> Notes</Link></li>
                                <li className='p-4 text-xl'> <Link to={'/'}> Tools</Link></li>
                                <li className='p-4 text-xl'>  {(user != 'guest') ? <button onClick={signoutHandle}>sign out</button> : <Link to={'/login'}>Login</Link>}</li>
                            </ul>
                            <div onClick={() => setNav(nav => !nav)} className='block md:hidden'>
                                {nav ? <AiOutlineClose size={20} /> : <AiOutlineMenu size={20} />}
                            </div>
                            <ul className={nav ? 'fixed left-0 top-0 w-[60%] h-full border-r border-r-gray-900 bg-[#000300] ease-in-out duration-500' : 'ease-in-out duration-500 fixed left-[-100%]'}>
                                <h1 className='w-full text-3xl font-bold text-[#00df9a] m-4'>REACT.</h1>
                                <li className='p-4 border-b border-gray-600 text-xl'><Link to={'/'}> Home</Link></li>
                                <li className='p-4 border-b border-gray-600 text-xl'><Link to={'/notes'}> Notes</Link></li>
                                <li className='p-4 border-b border-gray-600 text-xl'><Link to={'/'}> Tools</Link></li>
                                <li className='p-4 text-xl'><Link to={'/Login'}> Login</Link></li>
                            </ul>
                        </div>
                    </div>
                    {/* {(user != 'guest') ? <button onClick={signoutHandle}>sign out</button> : <Link to={'/login'}>Login</Link>} */}
                    <Outlet context={user} />
                </>
                : <Navigate to={'/login'} />}
        </>
    )
}