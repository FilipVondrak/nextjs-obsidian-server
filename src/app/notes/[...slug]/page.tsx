import { getPostData } from "@/app/lib/notes";

export default async function Page({ params }: { params: Promise<{ slug: string[] }> }) {
  const { slug } = await params;
  const path: string = slug.join("/");
  const noteData: any = getPostData(path);

  return (
      <article>
          <div>Post path: {path}</div>
          <div>Post data: {noteData.title}</div>
      </article>
  )
}