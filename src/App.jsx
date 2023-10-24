import './components/style.css';
import React from 'react';
import './App.css';
import Sidebar from './components/Sidebar';
import Grib from './components/Grib';

function App() {
  return (
    <div className="app-container">
      <Sidebar />
      <div className="grib">
        <Grib />
      </div>
    </div>
  );
}

export default App;
