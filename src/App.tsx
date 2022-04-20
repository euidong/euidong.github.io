import { BrowserRouter } from "react-router-dom";
import MainLayout from "./layouts/Main";
import ScrollToTopOnMount from "./router/ScrollToTop";
import Router from "./router/Router.jsx";
import "./App.scss";
import InsertOpenGraph from "./router/InsertOpenGraph";

function App() {
  return (
    <BrowserRouter>
      <ScrollToTopOnMount />
      <InsertOpenGraph />
      <MainLayout>
        <Router />
      </MainLayout>
    </BrowserRouter>
  );
}

export default App;
