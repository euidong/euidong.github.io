import { Link } from "react-router-dom";
import { formateDate } from "../../../utils/date";
import "./RowCard.scss";

interface Props {
  thumbnailSrc?: string;
  time: string;
  title: string;
  tags: string[];
}

const RowCard = ({ thumbnailSrc, time, title, tags }: Props) => {
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
        <div className="row_card__tray__date">{formateDate(time)}</div>
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
