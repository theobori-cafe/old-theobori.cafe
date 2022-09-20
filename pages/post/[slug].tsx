import React from "react";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import ReactMarkdown from "react-markdown";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { ParsedUrlQuery } from "querystring";

import { PrismLight as SyntaxHighlighter } from "react-syntax-highlighter";
import { Frontmatter } from "../../components/PostPreview";
import NavBar from "../../components/NavBar";

import tsx from "react-syntax-highlighter/dist/cjs/languages/prism/tsx";
import jsx from "react-syntax-highlighter/dist/cjs/languages/prism/jsx";
import typescript from "react-syntax-highlighter/dist/cjs/languages/prism/typescript";
import scss from "react-syntax-highlighter/dist/cjs/languages/prism/scss";
import bash from "react-syntax-highlighter/dist/cjs/languages/prism/bash";
import markdown from "react-syntax-highlighter/dist/cjs/languages/prism/markdown";
import json from "react-syntax-highlighter/dist/cjs/languages/prism/json";

import { materialDark } from "react-syntax-highlighter/dist/cjs/styles/prism";

SyntaxHighlighter.registerLanguage("tsx", tsx);
SyntaxHighlighter.registerLanguage("jsx", jsx);
SyntaxHighlighter.registerLanguage("typescript", typescript);
SyntaxHighlighter.registerLanguage("scss", scss);
SyntaxHighlighter.registerLanguage("bash", bash);
SyntaxHighlighter.registerLanguage("markdown", markdown);
SyntaxHighlighter.registerLanguage("json", json);

type Props = {
  content: string,
  frontmatter: Frontmatter
};

const markdownComponents: object = {
  code({ node, inline, className, children, ...props } :
    { node: any, inline: any, className: any, children: any }
  ) {
    const match = /language-(\w+)/.exec(className || "");

    if ((!inline && match) === false) {
      return (
        <code className={className ? className : ""} {...props}>
          {children}
        </code>
      );
    }

    return (
      <SyntaxHighlighter
        style={materialDark}
        PreTag="div"
        language={match ? match[1] : "bash"}
        // eslint-disable-next-line react/no-children-prop
        children={String(children).replace(/\n$/, "")}
        {...props}
      />
    );
  }
};

const PostPage: NextPage<Props> = ({ content, frontmatter }) => {
  return (
    <article>
      <NavBar />

      <div className="mx-auto max-w-[40%]">

        <div className="text-2xl font-bold text-blue-500">
          {frontmatter.title}
        </div>

        <div className="text-sm italic">
          {frontmatter.date}
        </div>
    
        <ReactMarkdown 
          components={markdownComponents}
          className="text-xs"
        >
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
    fallback: false
  };
};

interface IParams extends ParsedUrlQuery {
  slug: string
}

export const getStaticProps: GetStaticProps = async (context) => {
  // Get parameters
  const { slug } = context.params as IParams;

  const postPath = path.join("content/posts", `${slug}.md`);
  const post = fs
    .readFileSync(postPath)
    .toString();

  const { data, content } = matter(post);
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

export default PostPage;
