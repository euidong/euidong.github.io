import { BsQuestionLg } from "react-icons/bs";
import "./NotFoundView.scss";

const NotFoundView = () => {
  return (
    <section className="not_found_view__wrapper">
      <div className="not_found_view__box">
        <BsQuestionLg />
        <br />
        요청하신 페이지를 찾을 수 없습니다.
      </div>
    </section>
  );
};
export default NotFoundView;
