import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { useEffect, useState } from 'react';


export default function SpeechToText({ setValue }) {
    const {
        transcript,
        listening,
        resetTranscript,
        browserSupportsSpeechRecognition
    } = useSpeechRecognition();


    const [transcriptValue, setTranscriptValue] = useState('');

    useEffect(() => {
        setTranscriptValue(transcript)
    }, [transcript])

    function confirmTranscript() {
        setValue(v => v + transcriptValue)
        setTranscriptValue('')
    }


    return (
        <>
            {browserSupportsSpeechRecognition && <div>
                <p>Microphone: {listening ? 'on' : 'off'}</p>
                <button onClick={SpeechRecognition.startListening}>Start</button>
                <button onClick={SpeechRecognition.stopListening}>Stop</button>
                <p>transcript = {transcriptValue}</p>
                <button onClick={confirmTranscript}>confirm</button>
            </div>}
        </>
    )
}