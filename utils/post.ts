import { parse } from "frontmatter";

export interface Post {
  id: string;
  title: string;
  published: Date;
  snippet: string;
  content: string;
}

export async function loadPost(id: string): Promise<Post | null> {
  let text: string;
  try {
    text = await Deno.readTextFile(`./data/posts/${id}.md`);
  } catch (error) {
    if (error instanceof Deno.errors.NotFound) {
      return null;
    }
    throw error;
  }

  // TODO add types validation
  const { data, content } = parse(text);
  const { title, published, snippet } = data as Record<string, string>;

  return {
    id,
    title,
    published: new Date(published),
    snippet,
    content,
  };
}
