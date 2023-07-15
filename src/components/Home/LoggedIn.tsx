import Link from 'next/link';

type User = {
    id: string;
} & {
    name?: string | null | undefined;
    email?: string | null | undefined;
    image?: string | null | undefined;
};

const LoggedIn = ({ user }: { user: User }) => {
    return (
        <div className="inline-flex flex-col gap-2">
            <span className="text-lg ">
                Hello, {user.name ?? user.email ?? user.id}
            </span>
            <Link className="t-btn" href="/todo-app">
                Todo App
            </Link>
        </div>
    );
};

export default LoggedIn;
