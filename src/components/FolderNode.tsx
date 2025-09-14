'use client'
import { FolderOpen, FolderClosed, FolderXIcon } from "lucide-react"
import {useState} from "react";
import { TreeNode } from "@/components/FileTree"
import TreeItem from "@/components/TreeItem";
import Link from "next/link";


export default function FolderNode({ node }: {node: TreeNode}) {
    const [isOpen, setOpen] = useState(true);
    const isEmpty = node.children?.length === 0;

    return (
        <div className={"flex flex-col gap-2"}>
            {/* icon and folder name */}
            <div className={"flex flex-row gap-2 hover:bg-secondary rounded-r-2xl select-none"} onClick={() => setOpen(!isOpen)}>
                {
                    isEmpty ? <FolderXIcon /> :
                        isOpen ? <FolderOpen/> : <FolderClosed />
                }
                <p className={"select-none"}>{node.name}</p>
            </div>

            {/* child items */}
            {
            !isEmpty && isOpen &&
            <div className={"flex justify-end"}>
                <ul className={"center w-[98%] border-l-1 border-text/20 pl-2 gap-2 flex flex-col"}>
                    <>
                        {
                            node.children?.map((node: TreeNode, index: number) => (
                                <TreeItem node={node} key={index}/>
                            ))
                        }
                    </>
                </ul>
            </div>
            }
        </div>
    )
}