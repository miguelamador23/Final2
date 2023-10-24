import React, { useState, useEffect } from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import MyLocationIcon from '@mui/icons-material/MyLocation';
import RoomIcon from '@mui/icons-material/Room';
import { styled } from '@mui/system';
import Drawer from '@mui/material/Drawer';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

const CircleButton = styled(Button)`
  width: 40px;
  height: 40px;
  min-width: 0;
  border-radius: 50%;
`;

const imageContainer2Style = {
  position: 'absolute',
  zIndex: 2,
  top: '15%',
  left: '45%',
  transform: 'translate(-50%, -50%)',
};

function Sidebar({ cityName }) {
  const [searchText, setSearchText] = useState('');
  const [temperature, setTemperature] = useState(null);
  const [description, setDescription] = useState(''); 
  const [currentDate, setCurrentDate] = useState(new Date());
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const openMenu = () => {
    setIsMenuOpen(true);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const handleSearchClick = () => {
    fetch('https://api.openweathermap.org/data/2.5/onecall?lat=33.44&lon=-94.04&appid=deccf3474efa27ddf6ec3fba5099fa33')
      .then(response => response.json())
      .then(data => {
        console.log('Datos climáticos:', data);
        const celsius = Math.floor(data.current.temp - 273.15);
        setTemperature(celsius);
        setDescription(data.current.weather[0].description); 
      })
      .catch(error => {
        console.error('Error al obtener datos climáticos:', error);
      });
  };

  const handleGetLocationClick = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        const { latitude, longitude } = position.coords;
        fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&appid=deccf3474efa27ddf6ec3fba5099fa33`)
          .then(response => response.json())
          .then(data => {
            console.log('Datos climáticos de ubicación actual:', data);
            const celsius = Math.floor(data.current.temp - 273.15);
            setTemperature(celsius);
            setDescription(data.current.weather[0].description); 
          })
          .catch(error => {
            console.error('Error al obtener datos climáticos:', error);
          });
      });
    } else {
      console.error('La geolocalización no es compatible en este navegador.');
    }
  };

  const updateCurrentDate = () => {
    setCurrentDate(new Date());
  };

  useEffect(() => {
    const interval = setInterval(updateCurrentDate, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    handleSearchClick();
  }, []);

  return (
    <div className="colored-column" style={{ width: '29%', height: '100%' }}>
      <Stack spacing={20} direction="row" alignItems="center">
        <Button
          variant="contained"
          color="primary"
          className="search-button"
          style={{ marginLeft: '10px', marginTop: '10px' }}
          onClick={openMenu}
        >
          Search for places
        </Button>
        <CircleButton
          variant="contained"
          color="primary"
          className="button-margin"
          onClick={handleGetLocationClick}
          style={{ marginTop: '9px' }}
        >
          <MyLocationIcon />
        </CircleButton>
      </Stack>

      <Drawer anchor="left" open={isMenuOpen} onClose={closeMenu}>
        <TextField
          label="Search for places"
          variant="outlined"
          fullWidth
          value={searchText}
          onChange={e => setSearchText(e.target.value)}
          style={{ marginTop: '20px' }}
        />
      </Drawer>

      <div className="image-container2" style={imageContainer2Style}>
        <img src="src/weather-app-master/Clear.png" alt="Mi Imagen" style={{ width: '150px', marginTop: '160px', zIndex: -1 }} />
      </div>
      <div className="image-container" style={{ opacity: 0.2, zIndex: -1 }}>
        <img src="src/weather-app-master/Cloud-background.png" alt="Mi Imagen" style={{ width: '500px' }} />
      </div>
      {temperature !== null && (
        <div className="center-text">
          <p className='Grados' style={{ marginTop: '15px' }}>{temperature} °C</p>
          <Typography variant="h4" style={{ marginTop: '15px', textAlign: 'center', color: 'white' }}>
            {description}
          </Typography>
          <Typography variant="subtitle1" style={{ marginTop: '15px', textAlign: 'center', color: 'white' }}>
            {currentDate.toDateString()}
          </Typography>

          <Stack direction="row" alignItems="center" className="centered-text">
            <RoomIcon fontSize="small" style={{ color: 'white' }} />
            <Typography variant="subtitle1">
              Chicago
            </Typography>
          </Stack>
        </div>
      )}
    </div>
  );
}

export default Sidebar;
