import { Link } from "react-router-dom";
import "./RowCard.scss";

const RowCard = () => {
  return (
    <div className="row_card__wrapper">
      <div className="row_card__thumbnail__wrapper">
        <img
          className="row_card__thumbnail"
          src="https://via.placeholder.com/200"
          alt="thumbnail"
        />
      </div>
      <div className="row_card__tray">
        <div className="row_card__tray__title">
          DynamicProgramming123213123123
        </div>
        <div className="row_card__tray__date">3월 5일 12시 23분</div>
        <ul className="row_card__tray__tag">
          <Link
            className="row_card__tray__tag__li"
            tabIndex={-1}
            to="/tag/Algorithm"
          >
            # Algorithm
          </Link>
          <Link
            className="row_card__tray__tag__li"
            tabIndex={-1}
            to="/tag/DynamicProgramming"
          >
            # DynamicProgramming
          </Link>
          <Link
            className="row_card__tray__tag__li"
            tabIndex={-1}
            to="/tag/OptimalStructural"
          >
            # OptimalStructural
          </Link>
          <Link
            className="row_card__tray__tag__li"
            tabIndex={-1}
            to="/tag/Memoization"
          >
            # Memoization
          </Link>
          <Link
            className="row_card__tray__tag__li"
            tabIndex={-1}
            to="/tag/OverlappingSubproblem"
          >
            # OverlappingSubproblem
          </Link>
        </ul>
      </div>
    </div>
  );
};

export default RowCard;
