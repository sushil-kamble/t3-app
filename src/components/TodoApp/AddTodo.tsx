import { signIn, useSession } from 'next-auth/react';
import { useState } from 'react';

function AddTodo({
    createTodo,
}: {
    createTodo: (title: string) => Promise<void>;
}) {
    const [value, setValue] = useState('');
    const { data: sessionData } = useSession();
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!sessionData) {
            signIn();
            setValue('');
            return;
        }
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
                {sessionData ? 'Add' : 'Login'}
            </button>
        </form>
    );
}

export default AddTodo;
