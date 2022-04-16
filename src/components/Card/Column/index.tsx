import { Link } from "react-router-dom";
import "./ColumnCard.scss";

interface Props {
  thumbnailSrc?: string;
  title?: string;
  tags?: string[];
}

const dummyProps: Props = {
  thumbnailSrc: "https://via.placeholder.com/320",
  title: "DynamicProgramming",
  tags: [
    "Algorithm",
    "DynamicProgramming",
    "OptimalStructural",
    "Memoization",
    "OverlappingSubproblem",
  ],
};

const ColumnCard = ({
  thumbnailSrc = dummyProps.thumbnailSrc,
  title = dummyProps.title,
  tags = dummyProps.tags,
}: Props) => {
  return (
    <div className="column_card__wrapper">
      <div className="column_card__thumbnail__wrapper">
        <img
          className="column_card__thumbnail"
          src={thumbnailSrc}
          alt="thumbnail"
        />
      </div>
      <div className="column_card__tray">
        <div className="column_card__tray__title">{title}</div>
        <ul className="column_card__tray__tag">
          {tags?.map((tag) => (
            <Link
              className="column_card__tray__tag__li"
              key={tag}
              tabIndex={-1}
              to={`/tag/${tag}`}
            >
              # {tag}
            </Link>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ColumnCard;
