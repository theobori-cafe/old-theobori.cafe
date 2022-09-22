import React from "react";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import ReactMarkdown from "react-markdown";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { ParsedUrlQuery } from "querystring";
import { PrismLight as SyntaxHighlighter } from "react-syntax-highlighter";

import { PostMetadata } from "../../lib/post";

import tsx from "react-syntax-highlighter/dist/cjs/languages/prism/tsx";
import jsx from "react-syntax-highlighter/dist/cjs/languages/prism/jsx";
import typescript from "react-syntax-highlighter/dist/cjs/languages/prism/typescript";
import scss from "react-syntax-highlighter/dist/cjs/languages/prism/scss";
import bash from "react-syntax-highlighter/dist/cjs/languages/prism/bash";
import markdown from "react-syntax-highlighter/dist/cjs/languages/prism/markdown";
import json from "react-syntax-highlighter/dist/cjs/languages/prism/json";
import rust from "react-syntax-highlighter/dist/cjs/languages/prism/rust";
import asm6502 from "react-syntax-highlighter/dist/cjs/languages/prism/asm6502";
import docker from "react-syntax-highlighter/dist/cjs/languages/prism/docker";

import { coldarkDark as markdownTheme } from "react-syntax-highlighter/dist/cjs/styles/prism";
import PostPreview from "../../components/PostPreview";

SyntaxHighlighter.registerLanguage("tsx", tsx);
SyntaxHighlighter.registerLanguage("jsx", jsx);
SyntaxHighlighter.registerLanguage("typescript", typescript);
SyntaxHighlighter.registerLanguage("scss", scss);
SyntaxHighlighter.registerLanguage("bash", bash);
SyntaxHighlighter.registerLanguage("markdown", markdown);
SyntaxHighlighter.registerLanguage("json", json);
SyntaxHighlighter.registerLanguage("rust", rust);
SyntaxHighlighter.registerLanguage("asm", asm6502);
SyntaxHighlighter.registerLanguage("docker", docker);

type Props = {
  content: string,
  frontmatter: PostMetadata
};

const markdownComponents: object = {
  code({ node, inline, className, children, ...props }:
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
        style={markdownTheme}
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
      <PostPreview
        frontmatter={frontmatter}
        slug={frontmatter.slug as string}
      />

      <ReactMarkdown 
        className="my-8"
        components={markdownComponents}
      >
        {content}
      </ReactMarkdown>
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

  data.slug = slug as string;

  return {
    props: {
      content,
      frontmatter: data
    }
  };
};

export default PostPage;
