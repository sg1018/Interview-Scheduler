import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Components/Home/Home";
import Interview from "./Components/Interview/Interview";
import Meeting from "./Components/Meeting/Meeting";


function App() {
  return (
    <div className="App">
    <BrowserRouter>
      <Routes>
      <Route exact path="/" element={<Home />}/>
      <Route path="/interview" element={<Interview />}/>
      <Route path="/meeting" element={<Meeting />}/>
      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
