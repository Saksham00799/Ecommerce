import React from 'react';
import './App.css';
import Header from "./component/layout/Header/Header.js"
import Footer from "./component/layout/Footer/Footer.js"
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import webFont from "webfontloader";
import Home from './component/Home/Home.js'

function App() {

  React.useEffect(()=>{
    webFont.load({
       google:{
        families:["Roboto","Droid Sans", "chilanka"],
       },
    });
  },[]);

  return(
  <Router>
    <Header/>
    <Routes>
        <Route path="/" element={<Home />} />
    </Routes>
    <Footer/>
  </Router>);
    
}

export default App;
