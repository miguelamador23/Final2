import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Grib from './components/Grib';
import Grib2 from './components/Grib2';

function App() {
  const [selectedCity, setSelectedCity] = useState(null);

  const handleSelectedStateChange = (newSelectedState) => {
    setSelectedCity(newSelectedState);
  };

    return (
        <div className="app-container">
            <Sidebar setSelectedCity={handleSelectedStateChange} />
            <div className="grib">
                <Grib selectedCity={selectedCity} />
                <Grib2 selectedState={selectedCity} />
            </div>
        </div>
    );
}

export default App;
