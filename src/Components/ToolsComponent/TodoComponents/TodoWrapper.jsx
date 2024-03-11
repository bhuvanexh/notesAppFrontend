import React, { useState, useEffect } from 'react'
import { TodoForm } from './TodoForm'
import { v4 as uuidv4 } from 'uuid';
import { Todo } from './Todo';
import { EditTodoForm } from './EditTodoForm';
import { MdDone } from "react-icons/md";

export const TodoWrapper = () => {
    const [todos, setTodos] = useState([])

    useEffect(() => {
        const savedTodos = JSON.parse(localStorage.getItem('todos')) || [];
        setTodos(savedTodos);
    }, []);

    const addTodo = todo => {
        const newTodos = [...todos, { id: uuidv4(), task: todo, completed: false, isEditing: false }];
        setTodos(newTodos);
        localStorage.setItem('todos', JSON.stringify(newTodos));
    }

    const toggleComplete = id => {
        const newTodos = todos.map(todo => todo.id === id ? { ...todo, completed: !todo.completed } : todo);
        setTodos(newTodos);
        localStorage.setItem('todos', JSON.stringify(newTodos));
    }

    const deleteTodo = id => {
        const newTodos = todos.filter(todo => todo.id !== id);
        setTodos(newTodos);
        localStorage.setItem('todos', JSON.stringify(newTodos));
    }

    const editTodo = id => {
        setTodos(todos.map(todo => todo.id === id ? { ...todo, isEditing: !todo.isEditing } : todo))
    }

    const editTask = (task, id) => {
        const newTodos = todos.map(todo => todo.id === id ? { ...todo, task, isEditing: !todo.isEditing } : todo);
        setTodos(newTodos);
        localStorage.setItem('todos', JSON.stringify(newTodos));
    }
    return (
        <>
            <div className='bg-black h-full flex justify-center items-start pt-20'>
                <div className='flex w-[95%] sm:w-[50%] sm:min-w-[550px] md:min-w-[650px] flex-col text-white border bg-[#34082dce] border-slate-500 p-4 items-center rounded-lg gap-3'>
                    <h1 className='text-white text-xl sm:text-2xl mb-3'>Get Things Done!</h1>
                    <TodoForm addTodo={addTodo} />
                    {todos.map((todo, index) => (
                        todo.isEditing ? (
                            <EditTodoForm key={index} editTodo={editTask} task={todo} />
                        ) : (
                            <Todo task={todo} key={index} toggleComplete={toggleComplete} deleteTodo={deleteTodo} editTodo={editTodo} />
                        )
                    ))}
                </div>
            </div>
        </>
    )
}