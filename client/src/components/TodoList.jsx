import React, { useContext, useEffect, useState } from 'react'
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { todos } from '../context/TodoProvider';
import axios from 'axios';


const TodoList = () => {

    const URL = "http://localhost:8080";
    const { todoArray, setTodoArray } = useContext(todos);

    const getAllTodos = () => {
        axios
            .get(URL)
            .then(({ data }) => {
                setTodoArray(data);
            })
    }

    useEffect(() => {
        getAllTodos()
    }, [])

    const [inputData, setInputData] = useState('');
    const [myId, setMyId] = useState();
    const [toggleSubmit, setToggleSubmit] = useState(true);

    const addItem = () => {
        if (inputData !== '') {
            axios
                .post(`${URL}/addTodo`, { text: inputData })
                .then((data) => {
                    console.log(data);
                    getAllTodos()
                    setInputData('');
                })
        }
    }
    const deleteItem = (_id) => {
        axios
            .post(`${URL}/delTodo`, { _id })
            .then((data) => {
                console.log(data);
                getAllTodos()
            })
    }

    const submitEditedItem = () => {
        axios
            .post(`${URL}/updateTodo`, { _id: myId, text: inputData })
            .then((data) => {
                console.log(data);
                getAllTodos();
                setInputData('');
                setToggleSubmit(true);
            })
    }

    const editItem = (id) => {
        const requiredObj = todoArray.filter((item) => {
            const { _id } = item;
            return _id == id;
        })[0];
        setInputData(requiredObj.text);
        setMyId(requiredObj._id);
        setToggleSubmit(false);
    }


    return (
        <>
            <div className='main_container'>
                <div className='todo_container'>
                    <div className="input_row">
                        <input
                            className='input_field'
                            value={inputData}
                            type="text"
                            placeholder='Enter Your Task'
                            onChange={(e) => setInputData(e.target.value)}
                            onKeyDown={(e) => {
                                if (toggleSubmit) {
                                    if (e.keyCode === 13) {
                                        addItem()
                                    }
                                }
                                else if (toggleSubmit === false) {
                                    if (e.keyCode === 13) {
                                        submitEditedItem()
                                    }
                                }

                            }}
                        />

                        {
                            toggleSubmit ? (
                                <IconButton color="primary" onClick={() => addItem()}>
                                    <AddCircleIcon />
                                </IconButton>) : (<IconButton color="primary" onClick={() => submitEditedItem()}>
                                    <EditIcon />
                                </IconButton>)
                        }
                    </div>
                    <div className="todo_list_container">
                        <h1>TODO List</h1>
                        <div className="todo_list_content">
                            {
                                todoArray?.map(({ text, _id }) => {
                                    return (
                                        <div className="todo_row" key={_id}>
                                            <p>{text}</p>
                                            <div className="todo_icons">
                                                <IconButton color="primary" onClick={() => editItem(_id)}>
                                                    <EditIcon />
                                                </IconButton>
                                                <IconButton color="primary" onClick={() => deleteItem(_id)}>
                                                    <DeleteIcon />
                                                </IconButton>
                                            </div>
                                        </div>
                                    );
                                })
                            }
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default TodoList;