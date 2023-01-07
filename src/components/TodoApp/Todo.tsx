import { Todo } from '@prisma/client';
import { useMemo, useState } from 'react';
const Todo = ({
    todo,
    toggleTodo,
    updateTodo,
    deleteTodo,
}: {
    todo: Todo;
    toggleTodo: (id: number) => Promise<void>;
    updateTodo: (id: number, title: string) => Promise<void>;
    deleteTodo: (id: number) => Promise<void>;
}) => {
    const [editTodo, setEditTodo] = useState(false);
    const [inputValue, setInputValue] = useState(todo.title);
    const isTodoTitleSameAsInputValue = useMemo(() => {
        return todo.title === inputValue;
    }, [todo.title, inputValue]);

    const handleEditClick = async () => {
        if (!isTodoTitleSameAsInputValue) {
            await updateTodo(todo.id, inputValue);
            setEditTodo(false);
            return;
        }
        setEditTodo((prev) => !prev);
    };

    return (
        <div className="flex items-center justify-between gap-4 rounded-md py-1 px-4 transition duration-300 ease-in-out hover:bg-slate-100">
            <div className="grow">
                {editTodo ? (
                    <input
                        type="text"
                        autoFocus
                        className="w-full pl-2"
                        defaultValue={todo.title}
                        onBlur={() => setEditTodo(false)}
                        onChange={(e) => setInputValue(e.target.value)}
                        onKeyUp={(e) => {
                            if (e.key === 'Enter') {
                                handleEditClick();
                            }
                        }}
                        tabIndex={0}
                    />
                ) : (
                    <h2 className="ml-2">{todo.title}</h2>
                )}
            </div>
            <div className="flex items-center gap-4">
                <button
                    className="rounded-md bg-sky-400 px-4 py-1 text-white shadow-md"
                    onClick={handleEditClick}
                >
                    {editTodo
                        ? `${isTodoTitleSameAsInputValue ? 'Cancel' : 'Save'}`
                        : 'Edit'}
                </button>
                <button
                    className="rounded-md  px-4 py-1  shadow-md"
                    onClick={() => toggleTodo(todo.id)}
                >
                    {todo.completed ? '✅' : '❌'}
                </button>
                <button
                    className="rounded-md  px-4 py-1  shadow-md"
                    onClick={() => deleteTodo(todo.id)}
                >
                    🗑️
                </button>
            </div>
        </div>
    );
};
export default Todo;
