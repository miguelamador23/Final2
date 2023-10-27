import React, { useState, useEffect } from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import MyLocationIcon from '@mui/icons-material/MyLocation';
import RoomIcon from '@mui/icons-material/Room';
import { styled } from '@mui/system';
import Drawer from '@mui/material/Drawer';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import sunnyImage from '/Clear.png';
import Clouds from '/Cloud-background.png';

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
const states = [
  'Alabama',
  'Alaska',
  'Arizona',
  'Arkansas',
  'California',
  'Colorado',
  'Connecticut',
  'Delaware',
];

function Sidebar() {
  const [searchText, setSearchText] = useState('');
  const [temperature, setTemperature] = useState(null);
  const [description, setDescription] = useState('');
  const [currentDate, setCurrentDate] = useState(new Date());
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedState, setSelectedState] = useState('Alabama');
  const [cityWeather, setCityWeather] = useState(null);

  const openMenu = () => {
    setIsMenuOpen(true);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const handleSearchClick = () => {
    if (selectedState) {

      fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${selectedState}&limit=1&appid=deccf3474efa27ddf6ec3fba5099fa33`)
        .then(response => response.json())
        .then(data => {
          const cityLatitude = data[0].lat;
          const cityLongitude = data[0].lon;

          fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${cityLatitude}&lon=${cityLongitude}&appid=deccf3474efa27ddf6ec3fba5099fa33`)
            .then(response => response.json())
            .then(data => {
              const celsius = Math.floor(data.current.temp - 273.15);
              setTemperature(celsius);
              setDescription(data.current.weather[0].description);
              setCityWeather(data);
            })
            .catch(error => {
              console.error('Error al obtener datos climáticos:', error);
            });
        })
        .catch(error => {
          console.error('Error al obtener las coordenadas de la ciudad:', error);
        });
    }
  };

  const handleGetLocationClick = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        const { latitude, longitude } = position.coords;
        fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&appid=deccf3474efa27ddf6ec3fba5099fa33`)
          .then(response => response.json())
          .then(data => {
            const celsius = Math.floor(data.current.temp - 273.15);
            setTemperature(celsius);
            setDescription(data.current.weather[0].description);
            setSelectedState('Current Location');
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
  }, [selectedState]);

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
        <List>
          {states.map((state, index) => (
            <ListItem
              button
              key={index}
              onClick={() => {
                setSearchText(state);
                setIsMenuOpen(false);
                setSelectedState(state);
              }}
            >
              {state}
            </ListItem>
          ))}
        </List>
      </Drawer>

      <div style={{ position: 'relative' }}>
        <img src={Clouds} alt="Mi Imagen" style={{ width: '500px', position: 'absolute', top: 0, left: 0, zIndex: 1, opacity: 0.3 }} />
        <img src={sunnyImage} alt="Sunny" className="imageContainer2" style={{ ...imageContainer2Style, zIndex: 2 }} />
      </div>

      {temperature !== null && (
        <div className="center-text">
          <p className='Grados' style={{ marginTop: '300px' }}>{temperature} °C</p>
          <Typography variant="h4" style={{ marginTop: '15px', textAlign: 'center', color: 'white' }}>
            {description}
          </Typography>
          <Typography variant="subtitle1" style={{ marginTop: '15px', textAlign: 'center', color: 'white' }}>
            {currentDate.toDateString()}
          </Typography>

          <Stack direction="row" alignItems="center" className="centered-text">
            <RoomIcon fontSize="small" style={{ color: 'white' }} />
            <Typography variant="subtitle1">
              {selectedState}
            </Typography>
          </Stack>
        </div>
      )}
    </div>
  );
}

export default Sidebar;
