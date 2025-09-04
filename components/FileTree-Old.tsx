// components/FileTree.tsx
"use client";
import { useState } from "react";
import Link from "next/link";
//import { ChevronRight, ChevronDown } from "lucide-react";

type TreeNode = {
  name: string;
  children?: TreeNode[];
};

const treeData: TreeNode[] = [
  {
    name: "Škola",
    children: [
      { name: "Čeština" },
      { name: "Fyzika-Elektrotechnika" },
      {
        name: "Hardware",
        children: [
          { name: "IEL" },
          { name: "INC" }
        ]
      },
      {
        name: "IT",
        children: [
          { name: "Bezdrátové sítě" },
          {
            name: "Grafika",
            children: [
              { name: "Aditivní a subtraktivní míchání ba..." },
              { name: "Barycentrické souřadnice" },
              { name: "Kladný a záporný poloprostor při..." },
              { name: "Křivky v počítačové grafice" },
              { name: "Midpoint algoritmus" },
              { name: "Rasterizace objektů ve 2D" },
              { name: "Rastrová grafika" },
              { name: "Redukce barevného prostoru" },
              { name: "Transformace ve 2D a 3D grafice" },
              { name: "Vektorová grafika" },
              { name: "Vyplňování 2D oblastí" }
            ]
          }
        ]
      }
    ]
  }
];

const TreeItem = ({ node }: { node: TreeNode }) => {
  const [open, setOpen] = useState(false);
  const hasChildren = node.children && node.children.length > 0;

  return (
    <div className="ml-4">
      <div
        className="flex items-center cursor-pointer select-none hover:opacity-80"
        onClick={() => hasChildren && setOpen(!open)}
      >
        {hasChildren ? (

          open ? (
              <>
                  <div className="w-4 h-4 mr-1 text-center" >◠</div>
                  <span >{node.name}</span>
              </>
          ) : (
              <>
                  <div className="w-4 h-4 mr-1 text-center" >◡</div>
                  <span>{node.name}</span>
              </>
          )
        ) : (
            <>
                <span className="w-4 h-4 mr-1 text-center "> ○  </span>
                <Link href={"/notes/"+node.name} className={"text-nowrap"}>{node.name}</Link>
            </>
        )}

      </div>
      {open && hasChildren && (
  <div className="ml-4 border-l border-gray-600">
    {node.children!.map((child, idx) => (
      <TreeItem key={idx} node={child} />
    ))}
  </div>
)}
    </div>
  );
};

export default function FileTreeOld() {
  return (
    <div className="p-4 text-sm font-medium">
      {treeData.map((node, idx) => (
        <TreeItem key={idx} node={node} />
      ))}
    </div>
  );
}
