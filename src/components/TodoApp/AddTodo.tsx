import { useState } from 'react';

function AddTodo({
    createTodo,
}: {
    createTodo: (title: string) => Promise<void>;
}) {
    const [value, setValue] = useState('');
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        await createTodo(value);
        setValue('');
    };
    return (
        <form
            className="flex w-full items-center gap-2"
            onSubmit={handleSubmit}
        >
            <input
                type="text"
                className="grow rounded-md border px-4 py-2"
                placeholder="Add a todo..."
                value={value}
                onChange={(e) => setValue(e.target.value)}
            />
            <button className="rounded bg-sky-600 px-4 py-2 text-white">
                Add
            </button>
        </form>
    );
}

export default AddTodo;
