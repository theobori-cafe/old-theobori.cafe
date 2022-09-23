import Link from "next/link";
import { FunctionComponent } from "react";

import { PostData } from "../lib/posts";

type PostCategoryProps = {
  categories: string[]
};

const PostCategories: FunctionComponent<PostCategoryProps> = ({ categories }) => {
  return (
    <div className="flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-3">
      {
        categories.map(category => {
          return (
            <a
              key={category}
              href={"/posts/category/" + category.toLowerCase()}
              className="text-blue-500 hover:underline underline-offset-4"
            >
              {category}
            </a>
          );
        })
      }
    </div>
  );
};

type PostPreviewProps = {
  post: PostData
};

const PostPreview: FunctionComponent<PostPreviewProps> = ({ post }) => {
  return (
    <article key={post.slug}>
      <header>
        <Link href={"/post/[slug]"} as={`/post/${post.slug}`}>
          <a className="text-2xl font-bold text-slate-900 hover:underline underline-offset-4">
            {post.title}
          </a>
        </Link>
  
        <div className="text-sm italic text-slate-500">
          {post.updatedAt}
        </div>

        <PostCategories categories={post.categories} />
      </header>
  
      <section>
        <p>
          {post.description}
        </p>
      </section>
    </article>
  );
};

export default PostPreview;
