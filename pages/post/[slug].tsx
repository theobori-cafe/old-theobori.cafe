import React from "react";
import fs from "fs";
import ReactMarkdown from "react-markdown";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { ParsedUrlQuery } from "querystring";
import { PrismLight as SyntaxHighlighter } from "react-syntax-highlighter";
import rehypeRaw from "rehype-raw";

import { PostData } from "../../lib/posts";

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
import python from "react-syntax-highlighter/dist/cjs/languages/prism/python";

import { coldarkDark as markdownTheme } from "react-syntax-highlighter/dist/cjs/styles/prism";
import PostPreview from "../../components/PostPreview";
import Post from "../../lib/post";

SyntaxHighlighter.registerLanguage("tsx", tsx);
SyntaxHighlighter.registerLanguage("jsx", jsx);
SyntaxHighlighter.registerLanguage("typescript", typescript);
SyntaxHighlighter.registerLanguage("scss", scss);
SyntaxHighlighter.registerLanguage("bash", bash);
SyntaxHighlighter.registerLanguage("markdown", markdown);
SyntaxHighlighter.registerLanguage("json", json);
SyntaxHighlighter.registerLanguage("rust", rust);
SyntaxHighlighter.registerLanguage("asm6502", asm6502);
SyntaxHighlighter.registerLanguage("docker", docker);
SyntaxHighlighter.registerLanguage("python", python);

type Props = {
  post: PostData
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
        className="text-sm"
        language={match ? match[1] : "bash"}
        // eslint-disable-next-line react/no-children-prop
        children={String(children).replace(/\n$/, "")}
        {...props}
      />
    );
  }
};

const PostPage: NextPage<Props> = ({ post }) => {
  return (
    <article>
      <PostPreview post={post} />

      <ReactMarkdown 
        className="my-3"
        components={markdownComponents}
        rehypePlugins={[rehypeRaw]}
      >
        {post.content}
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

  const post = new Post("content/posts/" + slug + ".md").get();

  return {
    props: {
      post
    }
  };
};

export default PostPage;
