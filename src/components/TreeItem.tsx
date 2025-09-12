'use client'
import FolderNode from "@/components/FolderNode";
import {FileText} from "lucide-react";
import Link from "next/link";
import {TreeNode} from "@/components/FileTree";

export default function TreeItem({ node }: { node: TreeNode }) {
    //const [open, setOpen] = useState(false);
    const isFolder = node.type === "folder";
    const itemLink = isFolder ? node.name : `/notes/maturita/${node.name}`;

    return (
        <li>
            {isFolder ?
                <FolderNode node={node}/>
                :
                <Link href={node.path} className={"flex flex-row items-center justify-start gap-2 cursor-default hover:bg-secondary rounded-r-2xl"}>
                    <FileText/>
                    <p>{node.name}</p>
                </Link>
            }
        </li>
    )
}