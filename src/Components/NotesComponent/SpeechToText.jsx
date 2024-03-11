import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { useEffect, useState } from 'react';
import { FaMicrophone } from "react-icons/fa";
import { FaMicrophoneSlash } from "react-icons/fa";
import { AiOutlineClose } from 'react-icons/ai';

export default function SpeechToText({ setValue, setSttElement }) {
    const {
        transcript,
        listening,
        resetTranscript,
        browserSupportsSpeechRecognition
    } = useSpeechRecognition();


    const [transcriptValue, setTranscriptValue] = useState('');

    useEffect(() => {
        setTranscriptValue(t => t + transcript)
    }, [transcript])

    function confirmTranscript() {
        setValue(v => v + transcriptValue)
        setTranscriptValue('')
        setSttElement(false)
    }

    function handleClick(event) {
        if (event.target === event.currentTarget) {
            setSttElement(false);
        }
    }

    return (
        <>
            {browserSupportsSpeechRecognition &&
                <div onClick={handleClick} className='flex bg-[#241147aa] backdrop-blur-sm justify-center items-center absolute z-30 top-0 bottom-0 right-0 left-0'>
                    <AiOutlineClose onClick={() => setSttElement(s => !s)} className='absolute text-white z-40 top-5 right-3 text-3xl hover:scale-110 cursor-pointer' />
                    <div className='flex w-[95%] sm:w-2/3 bg-slate-900 rounded-lg flex-col items-center gap-3 p-4'>
                        <p className='sm:text-lg text-white'>Microphone status: <span className='text-blue-400'> {listening ? 'ON' : 'OFF'}</span></p>
                        <div className='flex gap-4'>
                            <FaMicrophone size={listening ? 25 : 20} className='text-white cursor-pointer hover:scale-105 hover:text-blue-600' onClick={SpeechRecognition.startListening} />
                            <FaMicrophoneSlash size={20} className='text-white cursor-pointer hover:scale-105 hover:text-blue-600' onClick={SpeechRecognition.stopListening} />
                        </div>
                        <textarea placeholder='Allow browser access to the microphone and start speaking...' className='w-full p-1 border border-green-400 rounded-md text-black resize-none h-[200px]' value={transcriptValue} onChange={(e) => setTranscriptValue(e.target.value)}></textarea>
                        <button className='text-white bg-slate-600 hover:bg-slate-500 py-1 sm:text-xl hover:scale-105 w-[200px] rounded-lg' onClick={confirmTranscript}>Add in note</button>
                    </div>
                </div>
            }
        </>
    )
}