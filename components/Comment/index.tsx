import { useRouter } from "next/router";
import { useRef, useState } from "react";
import { useEffect } from "react";
import styles from "./Comment.module.scss";

interface Props {
  children?: JSX.Element;
}
const Comments = ({ children }: Props) => {
  const router = useRouter();
  const [slug, setSlug] = useState<string>();
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (router.query.slug !== slug) {
      setSlug(router.query.slug as string);
    }
  }, [router]);

  useEffect(() => {
    if (ref?.current && slug) {
      const scriptElem = document.createElement("script");
      scriptElem.src = "https://utteranc.es/client.js";
      scriptElem.async = true;
      scriptElem.setAttribute("repo", "euidong/euidong.github.io");
      scriptElem.setAttribute("issue-term", "title");
      scriptElem.setAttribute("theme", "preferred-color-scheme");
      scriptElem.setAttribute("label", "blog");
      scriptElem.crossOrigin = "anonymous";
      ref.current.replaceChildren(scriptElem);
    }
  }, [slug]);

  return (
    <div className={styles.comment__wrapper}>
      <h2 className={styles.comment__title}>Comments</h2>
      <section
        className={styles.comment}
        ref={ref}
      />
      {children}
    </div>
  );
};

export default Comments;
