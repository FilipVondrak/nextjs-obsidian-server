'use client'
import FolderNode from "@/components/FolderNode";
import {FileText} from "lucide-react";
import Link from "next/link";
import {FolderSize, TreeNode} from "@/components/FileTree";
import { usePathname } from 'next/navigation';

export default function TreeItem({ node }: { node: TreeNode }) {
    //const [open, setOpen] = useState(false);
    const isFolder = node.type === "folder";
    const itemLink = isFolder ? node.name : `/notes/maturita/${node.name}`;
    const pathname = usePathname();

    return (
        <li>
            {isFolder ?
                <FolderNode node={node}/>
                :
                <Link href={node.path} className={
                    `${pathname == node.path ? "text-accent" : ""}
                    flex flex-row items-center justify-start gap-2 cursor-default hover:bg-secondary rounded-r-2xl transition
                }`}>
                    <div className={"flex flex-row items-center gap-2"}>
                        <FileText size={FolderSize} className={"ml-1"}/>
                        <p>{node.name}</p>
                    </div>
                </Link>
            }
        </li>
    )
}