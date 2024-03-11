import { useDispatch } from "react-redux"
import { useNavigate, useOutletContext } from "react-router-dom"
import { v4 } from "uuid"
import { addNewNote, addNewNoteGuest } from "../../features/notesSlice"

export default function NoteIndex() {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const user = useOutletContext()

    async function addNote() {
        if (user != 'guest') {
            let { payload } = await dispatch(addNewNote({
                title: '*Add Title*',
                content: ''
            }))
            navigate(`/notes/${payload.id}`)
        } else if (user == 'guest') {
            let tempId = v4()
            dispatch(addNewNoteGuest({
                title: '*Add Title*',
                content: '',
                id: tempId
            }))
            navigate(`/notes/${tempId}`)
        }
    }


    return (
        <>
            <button className="text-3xl py-3 w-80 rounded-xl bg-[#00df9a] text-white font-openSans font-bold" onClick={addNote}>
                Create Note
                <span className=" ml-2 font-extrabold">
                    +
                </span>
            </button>
        </>
    )
}