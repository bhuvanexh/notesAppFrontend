import React, { useState } from 'react'

export const TodoForm = ({ addTodo }) => {
    const [value, setValue] = useState('');

    const handleClick = () => {
        if (value) {
            addTodo(value);
            setValue('');
        }
    };
    return (
        <>
            <div className='mb-4 flex w-full'>
                <input type="text" value={value} onChange={(e) => setValue(e.target.value)} className="bg-transparent outline-none border sm:text-lg flex-grow px-2 py-1 rounded-l-md" placeholder='What is the task today?' />
                <button type="submit" onClick={handleClick} className='bg-[#8758ff] border border-[#8758ff] py-1 px-1 sm:px-2 sm:text-lg rounded-r-md'>Add Task</button>
            </div>
        </>
    )
}