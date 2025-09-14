'use client'
import { generateFolderStructure} from "@/app/lib/notes";
import Link from "next/link";
import { FileText} from "lucide-react"
import FolderNode from "@/components/FolderNode"
import TreeItem from "@/components/TreeItem";
import {useEffect, useState} from "react";
import { usePathname } from "next/navigation";

export type TreeNode = {
  name: string;
  path: string;
  type: "file" | "folder";
  children?: TreeNode[];
};





export default function FileTree() {
    const pathName = usePathname();
    const[rootNode, setRootNode] = useState<TreeNode>()
    useEffect(() => {
        const vaultName = pathName.split("/")[2];
        getFileTree(vaultName).then(n => setRootNode(n));
    }, [])

    async function getFileTree(vaultName: string) {
        return await fetch(`/api/filetree/${vaultName}`).then(res => res.json())
    }

    return (
        <ul className={"flex flex-col text-text p-2 pl-0 gap-1 h-full overflow-y-auto"}>
            {
                rootNode?.children?.map((child, idx) => (
                    <TreeItem key={idx} node={child} />
                ))
            }
        </ul>
    )
}