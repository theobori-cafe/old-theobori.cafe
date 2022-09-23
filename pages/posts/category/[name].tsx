import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { ParsedUrlQuery } from "querystring";

import PostPreview from "../../../components/PostPreview";
import Posts, { PostData } from "../../../lib/posts";

type Props = {
  posts: PostData[],
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
              post={post}
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
};

export const getStaticPaths: GetStaticPaths = async () => {
  let names: staticPath[] = [];
  const posts = new Posts()
    .fetchPosts()
    // .sortByDate()
    .getPosts();
  
  for (const post of posts) {
    for (const category of post.categories) {
      const staticpath = {
        params: {
          name: category.toLowerCase()
        }
      };

      if (names.includes(staticpath) === true)
        continue;
  
      names.push(staticpath);
    }
  }
  
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
  
  let postsProps = [];

  const posts = new Posts()
    .fetchPosts()
    // .sortByDate()
    .getPosts();
  

  for (const post of posts) {
    const categories = post.categories.map(
      (c: string) => c.toLowerCase()
    );

    // Iterate over a post categories PostData[]
    // And adding them to posts
    if (categories.includes(name)) {
      postsProps.push(post);
    }
  }

  return {
    props: {
      posts: postsProps,
      category: name
    }
  };
};

export default CategoryPage;
