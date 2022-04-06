import React, { useCallback, useReducer, useRef } from 'react';
import "./TodoAssignment.css"

interface Todo {
    id: number,
    text: string
}

type ActionType =
    {
        type: "ADD",
        text: string
    } |
    {
        type: "REMOVE",
        id: number

    }

const TodoAssignment = () => {

    const reducer = (state: Todo[], action: ActionType) => {
        switch (action.type) {
            case "ADD":
                return [
                    ...state,
                    {
                        id: state.length,
                        text: action.text
                    }
                ]
            case "REMOVE":
                return state.filter(({ id }) => id !== action.id)
        }

    }

    const [todos, dispatch] = useReducer(reducer, []);

    const newTodo = useRef<HTMLInputElement>(null);

    const addNewTodo = useCallback(() => {
        if (newTodo.current) {
            dispatch({
                type: "ADD",
                text: newTodo.current?.value
            })
        }

    }, [])

    const removeTodo = useCallback((id) => {
        dispatch({
            type: "REMOVE",
            id: id

        })

    }, [])


    return (
        <div>

            <input type="text" ref={newTodo} />

            <button onClick={addNewTodo}>Add Todo</button>

            {
                todos.map((todo) => (
                    <div key={todo.id}>
                        {todo.text} <button onClick={() => removeTodo(todo.id)}>Remove Todo</button>
                    </div>
                ))
            }

        </div>
    );
};

export default TodoAssignment;