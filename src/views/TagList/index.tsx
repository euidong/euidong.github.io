import "./TagListView.scss";
interface Props {
  tags?: string[];
}

const TagListView = ({
  tags = ["Algorithm", "Computer Architecture", "OS"],
}: Props) => {
  return (
    <section className="tag_list_view__wrapper">
      <div className="tag_list_view__card">
        {tags?.map((tag) => `#${tag} `)}
      </div>
    </section>
  );
};

export default TagListView;
