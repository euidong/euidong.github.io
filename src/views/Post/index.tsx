import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { okaidia } from "react-syntax-highlighter/dist/esm/styles/prism";

import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";

import "katex/dist/katex.min.css"; // `rehype-katex` does not import the CSS for you
import "./PostView.scss";

import { useEffect, useState } from "react";

interface Props {
  title?: string;
  date?: string;
}

const PostView = ({ title = "NotFound", date = "2022년 5월 30일" }: Props) => {
  const [markdown, setMarkdown] = useState("");

  useEffect(() => {
    const mdSrc = require(`../../static/posts/${title}.md`);
    fetch(mdSrc)
      .then((response) => {
        return response.text();
      })
      .then((text) => {
        setMarkdown(text);
      });
  }, [title]);
  return (
    <section className="post_view__wrapper">
      <h1 className="post_view__title">{title}</h1>
      <p className="post_view__date">{date}</p>
      <article className="markdown-body">
        <ReactMarkdown
          children={markdown}
          remarkPlugins={[remarkGfm, remarkMath]}
          rehypePlugins={[rehypeKatex]}
          components={{
            code({ node, inline, className, children, ...props }) {
              const match = /language-(\w+)/.exec(className || "");
              return !inline && match ? (
                <SyntaxHighlighter
                  children={String(children).replace(/\n$/, "")}
                  style={okaidia}
                  language={match[1]}
                  PreTag="div"
                  {...props}
                />
              ) : (
                <code className={className} {...props}>
                  {children}
                </code>
              );
            },
          }}
        />
      </article>
    </section>
  );
};

export default PostView;
