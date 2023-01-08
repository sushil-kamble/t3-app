import type { TRPCClientErrorLike } from '@trpc/client';
import type { Todo as TodoType } from '@prisma/client';
import type { AppRouter } from '../../server/trpc/router/_app';
import Todo from './Todo';

const Todos = ({
    initialLoading,
    error,
    data,
    toggleTodo,
    updateTodo,
    deleteTodo,
}: {
    initialLoading: boolean;
    error: TRPCClientErrorLike<AppRouter> | null;
    data: TodoType[] | undefined;
    updateTodo: (id: number, title: string) => Promise<void>;
    toggleTodo: (id: number) => Promise<void>;
    deleteTodo: (id: number) => Promise<void>;
}) => {
    if (initialLoading) {
        return <div>Loading...</div>;
    }
    if (error) {
        return <div>{error.message}</div>;
    }
    if (!data) {
        return <div>No todos</div>;
    }
    return (
        <div>
            {data.map((todo) => (
                <Todo
                    key={todo.id}
                    todo={todo}
                    toggleTodo={toggleTodo}
                    updateTodo={updateTodo}
                    deleteTodo={deleteTodo}
                />
            ))}
        </div>
    );
};

export default Todos;
