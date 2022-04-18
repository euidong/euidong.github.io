import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { twilight } from "react-syntax-highlighter/dist/esm/styles/prism";

import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";

import "katex/dist/katex.min.css"; // `rehype-katex` does not import the CSS for you
import "./PostView.scss";

import { useEffect, useState } from "react";
import ColumnCard from "../../components/Card/Column";
import { useLocation } from "react-router-dom";
import { formateDate } from "../../utils/date";

const PostView = () => {
  const location = useLocation();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, __, title] = location.pathname.split("/");
  const [markdown, setMarkdown] = useState("");
  const date = require(`../../static/generated/date.json`)[`${title}`];
  const tags = require(`../../static/posts/${title}/${title}.json`).tags;
  const relatedPosts = require("../../static/generated/tag.json")[
    tags[0]
  ].filter((e: any) => e.title !== title);

  useEffect(() => {
    const mdSrc = require(`../../static/posts/${title}/${title}.md`);
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
      <p className="post_view__date">{formateDate(date)}</p>

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
                  showLineNumbers
                  children={String(children).replace(/\n$/, "")}
                  style={twilight}
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
      {relatedPosts.length !== 0 && (
        <div className="post_view__related_post_list__wrapper">
          <h3 className="post_view__related_post_list__title">Related Post</h3>
          <ul className="post_view__related_post_list">
            {relatedPosts.map((e: any, idx: number) => (
              <ColumnCard
                key={idx}
                title={e.title}
                thumbnailSrc={e.thumbnailSrc}
                tags={e.tags}
              />
            ))}
          </ul>
        </div>
      )}
    </section>
  );
};

export default PostView;
