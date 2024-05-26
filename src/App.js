import "./App.css";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Header from "./Components/Layout/Header";
import Footer from "./Components/Layout/Footer";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { convertPdf } from "./Actions/pdfAction";
import Home from "./Components/Home";

function App() {
  const dispatch=useDispatch();

useEffect(
  ()=>{
    dispatch(convertPdf({}));
  },
  [dispatch]
);
  return (   
  <Router>
    <div className="App">
      <Header></Header>
      <div className="container container-fluid">
        <Routes>
          <Route path="/" element={<Home/>}></Route>
        </Routes>
      </div>
      <Footer></Footer>
    </div>
  </Router>
  );
}

export default App;
