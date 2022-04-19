import ColumnCard from "../../components/Card/Column";
import "./HomeView.scss";
import postJson from "../../static/generated/post.json";
import categoryJson from "../../static/generated/category.json";

const HomeView = () => {
  return (
    <section className="home_view__wrapper">
      <div className="home_view__posts__background">
        <h2 className="home_view__posts__title">Recent Post</h2>
        <div className="home_view__posts__wrapper">
          {postJson.slice(0, 6).map((post, idx) => (
            <ColumnCard
              key={idx}
              thumbnailSrc={post.thumbnailSrc}
              tags={post.tags}
              title={post.title}
            />
          ))}
        </div>
      </div>
      {Object.keys(categoryJson).map((category) => (
        <div key={category} className="home_view__posts__background">
          <h2 className="home_view__posts__title">{category}</h2>
          <div className="home_view__posts__wrapper">
            {/* @ts-ignore */}
            {categoryJson[`${category}`]
              .slice(0, 6)
              .map((e: any, idx: number) => (
                <ColumnCard
                  key={idx}
                  thumbnailSrc={e.thumbnailSrc}
                  title={e.title}
                  tags={e.tags}
                />
              ))}
          </div>
        </div>
      ))}
    </section>
  );
};

export default HomeView;
