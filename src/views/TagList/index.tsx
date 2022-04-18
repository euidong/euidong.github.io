import { Link } from "react-router-dom";
import "./TagListView.scss";
import tagJson from "../../static/generated/tag.json";
interface Props {
  tags?: string[];
}

const TagListView = ({ tags = Object.keys(tagJson) }: Props) => {
  return (
    <section className="tag_list_view__wrapper">
      <div className="tag_list_view__card">
        {tags?.map((tag) => (
          <Link to={`/tag/${tag}`}>#{tag} </Link>
        ))}
      </div>
    </section>
  );
};

export default TagListView;
