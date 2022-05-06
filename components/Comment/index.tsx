import styles from "./Comment.module.scss";

interface Props {
  children?: JSX.Element;
}
const Comments = ({ children }: Props) => {
  return (
    <div className={styles.comment__wrapper}>
      <h2 className={styles.comment__title}>Comments</h2>
      <section
        className={styles.comment}
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
          elem.replaceChildren(scriptElem);
        }}
      />
      {children}
    </div>
  );
};

export default Comments;
