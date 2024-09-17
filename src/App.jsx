
import { Routes, Route } from "react-router-dom";
import "./App.css";
import Layout from "./components/Layout";
import Page from "./components/Page";

function App() {
  return (
    <>
    
      <div className="">
        <Routes>
          <Route path="/" element={<Layout />} />
          <Route path="/page" element={<Page />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
