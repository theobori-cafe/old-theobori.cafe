import fs from "fs";
import matter from "gray-matter";
import type { GetStaticProps, NextPage } from "next";

import NavBar from "../components/NavBar";
import PostPreview from "../components/PostPreview";
import { Frontmatter } from "../components/PostPreview";

type Post = {
  slug: string,
  frontmatter: Frontmatter
};

type Props = {
  posts: Post[];
};

const PostsPage: NextPage<Props> = ({ posts }) => {
  return (
    <div>
      <NavBar />

      <div className="mx-auto max-w-[40%]">
        {posts.map(({ frontmatter, slug }) => (
          <div key={frontmatter.title} className="my-4">
            <PostPreview
              key={frontmatter.title}
              frontmatter={frontmatter}
              slug={slug}
            />
          </div>
        ))}
      </div>
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
    // Formatting current date
    const frontmatter = {
      ...data,
      date: new Date().toLocaleDateString(
        "en-US",
        { 
          year: "numeric",
          month: "long",
          day: "numeric"
        }
      )
    };

    return {
      slug: filename.replace(".md", ""),
      frontmatter,
    };
  });

  return {
    props: {
      posts
    },
  };
};

export default PostsPage;
