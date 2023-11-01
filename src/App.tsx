import React from 'react';
import './App.css';
import Chart from "./Chart";
import Header from "./Header";
import 'bootstrap/dist/css/bootstrap.min.css';
import graphicData from "./data";

function App() {
  return (
    <div className="wrapper">
       <Header/>
      <Chart graphicData={graphicData}/>
    </div>
  );
}

export default App;
