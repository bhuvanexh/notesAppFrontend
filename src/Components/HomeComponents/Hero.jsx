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
        <div className="hero">
            <div className='bg-[#0b071e7b] text-white h-screen items-center flex'>
                <div className='heroIn lg:max-w-[850px] w-[85%] md:max-w-[650px] sm:max-w-[480px] bg-[#0f286233] rounded-lg backdrop-blur-md mx-auto text-center flex flex-col gap-5 px-1 md:px-2 justify-center py-10'>
                    <p className='md:text-2xl sm:text-1xl font-comic text-[#EE72F8] p-2'>
                        Make Note-Taking Effortless.
                    </p>
                    <h1 className='md:text-8xl font-montserrat text-5xl font-bold md:py-4'>
                        AnonPad
                    </h1>
                    <div className='flex italic md:flex-row flex-col justify-center items-center mb-4 md:mb-8'>
                        <p className='lg:text-3xl text-[#5b59dd] font-poppins md:text-2xl text-xl py-2'>
                            Fast, feature-rich tools for
                        </p>
                        <ReactTyped
                            className='lg:text-3xl font-poppins font-semibold md:text-2xl text-xl md:pl-4 pl-2 text-[#EF036C] '
                            strings={['Note-Taking', 'Language Conversion', 'Word Counting', 'Todo Management']}
                            typeSpeed={120}
                            backSpeed={140}
                            loop
                        />
                    </div>
                    {/* <p className='md:text-xl text-xl font-poppins italic text-[#EE72F8]'>Effortlessly manage your notes and tasks with additional handy tools.</p> */}
                    {user.msg ?
                        <>
                            <div className='flex sm:flex-row flex-col items-center gap-3 justify-center sm:gap-10'>
                                <button className='button1 text-sm md:text-lg w-[180px] md:w-[200px] font-roboto rounded-md font-semibold my-2 py-2 md:py-3 text-white' onClick={() => navigate('/login')}>Login/Register</button>
                                <span>or</span>
                                <button className='button1 text-sm md:text-lg w-[180px] md:w-[200px] font-roboto rounded-md font-semibold my-2 py-2 md:py-3 text-white' onClick={guestClickHandle}>Use as a Guest</button>
                            </div>
                        </>
                        :
                        <>
                            <h1 className='md:text-4xl sm:text-3xl text-2xl font-bold'>Welcome {user.username || user}</h1>
                            <button className='button1 w-[180px] md:w-[200px] text-sm md:text-lg rounded-md font-roboto font-semibold my-2 py-2 md:my-6 mx-auto md:py-3 text-white' onClick={() => navigate('/notes')}>Get Started</button>
                        </>
                    }
                </div>
            </div>
        </div>
    );
};

export default Hero;