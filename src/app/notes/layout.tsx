import {hidden} from "next/dist/lib/picocolors";
import FileTree from "@/components/FileTree";
import NoteSearch from "@/components/NoteSearch";

export default function NotesLayout({children,}: Readonly<{ children: React.ReactNode; }>) {
    return (
        <div className={"flex flex-col grow"}>
            <div className={"hidden"}>
                <ul className={"flex gap-4 flex-row bg-primary border-b-1 border-secondary"}>
                    <li>text</li>
                </ul>
            </div>

            <div className={"flex flex-col-reverse md:flex-row gap-4 grow"}>
                <aside className={"md:w-1/4 xl:w-1/6 bg-primary border-t-1 md:border-0 md:border-r-1 border-secondary"}>
                    <NoteSearch/>
                    <hr className={"text-secondary"}/>
                    <FileTree/>
                </aside>
                <div className={"grow flex justify-center"}>
                    <div className={"max-w-[500] overflow-scroll"}>
                        { children }
                    </div>
                </div>
                <aside className={"md:w-1/4 xl:w-1/6 bg-primary border-b-1 md:border-0 md:border-l-1 border-secondary"}>
                    <h1>Sidebar</h1>
                </aside>
            </div>
        </div>
    )
}