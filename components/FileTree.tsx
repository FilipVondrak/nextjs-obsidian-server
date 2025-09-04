import { generateFolderStructure} from "@/app/lib/notes";
import Link from "next/link";

type TreeNode = {
  name: string;
  type: "file" | "folder";
  children?: TreeNode[];
};

const treeData: TreeNode = await generateFolderStructure("maturita");

const TreeItem = ({ node }: { node: TreeNode }) => {
  //const [open, setOpen] = useState(false);
    const isFolder = node.type === "folder";
    const itemLink = isFolder ? node.name : `/notes/maturita/${node.name}`;

  return (
      <div>
          {
              isFolder ?
                  <span className={"bg-red-500"}><TreeItem key={idx} node={child} /></span>
                  :
                  <Link href={itemLink} className={"bg-blue-400"}>{node.name}</Link>
          }
      </div>
  )
}

export default function FileTree() {
    return (
        <div className={"flex flex-col"}>
            {
                treeData.children?.map((child, idx) => (
                    <TreeItem key={idx} node={child} />
                ))
            }
        </div>
    )
}