import { Route, Routes } from "react-router-dom";
import LayoutWrapper from "./components/Layout/LayoutWrapper";
import Homepage from "./pages/Homepage";
import Productpage from "./pages/Productpage";
import ScrollToTop from "./utils/ScrollToTop";
import SearchProductsPage from "./pages/SearchProductsPage";

function App() {
  return (
    <ScrollToTop>
      <LayoutWrapper>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/product/:id" element={<Productpage />} />
          <Route path="/search/:prompt" element={<SearchProductsPage />} />
        </Routes>
      </LayoutWrapper>
    </ScrollToTop>
  );
}

export default App;
