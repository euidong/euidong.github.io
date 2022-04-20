import { Route, Routes } from "react-router-dom";

import HomeView from "../views/Home";
import NotFoundView from "../views/NotFound";
import PostView from "../views/Post";
import PostListView from "../views/PostList";
import TagListView from "../views/TagList";

const Router = () => {
  return (
        <Routes>
          <Route exact path="/post/:id" element={<PostView />} />
          <Route exact path="/category/:id" element={<PostListView />} />
          <Route exact path="/tag" element={<TagListView />} />
          <Route exact path="/tag/:id" element={<PostListView />} />
          <Route exact path="/" element={<HomeView />} />
          <Route exact path="/404" element={<NotFoundView />} />
        </Routes>
  );
};

export default Router;
