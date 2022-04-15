import { BrowserRouter, Route, Routes } from "react-router-dom";
import SearchBarToggler from "./components/SearchBarToggler";
import SideBarToggler from "./components/SideBarToggler";
import HomeView from "./views/Home";
import PostView from "./views/Post";
import PostListView from "./views/PostList";
import TagListView from "./views/TagList";

const Router = () => {
  return (
    <BrowserRouter>
      <SideBarToggler className="left_top_float_button" />
      <SearchBarToggler className="right_bottom_float_button" />
      <Routes>
        <Route path="/post/:id" element={<PostView />} />
        <Route path="/category/:id" element={<PostListView />} />
        <Route path="/tag" element={<TagListView />} />
        <Route path="/tag/:id" element={<PostListView />} />
        <Route path="/" element={<HomeView />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
