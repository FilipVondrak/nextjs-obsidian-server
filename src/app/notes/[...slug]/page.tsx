import { getPostData } from "@/app/lib/notes";
import { notFound } from "next/navigation";
import Markdown from 'react-markdown'
import remarkGfm from "remark-gfm";
//import 'github-markdown-css'
import "./note-style.css"
import rehypeHighlight from "rehype-highlight";

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
    noteData = await getPostData(decodeURI(path));
  } catch (err) {
    // File not found or fs error
    return notFound();
  }

  return (
      <article className={"h-full w-full text-text"}>
          <div className={"flex flex-col gap-2"}>
              {
                  // displays either the title if set otherwise the file name
                  noteData.title ?
                      <>
                          <h1 className={"text-center text-accent font-bold text-4xl"}>{noteData.title}</h1>
                          <p className={"italic text-center text-sm"}>{noteData.fileName}</p>
                      </> : <h1 className={"text-center text-accent font-bold text-4xl"}>{noteData.fileName}</h1>
              }
              <hr className={"text-secondary"}/>
          </div>
          <br />

          {
              <div className={"prose dark:prose-invert max-w-none prose-blue prose-headings:underline text-text"}>
                  <Markdown
                      remarkPlugins={[remarkGfm]}
                      rehypePlugins={[rehypeHighlight]}
                  >
                      { noteData.contentHtml}
                  </Markdown>
              </div>
          }
      </article>
  )
}