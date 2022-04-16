import RowCard from "../../components/Card/Row";
import "./PostListView.scss";
interface Props {
  subject?: string;
}
const PostListView = ({ subject = "Algorithm" }: Props) => {
  return (
    <section className="post_list_view__wrapper">
      <h1 className="post_list_view__title">{subject}</h1>
      <ul className="post_list_view__list">
        <RowCard />
        <RowCard />
        <RowCard />
        <RowCard />
        <RowCard />
        <RowCard />
        <RowCard />
        <RowCard />
      </ul>
    </section>
  );
};

export default PostListView;
