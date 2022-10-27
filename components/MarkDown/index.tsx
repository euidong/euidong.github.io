import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import rehypeRaw from "rehype-raw";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dracula } from "react-syntax-highlighter/dist/cjs/styles/prism";

import "katex/dist/katex.min.css";
import "github-markdown-css/github-markdown.css";
import styles from "./MarkDown.module.scss";
import { RiFileCopyLine } from "react-icons/ri";

import { CopyToClipboard } from "react-copy-to-clipboard";
import TableOfContents from "../TableOfContents";
import { formatIndex } from "../../lib/utils";

interface Props {
  content: string;
}

const getIndexes = (content: string): string[] => {
  // ##으로 시작하는 문자열 모두 찾기
  const regex = /^## .+$/gm;
  const result = content.match(regex)?.map((str) => str.replace("## ", ""));
  return result || [];
}

const MarkDown = ({ content }: Props) => {
  const indexes = getIndexes(content);

  return (
    <>
      <TableOfContents indexes={indexes} />
      <article className={`markdown-body ${styles["markdown-body"]}`}>
        <ReactMarkdown
          remarkPlugins={[remarkGfm, remarkMath]}
          rehypePlugins={[rehypeKatex, rehypeRaw]}
          components={{
            code({ node, inline, className, children, ...props }) {
              const match = /language-(\w+)/.exec(className || "");
              return !inline && match ? (
                <div className={styles.codeblock__wrapper}>
                  <div className={styles.codeblock__header}>
                    <span className={styles.codeblock__header__circle} />
                    <span className={styles.codeblock__header__circle} />
                    <span className={styles.codeblock__header__circle} />
                    <CopyToClipboard text={String(children)}>
                      <span
                        className={styles.codeblock__header__button}
                        onClick={(e) => {
                          const target = e.currentTarget;
                          const notify = document.createElement("div");
                          notify.innerHTML = "복사됨";
                          notify.className =
                            styles.codeblock__header__button__notify;
                          target.appendChild(notify);
                          setTimeout(() => {
                            target.removeChild(notify);
                          }, 1000);
                        }}
                      >
                        <RiFileCopyLine size="25px" />
                      </span>
                    </CopyToClipboard>
                  </div>
                  <SyntaxHighlighter
                    showLineNumbers
                    style={dracula}
                    language={match[1]}
                    PreTag="div"
                    {...props}
                  >
                    {String(children).replace(/\n$/, "")}
                  </SyntaxHighlighter>
                </div>
              ) : (
                <code className={className} {...props}>
                  {children}
                </code>
              );
            },
            h2({ children }) {
              return (
                <h2 id={formatIndex((children as string[])[0])}>{children}</h2>
              )
            }
          }}
        >
          {content}
        </ReactMarkdown>
      </article>
    </>

  );
};

export default MarkDown;
