import type { GetStaticProps, NextPage } from "next";

import PostPreview from "../components/PostPreview";
import Posts, { PostData } from "../lib/posts";
import Head from "next/head";

type Props = {
  posts: PostData[];
};

const PostsPage: NextPage<Props> = ({ posts }) => {
  return (
    <>
      <Head>
        <title>Théo Bori - Posts</title>
        <link rel="icon" href="/favicon.png" />
      </Head>
  
      {posts.map(post => (
          <div key={post.title} className="my-8">
            <PostPreview
              key={post.title}
              post={post}
            />
          </div>
      ))}
    </>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const posts = new Posts()
    .fetchPosts()
    .sortByDate()
    .getPosts();


  return {
    props: {
      posts
    },
  };
};

export default PostsPage;
