import fs from 'fs';
import * as fsp from 'fs/promises';
import path from 'path';
import matter from 'gray-matter';
import {Stats} from "node:fs";

const notesDirectory = path.join(process.cwd(), 'obsidian-vaults/notes');

export function getSortedPostsData() {
  // Get file names under /posts
  const fileNames = fs.readdirSync(notesDirectory);
  const allPostsData = fileNames.map((fileName) => {
    // Remove ".md" from file name to get id
    const id = fileName.replace(/\.md$/, '');

    // Read markdown file as string
    const fullPath = path.join(notesDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');

    // Use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents);

    // Combine the data with the id
    return {
      id,
      ...matterResult.data,
    };
  });
  // Sort posts by date
  return allPostsData.sort((a:any, b:any) => {
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  });
}

export async function getPostData(id: any) {
  const fullPath = path.join(notesDirectory, `${id}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  let fileName: string = fullPath.substring(fullPath.lastIndexOf('/') + 1);

  // Use gray-matter to parse the post metadata section
  const matterResult = matter(fileContents);
  let contentHtml = matterResult.content;

  /*
  // Use remark to convert markdown into HTML string
  const processedContent = await remark()
    .use(html)
    .process(matterResult.content);
  const contentHtml = processedContent.toString();
  */

    // Combine the data with the id
  return {
      id,
      fileName,
      contentHtml,
    ...matterResult.data,
  };
}

type TreeNode = {
  name: string;
  path: string;
  type: "file" | "folder";
  children?: TreeNode[];
};

function sortFolderNodeChildren(nodes: TreeNode[]):TreeNode[] {
    if(nodes.length < 2) {
        return nodes;
    }

    // 1. Separate children into folders and files
    const folders = nodes.filter((child: TreeNode) => child.type === "folder");
    const files = nodes.filter((child: TreeNode) => child.type === "file");

    // 2. Sort both arrays alphabetically by the 'name' property
    folders.sort((a, b) => a.name.localeCompare(b.name));
    files.sort((a, b) => a.name.localeCompare(b.name));

    // 3. (Optional) Combine them back and update the original node
    // This will place all sorted folders before all sorted files.
    return [...folders, ...files];
}

async function readFolderContents(folderPath: string, rootNode: TreeNode) {
    let basePath: string = path.join(notesDirectory, folderPath);
    let fileNames: string[] = await fsp.readdir(basePath);

    const children:TreeNode[] = [];

    for (let filename of fileNames) {
            let stats: Stats = await fsp.stat(path.join(basePath, filename));

            let fpath = [rootNode.path, filename].join('/');

            if(stats.isDirectory()) {
                children.push({name: filename, type: "folder", children: [], path: fpath});
                const currentNode = children[children.length-1];

                currentNode.children = sortFolderNodeChildren(
                    await readFolderContents(path.join(folderPath, filename), currentNode)
                );
            }

            else {
                fpath = fpath.slice(0,-3);
                children.push({name: filename, type: "file", children: [], path: fpath});
            }
    }
    return children;
}

export async function generateFolderStructure(folderPath: string) {
    let rootNode: TreeNode = {name: folderPath, type: "folder", children: [], path: '/notes/' + folderPath};
    rootNode.children = sortFolderNodeChildren(await readFolderContents(folderPath, rootNode));
    return rootNode;
}