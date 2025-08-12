import { Routes, Route } from "react-router-dom";
import Fun1 from "./input";
import Fun2 from "./output";
import Fun3 from "./animation"
import { Context } from "./context";
import { useState } from "react";


function App() {
  const [summary, setSummary] = useState("");
  const [urdu,setUrdu] = useState("");
  return (
    <Context.Provider value={{ summary, setSummary,urdu,setUrdu}}>
      <Routes>
        <Route path="/" element={<Fun1 />} />
        <Route path="/input" element={<Fun1 />} />
        <Route path="/output" element={<Fun2 />} />
        <Route path="/animation" element={<Fun3 />} />
        <Route path="/*" element={<Fun1 />} />
      </Routes>
    </Context.Provider>

  );
}

export default App;
