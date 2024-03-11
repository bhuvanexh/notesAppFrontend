import React, { useState } from 'react';

const Counter = () => {
    const [text, setText] = useState('');

    const handleTextChange = (e) => {
        setText(e.target.value);
    };

    const countWords = (text) => {
        const words = text.trim().split(/\s+/);
        return words.filter(word => word !== '').length;
    };

    return (
        <div className='bg-black text-[#00DDFF] h-full flex justify-center flex-col items-center'>
            <textarea
                value={text}
                onChange={handleTextChange}
                placeholder="Type something..."
                className='w-[90%] sm:w-1/2 sm:min-w-[550px] h-[300px] outline-none border  bg-slate-700 border-gray-300 p-2 rounded-md'
            />
            <div className='flex gap-6 mt-3  sm:text-xl'>
                <p>Word count: {countWords(text)}</p>
                <p>Char count: {text.length}</p>
            </div>
        </div>
    );
};

export default Counter;
