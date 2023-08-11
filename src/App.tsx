import { Route, Routes } from "react-router-dom";
import LayoutWrapper from "./components/Layout/LayoutWrapper";
import Homepage from "./pages/Homepage";

function App() {
  return (
    <LayoutWrapper>
      <Routes>
        <Route path="/" element={<Homepage />} />
      </Routes>
    </LayoutWrapper>
  );
}

export default App;
