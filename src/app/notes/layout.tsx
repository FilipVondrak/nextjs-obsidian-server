import FileTree from "@/components/FileTree";
import NoteSearch from "@/components/NoteSearch"

export default function NotesLayout({children,}: Readonly<{ children: React.ReactNode; }>) {
    return (
        <div className="grid grid-cols-[minmax(200,1fr)_3fr_minmax(200,1fr)] grid-rows-[auto_1fr] grow">
            <div className="row-auto col-span-3 bg-primary border-b-1 border-secondary hidden h-[2rem]">

            </div>

            <aside className={"row-start-2 bg-primary border-r-1 border-secondary"}>
                <NoteSearch/>
                <hr className={"text-secondary"}/>
                <FileTree/>
            </aside>

            <div className={"row-start-2 flex"}>
                <main className={"row-start-2 max-h-screen overflow-y-auto p-4"}>
                    {children}
                </main>
            </div>

            <aside className={"row-start-2 bg-primary border-l-1 border-secondary flex-col"}>
                <h1 className={"text-center text-2xl font-bold"}>Sidebar</h1>
            </aside>
        </div>
    )
}