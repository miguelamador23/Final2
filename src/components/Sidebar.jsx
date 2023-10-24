import React, { useState, useEffect } from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import MyLocationIcon from '@mui/icons-material/MyLocation';
import { styled } from '@mui/system';
import Drawer from '@mui/material/Drawer';
import TextField from '@mui/material/TextField';

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

function Sidebar() {
    const [searchText, setSearchText] = useState('');
    const [temperature, setTemperature] = useState(null);
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
                const celsius = (data.current.temp - 273.15).toFixed(1);
                setTemperature(celsius);
            })
            .catch(error => {
                console.error('Error al obtener datos climáticos:', error);
            });
    };

    const handleGetLocationClick = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                const { latitude, longitude } = position.coords;
                fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&appid=deccf3474efa27ddf6ec3fba5099fa33`)
                    .then(response => response.json())
                    .then(data => {
                        console.log('Datos climáticos de ubicación actual:', data);
                        const celsius = (data.current.temp - 273.15).toFixed(1);
                        setTemperature(celsius);
                    })
                    .catch(error => {
                        console.error('Error al obtener datos climáticos:', error);
                    });
            });
        } else {
            console.error('La geolocalización no es compatible en este navegador.');
        }
    };

    useEffect(() => {
        handleSearchClick();
    }, []);

    return (
        <div className="colored-column">
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
                <CircleButton variant="contained" color="primary" className="button-margin" onClick={handleGetLocationClick}>
                    <MyLocationIcon />
                </CircleButton>
            </Stack>

            <Drawer anchor="left" open={isMenuOpen} onClose={closeMenu}>
                <TextField
                    label="Seleccionar país"
                    variant="outlined"
                    fullWidth
                    value={searchText}
                    onChange={e => setSearchText(e.target.value)}
                    style={{ marginTop: '20px' }}
                />
            </Drawer>

            <div className="image-container2" style={imageContainer2Style}>
                <img src="src/weather-app-master/Hail.png" alt="Mi Imagen" style={{ width: '220px' }} />
            </div>
            <div className="image-container" style={{ opacity: 0.2, zIndex: -1 }}>
                <img src="src/weather-app-master/Cloud-background.png" alt="Mi Imagen" style={{ width: '510px' }} />
            </div>
            {temperature !== null && (
                <div className="center-text">
                    <p className='Grados'>{temperature} °C</p>
                </div>
            )}
        </div>
    );
}

export default Sidebar;
