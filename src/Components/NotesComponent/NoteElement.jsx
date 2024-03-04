import { useEffect } from "react";
import { useRef } from "react";
import { useState } from "react"
import ReactQuill from "react-quill"
import 'react-quill/dist/quill.snow.css';
import { useDispatch } from "react-redux";
import { useNavigate, useOutletContext, useParams } from "react-router-dom"
import { deleteNote, deleteNoteGuest, getNoteById, updateNote, updateNoteGuest } from "../../features/notesSlice"
import { getTextStats, updateNoteLocal } from "../../utils/util";
import SpeechToText from "./SpeechToText"


function debounceUpdate(delay) {
    let timeoutId

    return function (dispatch, updateNote, id, title, value) {
        clearTimeout(timeoutId)
        timeoutId = setTimeout(() => {
            dispatch(updateNote({
                id: id,
                data: { title: title, content: value }
            }))
        }, delay)
    }
}

const update = debounceUpdate(300)


export default function NoteElement() {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const user = useOutletContext()

    const { id } = useParams()
    let res = getNoteById(id)

    const { wordCount, charCount } = getTextStats(res.content)

    const [value, setValue] = useState(res.content);
    const [title, setTitle] = useState(res.title);
    const [count, setCount] = useState({
        textCount: wordCount,
        wordCount: charCount
    })
    useEffect(() => {
        let initialValue = res.content
        setValue(initialValue)
        let initialTitle = res.title
        setTitle(initialTitle)
    }, [id])


    useEffect(() => {
        if (user != 'guest') {
            update(dispatch, updateNote, id, title, value)
        } else if (user == 'guest') {
            updateNoteLocal({
                id: id,
                content: value,
                title: title
            })
            dispatch(updateNoteGuest({
                id: id,
                title: title,
                content: value
            }))
        }
    }, [title, value])


    function handleQuillChange(newValue, d, s, editor) {
        setValue(newValue)
        const text = editor.getText().trim();
        setCount(v => {
            return {
                textCount: text.length,
                wordCount: text.length == 0 ? 0 : text.split(' ').length
            }
        })
    }
    function handleTitleChange(e) {
        setTitle(e.target.value)
    }

    function handleDelete() {
        if (user != 'guest') {
            dispatch(deleteNote(id))
        } else if (user == 'guest') {
            dispatch(deleteNoteGuest(id))
        }
        navigate('/notes')
    }

    return (
        <>
            <div className="flex flex-col p-4 bg-[#181818] gap-5 w-full h-full">
                <div className="flex justify-between px-2">
                    <input placeholder="Add Title" className="text-3xl w-1/2 px-2 pb-1 border-b-[1px] text-white bg-transparent outline-none" type="text" name="title" onChange={handleTitleChange} value={title} />
                    <div className="text-blue-100 italic text-sm flex self-end gap-2">
                        <span>{count.textCount} char</span>
                        <span>{count.wordCount} words</span>
                    </div>
                </div>
                {/* <SpeechToText setValue={setValue} /> */}
                <ReactQuill className="quill" placeholder="**your content goes here**" style={{ flexGrow: '1', color: 'white' }} theme="snow" value={value} onChange={handleQuillChange} />
                <button className="mt-10 self-center text-white font-poppins bg-blue-700 rounded-lg py-2 w-40 text-2xl" onClick={handleDelete}>delete</button>
            </div>
        </>
    )
}