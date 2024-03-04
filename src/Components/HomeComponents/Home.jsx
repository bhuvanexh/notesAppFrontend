import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getUser, setUser } from "../../features/usersSlice";
import Hero from "./Hero";

export default function Home() {
    const user = getUser()
    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        if (localStorage.getItem('user') == 'guest') {
            dispatch(setUser('guest'))
        }
    }, [])

    return (
        <>
            <Hero user={user} />
        </>
    )
} 