import React from "react";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import ReactMarkdown from "react-markdown";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { ParsedUrlQuery } from "querystring";

import { Frontmatter } from "../../components/PostPreview";
import NavBar from "../../components/NavBar";

type Props = {
  content: string,
  frontmatter: Frontmatter
};

const Post: NextPage<Props> = ({ content, frontmatter }) => {
  return (
    <article>
      <NavBar />

      <div className="mx-auto max-w-[40%]">

        <div className="text-2xl font-bold text-teal-500">
          {frontmatter.title}
        </div>

        <div className="text-sm italic">
          {frontmatter.date}
        </div>
    
        <ReactMarkdown>
          {content}
        </ReactMarkdown>
      </div>
    </article>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const files = fs.readdirSync("content/posts");
  
  const paths = files.map(filename => {
    return {
      params: {
        slug: filename.replace(".md", ""),
      }
    };
  });
  
  return {
    paths,
    fallback: true
  };
};

interface IParams extends ParsedUrlQuery {
  slug: string
}

export const getStaticProps: GetStaticProps = async (context) => {
  // Get parameters
  const { slug } = context.params as IParams;

  const postPath = path.join("content/posts", `${slug}.md`);
  const posts = fs
    .readFileSync(postPath)
    .toString();

  const { data, content } = matter(posts);
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
    props: {
      content,
      frontmatter
    }
  };
};

export default Post;
