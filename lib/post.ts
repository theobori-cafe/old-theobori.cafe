import fs from "fs";
import matter from "gray-matter";

import { PostData } from "./posts";

class Post {
  data: PostData;

  private path: string;

  constructor(path: string) {
    this.data = {} as PostData;

    this.path = path;
  }

  get(path?: string): PostData {
    path = path || this.path;
    const post = fs
      .readFileSync(path)
      .toString();

    const name = path
      .split("/")
      .slice(-1)[0]
      .split(".")[0];

    const { data, content } = matter(post);
    const pData = {
      ...data,
      slug: name,
      content
    } as PostData;


    return pData;
  };
}

export default Post;
