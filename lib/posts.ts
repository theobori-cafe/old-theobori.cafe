import fs from "fs";

import Post from "./post";

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

class Posts {
  private posts: PostData[];
  private directory?: string;
  ext?: string;

  constructor(
    directory: string = "content/posts/",
    ext: string = ".md"
  ) {
    this.posts = [];
    this.directory = directory;
    this.ext = ext;
  }

  setDirectory(directory: string): Posts {
    this.directory = directory;

    return this;
  }

  setExt(ext?: string): Posts {
    this.ext = ext;
    
    return this;
  }

  isPosts(): boolean {
    return this.posts.length > 0;
  }

  updatePosts(): Posts {
    this.getAll(true);
    
    return this;
  }

  fetchPosts(): Posts {
    this.getAll(true);

    return this;
  }

  getPosts(): PostData[] {
    return this.posts;
  }

  getPostsMetadata(): PostMetadata[] {
    return this.posts.map(post => {
      return post as PostMetadata;
    });
  }

  private getAll(force: boolean = false): PostData[] {
    if (this.isPosts() && force == false) {
      return this.posts;
    }

    if (this.directory === undefined) {
      return [];
    }

    const files = fs.readdirSync(this.directory);
    const posts = files.map(filename => {
      const path = this.directory + filename;

      return new Post(path).get();
    }) as PostData[];

    this.posts = posts;

    return posts;
  }

  sortByName(): Posts {
    this.posts.sort(
      (a, b) => a.title.localeCompare(b.title)
    );

    return this;
  }

  sortByDate(): Posts {
    this.posts.sort(
      (a, b) => b.updatedAt.localeCompare(a.updatedAt)
    );

    return this;
  }
}

export default Posts;
