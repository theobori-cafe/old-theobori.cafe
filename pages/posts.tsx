import fs from "fs";
import matter from "gray-matter";
import type { GetStaticProps, NextPage } from "next";

import PostPreview from "../components/PostPreview";
import { PostMetadata } from "../lib/post";

type Post = {
  slug: string,
  frontmatter: PostMetadata
};

type Props = {
  posts: Post[];
};

const PostsPage: NextPage<Props> = ({ posts }) => {
  return (
    <div>
      {posts.map(({ frontmatter, slug }) => (
          <div key={frontmatter.title} className="my-8">
            <PostPreview
              key={frontmatter.title}
              frontmatter={frontmatter}
              slug={slug}
            />
          </div>
      ))}
    </div>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const dirPath = "content/posts";
  const files = fs.readdirSync(dirPath);

  const posts = files.map(filename => {
    const content = fs
      .readFileSync(dirPath + "/" + filename)
      .toString();
    
    const { data } = matter(content);

    return {
      slug: filename.replace(".md", ""),
      frontmatter: data,
    };
  });

  return {
    props: {
      posts
    },
  };
};

export default PostsPage;
