import React, { createContext, useState } from 'react';

export const todos = createContext();

const TodoProvider = ({ children }) => {

    const [todoArray, setTodoArray] = useState([]);

    return (
        <todos.Provider value={{ todoArray, setTodoArray }}>
            {children}
        </todos.Provider>
    )
}

export default TodoProvider;