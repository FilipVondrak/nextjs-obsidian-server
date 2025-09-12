'use client'
import { FolderOpen, FolderClosed, FolderXIcon } from "lucide-react"
import {useState} from "react";
import { TreeNode } from "@/components/FileTree"
import TreeItem from "@/components/TreeItem";


export default function FolderNode({ node }: {node: TreeNode}) {
    const [isOpen, setOpen] = useState(true);
    const isEmpty = node.children?.length === 0;

    return (
        <div className={"flex flex-col gap-2"}>
            {/* icon and folder name */}
            <div className={"flex flex-row gap-2 cursor-pointer w-fit"} onClick={() => setOpen(!isOpen)}>
                {
                    isEmpty ? <FolderXIcon /> :
                        isOpen ? <FolderOpen/> : <FolderClosed />
                }
                <p>{node.name}</p>
            </div>

            {/* child items */}
            <div className={"flex justify-end"}>
                <ul className={"center w-[98%] border-l-1 border-text pl-2"}>
                    {
                        !isEmpty &&
                        <>
                        {
                            node.children?.map((node: TreeNode, index: number) => (
                                <TreeItem node={node} key={index}/>
                            ))
                        }
                        </>
                    }
                </ul>
            </div>
        </div>
    )
}