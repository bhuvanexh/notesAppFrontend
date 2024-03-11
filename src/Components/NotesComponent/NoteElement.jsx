import { useEffect } from "react";
import { useState } from "react"
import { FaRegCopy } from "react-icons/fa";
import ReactQuill from "react-quill"
import 'react-quill/dist/quill.snow.css';
import { useDispatch } from "react-redux";
import { useNavigate, useOutletContext, useParams } from "react-router-dom"
import { useSpeechRecognition } from "react-speech-recognition";
import { deleteNote, deleteNoteGuest, getNoteById, updateNote, updateNoteGuest } from "../../features/notesSlice"
import { getTextStats, updateNoteLocal } from "../../utils/util";
import SpeechToText from "./SpeechToText";


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
    const {
        browserSupportsSpeechRecognition
    } = useSpeechRecognition();
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

    const handleCopy = (text) => {
        const plainText = text.replace(/<[^>]*>/g, '');
        navigator.clipboard.writeText(plainText);
    };

    function handleDelete() {
        if (user != 'guest') {
            dispatch(deleteNote(id))
        } else if (user == 'guest') {
            dispatch(deleteNoteGuest(id))
        }
        navigate('/notes')
    }

    const [sttElement, setSttElement] = useState(false)


    console.log(value, 'speec to text');

    return (
        <>
            <div className="flex flex-col relative px-2 py-5 md:px-4 bg-[#181818] gap-5 w-full h-full">
                <div className="flex justify-between md:px-2">
                    <input placeholder="Add Title" className="text-xl sm:text-2xl md:text-3xl w-1/2 px-2 pb-1 border-b-[1px] text-white bg-transparent outline-none" type="text" name="title" onChange={handleTitleChange} value={title} />
                    <div className="text-blue-100 italic text-sm items-center flex self-end gap-1 sm:gap-2">
                        <FaRegCopy size={16} className="mr-1 active:scale-90 transition-transform ease-in-out cursor-pointer" onClick={() => handleCopy(value)}></FaRegCopy>
                        <span>{count.textCount} char</span>
                        <span>{count.wordCount} words</span>
                    </div>
                </div>
                {browserSupportsSpeechRecognition && <button onClick={() => setSttElement(s => !s)} className="bg-purple-600 rounded-lg hover:scale-105 hover:bg-violet-600 text-white p-1 font-roboto self-start">try speech to text</button>}                {sttElement && <SpeechToText setValue={setValue} setSttElement={setSttElement} />}
                <ReactQuill className="quill" placeholder="**your content goes here**" style={{ flexGrow: '1', color: 'white' }} theme="snow" value={value} onChange={handleQuillChange} />
                <button className="mt-16 sm:mt-10 self-center text-white font-poppins bg-slate-700 hover:scale-105 active:scale-90 transition-transform ease-in-out rounded-lg py-2 w-32 sm:w-40 text-xl sm:text-2xl" onClick={handleDelete}>Delete</button>
            </div>
        </>
    )
}