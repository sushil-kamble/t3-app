import Todos from './Todos';
import { trpc } from '../../utils/trpc';
import AddTodo from './AddTodo';
import { signIn, useSession } from 'next-auth/react';

function Main() {
    const {
        isLoading: initialLoading,
        data,
        refetch,
        error,
    } = trpc.todo.getAll.useQuery();
    const { data: sessionData } = useSession();
    const createMutation = trpc.todo.create.useMutation();
    const toggleMutation = trpc.todo.toggle.useMutation();
    const updateMutation = trpc.todo.update.useMutation();
    const deleteMutation = trpc.todo.delete.useMutation();
    const createTodo = async (title: string) => {
        await createMutation.mutateAsync({ title });
        await refetch();
    };
    const toggleTodo = async (id: number) => {
        await toggleMutation.mutateAsync({ id });
        await refetch();
    };
    const updateTodo = async (id: number, title: string) => {
        await updateMutation.mutateAsync({ id, title });
        await refetch();
    };
    const deleteTodo = async (id: number) => {
        await deleteMutation.mutateAsync({ id });
        await refetch();
    };

    return (
        <div className="mx-auto flex h-[80vh] w-full flex-col rounded-xl bg-sky-100 shadow-sm md:p-4 lg:w-[90vw] xl:w-[50vw]">
            {/* TODO INPUT */}
            <AddTodo createTodo={createTodo} />
            {/* TODO INPUT */}

            {/* TODO ITEMS */}
            <div className="mt-2 grow overflow-y-auto rounded bg-white p-2">
                {sessionData ? (
                    // LOGGED IN VIEW
                    <Todos
                        initialLoading={initialLoading}
                        error={error}
                        data={data}
                        toggleTodo={toggleTodo}
                        updateTodo={updateTodo}
                        deleteTodo={deleteTodo}
                    />
                ) : (
                    // LOGGED OUT VIEW
                    <>
                        <button
                            onClick={() => signIn()}
                            className="my-auto w-full break-all rounded-lg bg-sky-600 py-2 text-white"
                        >
                            Login
                        </button>
                    </>
                )}
            </div>
            {/* TODO ITEMS */}
        </div>
    );
}

export default Main;
