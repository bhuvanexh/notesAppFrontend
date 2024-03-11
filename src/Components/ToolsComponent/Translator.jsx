import React, { useState } from "react";
import countries from "./data";
import { FaRegCopy } from "react-icons/fa";
import { IoMdVolumeHigh } from "react-icons/io";
import { TbArrowsExchange } from "react-icons/tb";

const Translator = () => {
    const [fromText, setFromText] = useState("");
    const [toText, setToText] = useState("");
    const [fromLang, setFromLang] = useState("en-GB");
    const [toLang, setToLang] = useState("hi-IN");

    const handleExchange = () => {
        setFromText(toText);
        setToText(fromText);
        setFromLang(toLang);
        setToLang(fromLang);
    };

    const handleTranslate = () => {
        if (!fromText) return;

        setToText("Translating...");
        let apiUrl = `https://api.mymemory.translated.net/get?q=${fromText}&langpair=${fromLang}|${toLang}`;
        fetch(apiUrl)
            .then((res) => res.json())
            .then((data) => {
                const translatedText = data.responseData.translatedText;
                setToText(translatedText);
            });
    };

    const handleCopy = (text) => {
        console.log(text, 'test text');
        navigator.clipboard.writeText(text);
    };

    const handleSpeak = (text, lang) => {
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = lang;
        speechSynthesis.speak(utterance);
    };

    return (
        <div className="flex h-full items-center justify-center bg-black">
            <div className="flex rounded-lg sm:min-w-[550px] w-[95%] md:min-w-[700px] sm:w-2/3 flex-col p-2 bg-white">
                <div className="flex flex-col md:flex-row border rounded-t-md">
                    <textarea
                        className="w-full md:w-1/2 h-[200px] md:h-[300px] p-1 rounded-md resize-none outline-none"
                        spellCheck="false"
                        value={fromText}
                        onChange={(e) => setFromText(e.target.value)}
                        placeholder="Enter text"
                    ></textarea>
                    <textarea
                        className="w-full md:w-1/2 h-[200px] md:h-[300px] border-t border-l md:border-t-0 p-1 resize-none"
                        spellCheck="false"
                        value={toText}
                        readOnly
                        disabled
                        placeholder="Translation"
                    ></textarea>
                </div>
                <ul className="flex items-center justify-around border rounded-b-md py-1 mb-2">
                    <li className="flex flex-wrap">
                        <div className="flex border-r gap-1 sm:gap-2 items-center px-1 sm:px-3 mr-1">
                            <IoMdVolumeHigh className="cursor-pointer hover:scale-105 hover:text-blue-900" onClick={() => handleSpeak(fromText, fromLang)}></IoMdVolumeHigh>
                            <FaRegCopy className="cursor-pointer hover:scale-105 hover:text-blue-900" onClick={() => handleCopy(fromText)}></FaRegCopy>
                        </div>
                        <select className="cursor-pointer outline-1 outline-gray-300 outline" value={fromLang} onChange={(e) => setFromLang(e.target.value)}>
                            {Object.entries(countries).map(([code, name]) => (
                                <option key={code} value={code}>
                                    {name}
                                </option>
                            ))}
                        </select>
                    </li>
                    <li className="" onClick={handleExchange}>
                        <TbArrowsExchange className="cursor-pointer hover:scale-105 hover:text-blue-900" />
                    </li>
                    <li className="flex flex-wrap">
                        <select className="cursor-pointer outline outline-gray-300 outline-1" value={toLang} onChange={(e) => setToLang(e.target.value)}>
                            {Object.entries(countries).map(([code, name]) => (
                                <option key={code} value={code}>
                                    {name}
                                </option>
                            ))}
                        </select>
                        <div className="flex border-l gap-1 sm:gap-2 items-center px-1 sm:px-3 ml-1">
                            <IoMdVolumeHigh className="cursor-pointer hover:scale-105 hover:text-blue-900" onClick={() => handleSpeak(fromText, fromLang)}></IoMdVolumeHigh>
                            <FaRegCopy className="cursor-pointer hover:scale-105 hover:text-blue-900" onClick={() => handleCopy(fromText)}></FaRegCopy>
                        </div>
                    </li>
                </ul>
                <button className="w-full text-white font-roboto bg-cyan-600 rounded-lg py-1" onClick={handleTranslate}>Translate Text</button>
            </div>
        </div>
    );
};

export default Translator;
