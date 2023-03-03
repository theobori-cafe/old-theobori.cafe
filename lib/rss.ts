import fs from "fs";
import { Feed } from "feed";
import Posts from "./posts";

async function rssFeed() {
  const posts = new Posts()
    .fetchPosts()
    .getPosts();

  const siteURL = process.env.VERCEL_URL;
  const date = new Date();
  const author = {
    name: "Théo Bori",
    email: "theo1.bori@epitech.eu",
    link: "https://www.github.com/theobori",
  };

  // Creating feed
  const feed = new Feed({
    title: "Théo Bori",
    description: "Posts and archives about things I make",
    id: siteURL as string,
    link: siteURL,
    image: `${siteURL}/favicon.png`,
    favicon: `${siteURL}/favicon.png`,
    copyright: `All rights reserved ${date.getFullYear()}, Théo Bori`,
    updated: date,
    generator: "Feed for Node.js",
    feedLinks: {
      rss2: `${siteURL}/rss/feed.xml`,
      json: `${siteURL}/rss/feed.json`,
    },
    author,
  });

  // Adding blogs to the rss feed
  for (const post of posts) {
    const url = `${siteURL}/post/${post.slug}`;

    feed.addItem({
      title: post.title,
      id: url,
      link: url,
      description: post.description,
      content: post.content,
      author: [author],
      contributor: [author],
      date: new Date(post.updatedAt),
    });
  }

  // generating the xml and json for rss
  fs.mkdirSync("./public/rss", { recursive: true });
  fs.writeFileSync("./public/rss/feed.xml", feed.rss2());
  fs.writeFileSync("./public/rss/feed.json", feed.json1());
}

export default rssFeed;
