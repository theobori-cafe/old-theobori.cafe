import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { ParsedUrlQuery } from "querystring";
import fs from "fs";
import matter from "gray-matter";

import PostPreview from "../../../components/PostPreview";

import { PostMetadata } from "../../../lib/post";
import NavBar from "../../../components/NavBar";

type Props = {
  posts: PostMetadata[],
  category: string
};

const CategoryPage: NextPage<Props> = ({ posts, category }) => {
  return (
    <div>
      <div className="text-2xl font-bold my-4 text-blue-500">
        {category.charAt(0).toUpperCase() + category.slice(1)}
      </div>
      {
        posts.map(post => {
          return (
            <PostPreview 
              key={post.title}
              frontmatter={post}
              slug={post.slug as string}
            />
          );
        })
      }
    </div>
  );
};

type staticPath = {
  params: {
      name: string;
  };
}[];

export const getStaticPaths: GetStaticPaths = async () => {
  const files = fs.readdirSync("content/posts");
  let names: staticPath = [];
  
  files.map(filename => {
    const post = fs
      .readFileSync("content/posts/" + filename)
      .toString();
  
    const { data } = matter(post);

    // Iterate over a post categories string[]
    // And adding them to names
    for (const category of data.categories) {
      const staticpath = {
        params: {
          name: category.toLowerCase()
        }
      };

      if (names.includes(staticpath) === true)
        continue;

      names.push(staticpath);
    }
  });
  
  return {
    paths: names,
    fallback: false
  };
};

interface IParams extends ParsedUrlQuery {
  name: string
}

export const getStaticProps: GetStaticProps<Props> = async (context) => {
  const { name } = context.params as IParams;

  const files = fs.readdirSync("content/posts");
  let posts: PostMetadata[] = [];

  files.map(filename => {
    const post = fs
      .readFileSync("content/posts/" + filename)
      .toString();
  
    const { data } = matter(post);
    const categories = data.categories.map(
      (c: string) => c.toLowerCase()
    );

    // Iterate over a post categories PostData[]
    // And adding them to posts
    if (categories.includes(name)) {
      const postdata = data as PostMetadata;

      postdata.slug = filename.replace(".md", "");

      posts.push(postdata);
    }
  });

  return {
    props: {
      posts,
      category: name
    }
  };
};

export default CategoryPage;
