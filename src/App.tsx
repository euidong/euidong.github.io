import SearchBarToggler from "./components/SearchBarToggler";
import Router from "./routes/Router";
import "./App.css";
import SideBarToggler from "./components/SideBarToggler";

function App() {
  return (
    <>
      <SideBarToggler className="left_top_float_button" />
      <SearchBarToggler className="right_bottom_float_button" />
      <Router />
    </>
  );
}

export default App;
