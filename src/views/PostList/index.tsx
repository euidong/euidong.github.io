import { useLocation } from "react-router-dom";
import RowCard from "../../components/Card/Row";
import "./PostListView.scss";

const PostListView = () => {
  const location = useLocation();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, type, subject] = location.pathname.split("/");
  const posts = require(`../../static/generated/${type}.json`)[`${subject}`];

  return (
    <section className="post_list_view__wrapper">
      <h1 className="post_list_view__title">{subject}</h1>
      <ul className="post_list_view__list">
        {posts.map((post: any, idx: number) => (
          <RowCard
            key={idx}
            title={post.title}
            time={post.date}
            tags={post.tags}
            thumbnailSrc={post.thumbnailSrc}
          />
        ))}
      </ul>
    </section>
  );
};

export default PostListView;
