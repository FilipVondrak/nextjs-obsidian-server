import { getPostData } from "@/app/lib/notes";

export default async function Page({ params }: { params: Promise<{ slug: string[] }> }) {
  const path: string = await params
      .then((params) => params.slug.join("/"));
  const noteData: any = await getPostData(path);

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