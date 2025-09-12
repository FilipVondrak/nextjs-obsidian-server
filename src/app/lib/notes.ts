import fs from 'fs';
import * as fsp from 'fs/promises';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';
import {Stats} from "node:fs";
import {resolveAppleWebApp} from "next/dist/lib/metadata/resolvers/resolve-basics";
import {base} from "next/dist/build/webpack/config/blocks/base";

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

export function getAllPostIds() {
    /*
  const fileNames = fs.readdirSync(notesDirectory);

  // Returns an array that looks like this:
  // [
  //   {
  //     params: {
  //       id: 'ssg-ssr'
  //     }
  //   },
  //   {
  //     params: {
  //       id: 'pre-rendering'
  //     }
  //   }
  // ]
  return fileNames.map((fileName) => {
    return {
      params: {
        id: fileName.replace(/\.md$/, ''),
      },
    };
  });

     */
    return [ { params: { id: 'pre-rendering' } }, { params: { id: 'ssg-ssr' } } ]
}

export async function getPostData(id: any) {
  const fullPath = path.join(notesDirectory, `${id}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');

  // Use gray-matter to parse the post metadata section
  const matterResult = matter(fileContents);

  // Use remark to convert markdown into HTML string
  const processedContent = await remark()
    .use(html)
    .process(matterResult.content);
  const contentHtml = processedContent.toString();

  // Combine the data with the id
  return {
      id,
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

async function readFolderContents(folderPath: string, rootNode: TreeNode) {
    let basePath: string = path.join(notesDirectory, folderPath);
    let fileNames: string[] = await fsp.readdir(basePath);

    for (let filename of fileNames) {
            let stats: Stats = await fsp.stat(path.join(basePath, filename));

            let fpath = '/notes/' + [rootNode.path, filename].join('/');

            if(stats.isDirectory()) {
                rootNode.children?.push({name: filename, type: "folder", children: [], path: fpath});
                await readFolderContents(path.join(folderPath, filename), rootNode.children![rootNode.children!.length-1]);
            }

            else {
                fpath = fpath.slice(0,-3);
                rootNode.children?.push({name: filename, type: "file", children: [], path: fpath});
            }
    }
}

export async function generateFolderStructure(folderPath: string) {
    let rootNode: TreeNode = {name: folderPath, type: "folder", children: [], path: folderPath};
    await readFolderContents(folderPath, rootNode);
    return rootNode;
}