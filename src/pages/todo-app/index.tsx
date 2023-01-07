import Main from '../../components/TodoApp/Main';

function Todos() {
    return (
        <div className="flex min-h-screen flex-col">
            <h2 className="text-center text-2xl font-bold">
                Here is a Todo App
            </h2>
            <hr className="h-1 border border-r-sky-400 bg-sky-400" />
            <section className="grow rounded-md border bg-slate-100 p-3">
                <Main />
            </section>
        </div>
    );
}

export default Todos;
