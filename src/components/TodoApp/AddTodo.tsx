import { signIn, useSession } from 'next-auth/react';
import { useState } from 'react';

function AddTodo({
    createTodo,
}: {
    createTodo: (title: string) => Promise<void>;
}) {
    const [value, setValue] = useState('');
    const { data: sessionData } = useSession();

    // LOADING STATE
    const [createTodoLoading, setCreateTodoLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        if (createTodoLoading) {
            return;
        }
        setCreateTodoLoading(true);
        e.preventDefault();
        if (!sessionData) {
            signIn();
            setValue('');
            return;
        }
        await createTodo(value);
        setValue('');
        setCreateTodoLoading(false);
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
                {createTodoLoading ? 'Adding' : sessionData ? 'Add' : 'Login'}
            </button>
        </form>
    );
}

export default AddTodo;
