import { Route, Routes } from "react-router-dom";
import LayoutWrapper from "./components/Layout/LayoutWrapper";
import Homepage from "./pages/Homepage";
import Productpage from "./pages/Productpage";

function App() {
  return (
    <LayoutWrapper>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/product/:id" element= {<Productpage />} />
      </Routes>
    </LayoutWrapper>
  );
}

export default App;
