import styles from "./Comment.module.scss";

interface Props {
  children?: JSX.Element;
}
const Comments = ({ children }: Props) => {
  return (
    <section
      className={styles.comment__wrapper}
      ref={(elem) => {
        if (!elem) {
          return;
        }
        const scriptElem = document.createElement("script");
        scriptElem.src = "https://utteranc.es/client.js";
        scriptElem.async = true;
        scriptElem.setAttribute("repo", "euidong/euidong.github.io");
        scriptElem.setAttribute("issue-term", "pathname");
        scriptElem.setAttribute("theme", "preferred-color-scheme");
        scriptElem.setAttribute("label", "blog");
        scriptElem.crossOrigin = "anonymous";
        elem.appendChild(scriptElem);
      }}
    >
      <h2 className={styles.comment__title}>Comments</h2>
      {children}
    </section>
  );
};

export default Comments;
