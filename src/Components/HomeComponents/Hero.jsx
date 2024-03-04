import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { ReactTyped } from 'react-typed';
import { deleteAllNotesGuest } from '../../features/notesSlice';
import { setUser } from '../../features/usersSlice';

const Hero = ({ user }) => {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    function guestClickHandle() {
        dispatch(setUser('guest'))
        dispatch(deleteAllNotesGuest())
        localStorage.setItem('user', 'guest')
        navigate('/notes')
    }




    return (
        <div className='hero  text-white h-screen items-center flex'>
            <div className='max-w-[850px] bg-[#2604171e] rounded-lg backdrop-blur-sm w-full mx-auto text-center flex flex-col gap-5 justify-center py-10'>
                <p className='md:text-2xl sm:text-1xl text-lg text-[#00df9a] p-2'>
                    Make Note-Taking Effortless.
                </p>
                <h1 className='md:text-8xl font-openSans sm:text-5xl text-4xl font-bold md:py-4'>
                    AnonPad
                </h1>
                <div className='flex justify-center items-center'>
                    <p className='md:text-4xl text-[#5866e6] font-roboto sm:text-3xl text-xl font-bold py-2'>
                        Fast, feature-rich tools for
                    </p>
                    <ReactTyped
                        className='md:text-4xl font-roboto sm:text-3xl text-xl font-bold md:pl-4 pl-2 text-[#ff5e5e] '
                        strings={['Note-Taking', 'Language Conversion', 'Word Counting', 'Todo Management']}
                        typeSpeed={120}
                        backSpeed={140}
                        loop
                    />
                </div>
                <p className='md:text-2xl text-xl font-poppins italic text-gray-500'>Effortlessly manage your notes and tasks with additional handy tools.</p>
                {user.msg ?
                    <>
                        <div className='flex justify-center gap-10'>
                            <button className='bg-[#4cff58] md:text-lg w-[200px] font-roboto rounded-md font-semibold my-2 py-2 text-white' onClick={() => navigate('/login')}>Login/Register</button>
                            <button className='bg-[#4c61ff] md:text-lg w-[200px] font-roboto rounded-md font-semibold my-2 py-2 text-white' onClick={guestClickHandle}>Use as a Guest</button>
                        </div>
                    </>
                    :
                    <>
                        <h1 className='md:text-5xl sm:text-4xl text-3xl font-bold md:py-6'>welcome {user.username || user}</h1>
                        <button className='bg-[#1dc791] w-[200px] rounded-md font-roboto font-semibold my-6 mx-auto py-3 text-white' onClick={() => navigate('/notes')}>Get Started</button>
                    </>
                }
            </div>

        </div>
    );
};

export default Hero;