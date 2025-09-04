import { getPostData } from "@/app/lib/notes";
import { notFound } from "next/navigation";


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
      <article>
          <div>Post path: {path}</div>
          <div>Post data: {noteData.title}</div>
          <br />
          {
              noteData.contentHtml
          }
      </article>
  )
}