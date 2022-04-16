import { Link } from "react-router-dom";
import "./ColumnCard.scss";
const ColumnCard = () => {
  return (
    <div className="column_card__wrapper">
      <div className="column_card__thumbnail__wrapper">
        <img
          className="column_card__thumbnail"
          src="https://via.placeholder.com/320"
          alt="thumbnail"
        />
      </div>
      <div className="column_card__tray">
        <div className="column_card__tray__title">DynamicProgramming</div>
        <ul className="column_card__tray__tag">
          <Link
            className="column_card__tray__tag__li"
            tabIndex={-1}
            to="/tag/Algorithm"
          >
            # Algorithm
          </Link>
          <Link
            className="column_card__tray__tag__li"
            tabIndex={-1}
            to="/tag/DynamicProgramming"
          >
            # DynamicProgramming
          </Link>
          <Link
            className="column_card__tray__tag__li"
            tabIndex={-1}
            to="/tag/OptimalStructural"
          >
            # OptimalStructural
          </Link>
          <Link
            className="column_card__tray__tag__li"
            tabIndex={-1}
            to="/tag/Memoization"
          >
            # Memoization
          </Link>
          <Link
            className="column_card__tray__tag__li"
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

export default ColumnCard;
