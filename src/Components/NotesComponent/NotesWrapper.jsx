import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, Outlet, useNavigate, useOutletContext } from "react-router-dom";
import { addNewNote, addNewNoteGuest, deleteNote, deleteNoteGuest, fetchNotes, getError, getNotes, getStatus, setAllNotesGuest, setNotesStatus } from "../../features/notesSlice";
import { v4 } from "uuid"
import Sidebar from "./Sidebar";
import { MdDelete } from "react-icons/md";
import { addNoteLocal, getNotesLocal } from "../../utils/util";

export default function NotesWrapper() {
    const status = getStatus()
    const error = getError()
    const notes = getNotes()

    const user = useOutletContext()
    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        console.log('effect ran');
        if (status == 'idle' && user.id) {
            dispatch(fetchNotes())
        } else if (localStorage.getItem('user') == 'guest') {
            let notesTemp = getNotesLocal()
            dispatch(setAllNotesGuest(notesTemp))
        }
    }, [status])


    function handleDelete(id) {
        if (user != 'guest') {
            dispatch(deleteNote(id))
        } else if (user == 'guest') {
            dispatch(deleteNoteGuest(id))
        }
        navigate('/notes')
    }
    const [showDelete, setShowDelete] = useState(false);

    const renderEl = notes.map(n => (
        <li
            key={n.id}
            className="relative flex items-center py-2 px-3 text-white font-roboto text-lg bg-[#447df8] hover:bg-gray-700 cursor-pointer"
            onMouseEnter={() => setShowDelete(true)}
            onMouseLeave={() => setShowDelete(false)}
        >
            <Link to={`${n.id}`} className="block w-full h-full relative" key={n.id}>
                {n.title || 'untitled'}
            </Link>
            {showDelete && (
                <MdDelete
                    size={22}
                    onClick={() => handleDelete(n.id)}
                    className="absolute self-center top-0 right-0 mt-[10px] mr-2 cursor-pointer"
                />
            )}
        </li>
    ))

    async function addNote() {
        if (user != 'guest') {
            let { payload } = await dispatch(addNewNote({
                title: '*Add Title*',
                content: ''
            }))
            navigate(`/notes/${payload.id}`)
        } else if (user == 'guest') {
            let tempId = v4()
            addNoteLocal({
                title: '*Add Title*',
                content: '',
                id: tempId
            })
            dispatch(addNewNoteGuest({
                title: '*Add Title*',
                content: '',
                id: tempId
            }))
            navigate(`/notes/${tempId}`)
        }
    }
    // let guestNotesParsed = JSON.parse(localStorage.getItem('guestNotes'))
    // console.log(guestNotesParsed, 'guest notes');

    if (status == 'loading' || status == 'idle') {
        return (<>Loading...</>)
    }
    if (status == 'failed') {
        return (<>{error}</>)
    }


    return (
        <>
            <Sidebar notes={renderEl} addNote={addNote}>
                <Outlet context={user} />
            </Sidebar>
        </>
    )
}