import React from 'react'
import { MdDeleteOutline } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
import { MdDoneAll } from "react-icons/md";
export const Todo = ({ task, deleteTodo, editTodo, toggleComplete }) => {
    return (
        <div className={`flex items-center gap-1 px-2 py-1 w-full justify-between bg-[#8758ff] rounded-md ${task.completed && 'bg-gray-700'}`}>
            <p className={`${task.completed ? "completed" : "incompleted"} sm:text-lg`}>{task.task}</p>
            <div className='flex items-center gap-2'>
                <MdDoneAll className={`text-lg hover:scale-105 hover:text-red-300 cursor-pointer ${task.completed ? "text-green-400" : "text-white"}`} onClick={() => toggleComplete(task.id)} />
                <FaRegEdit className='text-lg hover:scale-105 hover:text-red-300 cursor-pointer' onClick={() => editTodo(task.id)} />
                <MdDeleteOutline className='text-lg hover:scale-105 hover:text-red-300 cursor-pointer' onClick={() => deleteTodo(task.id)} />
            </div>
        </div>
    )
}