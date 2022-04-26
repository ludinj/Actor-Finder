import Home from "./pages/home/Home";
import Actor from "./pages/actor/Actor";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/actor" element={<Actor />} />
      </Routes>
    </Router>
  );
}

export default App;
