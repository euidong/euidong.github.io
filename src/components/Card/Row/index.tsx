import { Link } from "react-router-dom";
import "./RowCard.scss";

interface Props {
  thumbnailSrc?: string;
  time?: string;
  title?: string;
  tags?: string[];
}

const dummyProps: Props = {
  thumbnailSrc: "https://via.placeholder.com/320",
  time: "3월 5일 12시 23분",
  title: "DynamicProgramming",
  tags: [
    "Algorithm",
    "DynamicProgramming",
    "OptimalStructural",
    "Memoization",
    "OverlappingSubproblem",
  ],
};

const RowCard = ({
  thumbnailSrc = dummyProps.thumbnailSrc,
  time = dummyProps.time,
  title = dummyProps.title,
  tags = dummyProps.tags,
}: Props) => {
  return (
    <div className="row_card__wrapper">
      <Link to={`/post/${title}`} className="row_card__thumbnail__wrapper">
        <img
          className="row_card__thumbnail"
          src={thumbnailSrc}
          alt="thumbnail"
        />
      </Link>
      <div className="row_card__tray">
        <Link className="row_card__tray__title" to={`/post/${title}`}>
          {title}
        </Link>
        <div className="row_card__tray__date">{time}</div>
        <ul className="row_card__tray__tag">
          {tags?.map((tag) => (
            <Link
              className="row_card__tray__tag__li"
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

export default RowCard;
