import NavBar from "../components/NavBar";
import PostPreview from "../components/PostPreview";
import { Frontmatter } from "../components/PostPreview";

import fs from "fs";
import matter from "gray-matter";

type Post = {
  slug: string,
  frontmatter: Frontmatter
};

const PostsPage = ({ posts }: { posts: Post[] }) => {
  return (
    <div>
      <NavBar />

      <div className="mx-auto max-w-[40%]">
      
        {posts.map(({ frontmatter: { title, description, date } }) => (
          <PostPreview
            key={title}
            title={title}
            description={description}
            date={date}
          />
        ))}
      </div>
    </div>
  );
};

export async function getStaticProps() {
  const dirPath = "content/posts";
  const files = fs.readdirSync(dirPath);

  const posts = files.map((filename: string) => {
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
}

export default PostsPage;
