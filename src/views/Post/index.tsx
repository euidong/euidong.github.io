import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { okaidia } from "react-syntax-highlighter/dist/esm/styles/prism";

import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";

import "katex/dist/katex.min.css"; // `rehype-katex` does not import the CSS for you
import "./PostView.scss";
const markdown = `
# hello

A paragraph with *emphasis* and **strong importance**.

> A block quote with ~strikethrough~ and a URL: https://reactjs.org.

* Lists
* [ ] todo
* [x] done

A table:

| a | b |
| - | - |

Here is some JavaScript code:

~~~js
console.log('It works!')
~~~

The lift coefficient ($C_L$) is a dimensionless coefficient.

# hello

A paragraph with *emphasis* and **strong importance**.

> A block quote with ~strikethrough~ and a URL: https://reactjs.org.

* Lists
* [ ] todo
* [x] done

A table:

| a | b |
| - | - |

Here is some JavaScript code:

~~~js
console.log('It works!')
~~~

The lift coefficient ($C_L$) is a dimensionless coefficient.
# hello

A paragraph with *emphasis* and **strong importance**.

> A block quote with ~strikethrough~ and a URL: https://reactjs.org.

* Lists
* [ ] todo
* [x] done

A table:

| a | b |
| - | - |

Here is some JavaScript code:

~~~js
console.log('It works!')
~~~

The lift coefficient ($C_L$) is a dimensionless coefficient.

# hello

A paragraph with *emphasis* and **strong importance**.

> A block quote with ~strikethrough~ and a URL: https://reactjs.org.

* Lists
* [ ] todo
* [x] done

A table:

| a | b |
| - | - |

Here is some JavaScript code:

~~~js
console.log('It works!')
~~~

The lift coefficient ($C_L$) is a dimensionless coefficient.

# hello

A paragraph with *emphasis* and **strong importance**.

> A block quote with ~strikethrough~ and a URL: https://reactjs.org.

* Lists
* [ ] todo
* [x] done

A table:

| a | b |
| - | - |

Here is some JavaScript code:

~~~js
console.log('It works!')
~~~

The lift coefficient ($C_L$) is a dimensionless coefficient.
# hello

A paragraph with *emphasis* and **strong importance**.

> A block quote with ~strikethrough~ and a URL: https://reactjs.org.

* Lists
* [ ] todo
* [x] done

A table:

| a | b |
| - | - |

Here is some JavaScript code:

~~~js
console.log('It works!')
~~~

The lift coefficient ($C_L$) is a dimensionless coefficient.

# hello

A paragraph with *emphasis* and **strong importance**.

> A block quote with ~strikethrough~ and a URL: https://reactjs.org.

* Lists
* [ ] todo
* [x] done

A table:

| a | b |
| - | - |

Here is some JavaScript code:

~~~js
console.log('It works!')
~~~

The lift coefficient ($C_L$) is a dimensionless coefficient.

# hello

A paragraph with *emphasis* and **strong importance**.

> A block quote with ~strikethrough~ and a URL: https://reactjs.org.

* Lists
* [ ] todo
* [x] done

A table:

| a | b |
| - | - |

Here is some JavaScript code:

~~~js
import React from 'react'
import ReactMarkdown from 'react-markdown'
import ReactDom from 'react-dom'
import remarkGfm from 'remark-gfm'

ReactDom.render(
  <ReactMarkdown remarkPlugins={[[remarkGfm, {singleTilde: false}]]}>
    This ~is not~ strikethrough, but ~~this is~~!
  </ReactMarkdown>,
  document.body
)
~~~

The lift coefficient ($C_L$) is a dimensionless coefficient.
# hello

A paragraph with *emphasis* and **strong importance**.

> A block quote with ~strikethrough~ and a URL: https://reactjs.org.

* Lists
* [ ] todo
* [x] done

A table:

| a | b |
| - | - |

Here is some JavaScript code:

~~~js
console.log('It works!')
console.log('It works!')
console.log('It works!')
console.log('It works!')
console.log('It works!')
console.log('It works!')
console.log('It works!')
~~~

The lift coefficient ($C_L$) is a dimensionless coefficient.
`;

const PostView = () => {
  return (
    <section className="post_view__wrapper">
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
    </section>
  );
};

export default PostView;
