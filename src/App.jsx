import './components/style.css';
import React from 'react';
import './App.css';
import Sidebar from './components/Sidebar';
import Grib from './components/Grib';
import Grib2 from './components/Grib2';

function App() {
  
  return (
    <div className="app-container">
      <Sidebar />
      <div className="grib">
        <Grib />
        <Grib2/>
      </div>
    </div>
  );
}

export default App;
