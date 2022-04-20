import { useEffect, useMemo } from "react";
import { useLocation } from "react-router-dom";
import postJson from "../static/generated/post.json";

const InsertOpenGraph = () => {
  const { pathname } = useLocation();

  const { type, title } = useMemo(() => {
    const path = pathname.split("/");
    let _type: string | undefined = undefined;
    let _title: string | undefined = undefined;
    if (path.length > 1) {
      _type = path[1];
    }
    if (path.length > 2) {
      _title = path[2];
    }
    return {
      type: _type,
      title: _title,
    };
  }, [pathname]);

  useEffect(() => {
    //set title document .
    switch (type) {
      case "tag":
        document
          .querySelector('meta[property="og:title"]')
          ?.setAttribute("content", `${title || "Tag"}`);
        document
          .querySelector('meta[property="og:url"]')
          ?.setAttribute("content", window.location.href);
        document
          .querySelector('meta[property="og:image"]')
          ?.setAttribute("content", process.env.PUBLIC_URL + "/logo192.png");
        document
          .querySelector('meta[property="og:description"]')
          ?.setAttribute("content", "in my blog");
        break;
      case "post":
        document
          .querySelector('meta[property="og:title"]')
          ?.setAttribute("content", `${title}`);
        document
          .querySelector('meta[property="og:url"]')
          ?.setAttribute("content", window.location.href);
        document
          .querySelector('meta[property="og:image"]')
          ?.setAttribute(
            "content",
            process.env.PUBLIC_URL +
              (postJson.find((post) => post.title === title)?.thumbnailSrc ||
                "/logo192.png")
          );
        document
          .querySelector('meta[property="og:description"]')
          ?.setAttribute("content", "click & check");
        break;
      case "category":
        document
          .querySelector('meta[property="og:title"]')
          ?.setAttribute("content", `${title || "Category"}`);
        document
          .querySelector('meta[property="og:url"]')
          ?.setAttribute("content", window.location.href);
        document
          .querySelector('meta[property="og:image"]')
          ?.setAttribute("content", process.env.PUBLIC_URL + "/logo192.png");
        document
          .querySelector('meta[property="og:description"]')
          ?.setAttribute("content", "in my blog");
        break;
      default:
        document
          .querySelector('meta[property="og:title"]')
          ?.setAttribute("content", "JustLog");
        document
          .querySelector('meta[property="og:url"]')
          ?.setAttribute("content", process.env.PUBLIC_URL);
        document
          .querySelector('meta[property="og:image"]')
          ?.setAttribute("content", process.env.PUBLIC_URL + "/logo192.png");
        document
          .querySelector('meta[property="og:description"]')
          ?.setAttribute("content", "Tech Blog");
        break;
    }
  }, [type, title]);

  return null;
};
export default InsertOpenGraph;
