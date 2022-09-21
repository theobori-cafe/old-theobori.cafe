import fs from "fs";
import matter from "gray-matter";

export type PostMetadata = {
  slug?: string,
  title: string,
  description: string,
  updatedAt: string,
  categories : string[],
  author :string
};
  
export type PostData = PostMetadata & {
  content: string
};

function getPosts(): PostData[] {
  const files = fs.readdirSync("content/posts");
  const posts = files.map(filename => {
    const post = fs
      .readFileSync("content/posts/" + filename)
      .toString();
  
    const { data, content } = matter(post);

    return {
      ...data,
      slug: filename.replace(".md", ""),
      content
    };
  });

  return posts as PostData[];
}

export default getPosts;
