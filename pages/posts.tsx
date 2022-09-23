import type { GetStaticProps, NextPage } from "next";

import PostPreview from "../components/PostPreview";
import Posts, { PostData } from "../lib/posts";

type Props = {
  posts: PostData[];
};

const PostsPage: NextPage<Props> = ({ posts }) => {
  return (
    <div>
      {posts.map(post => (
          <div key={post.title} className="my-8">
            <PostPreview
              key={post.title}
              post={post}
            />
          </div>
      ))}
    </div>
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
