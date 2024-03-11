import './App.css'
import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from "react-router-dom"
import NotesWrapper from './Components/NotesComponent/NotesWrapper'
import NoteElement from './Components/NotesComponent/NoteElement'
import { fetchNotes, getError, getStatus } from './features/notesSlice'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
import NoteIndex from './Components/NotesComponent/NoteIndex'
import Login, { loginAction } from './Components/LoginComponent/Login'
import { fetchUser, getUser, getUserError, getUserStatus } from './features/usersSlice'
import axios from 'axios'
import Home from './Components/HomeComponents/Home'
import Register, { registerAction } from './Components/LoginComponent/Register'
import Error from './Components/Error'
import Loading from './Components/Loading'
import { Navbar } from './Components/HomeComponents/Navbar'
import Translator from './Components/ToolsComponent/Translator'
import { ToolsWrapper } from './Components/ToolsComponent/ToolsWrapper'
import { TodoWrapper } from './Components/ToolsComponent/TodoComponents/TodoWrapper'
import Counter from './Components/ToolsComponent/Counter'


function App() {

  const dispatch = useDispatch()

  const userStatus = getUserStatus()
  const userError = getUserError()
  useEffect(() => {
    if (userStatus == 'idle') {
      dispatch(fetchUser())
    }
  }, [userStatus])

  if (userStatus == 'loading' || userStatus == 'idle') {
    return (<><Loading /></>)
  }
  if (userStatus == 'failed') {
    return (<>{userError}</>)
  }

  const router = createBrowserRouter(createRoutesFromElements(
    <>
      <Route path='/' element={<Home />} errorElement={<Error />} />
      <Route element={<Navbar />} errorElement={<Error />}>
        <Route path='/notes' element={<NotesWrapper />} errorElement={<Error />}>
          <Route index element={<NoteIndex />} errorElement={<Error />} />
          <Route path=':id' element={<NoteElement />} errorElement={<Error />} />
        </Route>
        <Route path='/tools' element={<ToolsWrapper />} errorElement={<Error />}>
          <Route index element={<Translator />} errorElement={<Error />} />
          <Route path='todo' element={<TodoWrapper />} errorElement={<Error />} />
          <Route path='counter' element={<Counter />} errorElement={<Error />} />
        </Route>
      </Route>

      <Route path='/login' element={<Login />} action={loginAction} />
      <Route path='/register' element={<Register />} action={registerAction} />
    </>
  ))

  return (
    <>
      <div className='h-screen flex flex-col'>
        <RouterProvider router={router} />
      </div>
    </>
  )
}

export default App

