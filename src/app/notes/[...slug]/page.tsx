import { getPostData } from "@/app/lib/notes";
import { notFound } from "next/navigation";
import Markdown from 'react-markdown'
import remarkGfm from "remark-gfm";
//import 'github-markdown-css'
import "./note-style.css"

export async function generateStaticParams() {
    return [
        { slug: ['hello'] },
        { slug : ['my-second-post'] },
    ];
}

export default async function Page({ params }: { params: Promise<{ slug: string[] }> }) {
  const path: string = await params
      .then((params) => params.slug.join("/"));

  let noteData: any;
  try {
    noteData = await getPostData(path);
  } catch (err) {
    // File not found or fs error
    return notFound();
  }

  return (
      <article className={"h-full w-full text-text"}>

          <div>Post path: {path}</div>
          <div>Post data: {noteData.title}</div>
          <br />
          {
              <div className={"prose dark:prose-invert max-w-none prose-blue prose-headings:underline text-text"}>
                  <Markdown remarkPlugins={[remarkGfm]}>
                      { noteData.contentHtml}
                  </Markdown>
              </div>
          }
      </article>
  )
}