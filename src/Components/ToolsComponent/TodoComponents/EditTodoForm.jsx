import React, { useState } from 'react'
import { MdDone } from "react-icons/md";
export const EditTodoForm = ({ editTodo, task }) => {
    const [value, setValue] = useState(task.task);

    const handleClick = () => {
        editTodo(value, task.id);
    };
    return (
        <div className='flex w-full h-[35px] items-center'>
            <input type="text" value={value} onChange={(e) => setValue(e.target.value)} className="border w-full h-full bg-transparent px-2 sm:text-lg rounded-l-md" placeholder='Update task' />
            <MdDone onClick={handleClick} size={20} className='bg-[#8758ff] block w-[30px] py-2 h-full cursor-pointer rounded-r-md' />
        </div>
    )
}