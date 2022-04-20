import { Route, Routes } from "react-router-dom";

import HomeView from "../views/Home";
import NotFoundView from "../views/NotFound";
import PostView from "../views/Post";
import PostListView from "../views/PostList";
import TagListView from "../views/TagList";

const Router = () => {
  return (
        <Routes>
          <Route path="/post/:id" element={<PostView />} />
          <Route path="/category/:id" element={<PostListView />} />
          <Route path="/tag" element={<TagListView />} />
          <Route path="/tag/:id" element={<PostListView />} />
          <Route path="/" element={<HomeView />} />
          <Route path="/404" element={<NotFoundView />} />
        </Routes>
  );
};

export default Router;
