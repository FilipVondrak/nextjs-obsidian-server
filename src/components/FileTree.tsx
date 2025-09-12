import { generateFolderStructure} from "@/app/lib/notes";
import Link from "next/link";
import { FileText} from "lucide-react"
import FolderNode from "@/components/FolderNode"
import TreeItem from "@/components/TreeItem";
export type TreeNode = {
  name: string;
  path: string;
  type: "file" | "folder";
  children?: TreeNode[];
};

const treeData: TreeNode = await generateFolderStructure("maturita");



export default function FileTree() {
    return (
        <ul className={"flex flex-col text-text p-2 gap-1"}>
            {
                treeData.children?.map((child, idx) => (
                    <TreeItem key={idx} node={child} />
                ))
            }
        </ul>
    )
}