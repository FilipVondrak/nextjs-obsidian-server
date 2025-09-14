import FileTree from "@/components/FileTree";
import NoteSearch from "@/components/NoteSearch"

export default function NotesLayout({children,}: Readonly<{ children: React.ReactNode; }>) {
    return (
        <div className="grid h-full w-full grid-cols-[minmax(200px,1fr)_3fr_minmax(200px,1fr)] grid-rows-[auto_1fr] overflow-hidden">
            <div className="row-auto col-span-3 bg-primary border-b-1 border-secondary hidden h-[2rem]">

            </div>

            <aside className={"row-start-2 bg-primary border-r-1 border-secondary flex flex-col h-full overflow-hidden"}>
                <NoteSearch/>
                <hr className={"text-secondary"}/>
                <div className={"h-full overflow-hidden"}>
                    <FileTree/>
                </div>
            </aside>

            <div className="row-start-2 flex h-full w-full overflow-y-auto">
                <main className="flex h-full w-full justify-center p-4">
                    <div className="h-full w-full max-w-[800px]">
                        { children }
                    </div>
                </main>
            </div>

            <aside className={"row-start-2 bg-primary border-l-1 border-secondary flex-col"}>
                <h1 className={"text-center text-2xl font-bold"}>Sidebar</h1>
            </aside>
        </div>
    )
}