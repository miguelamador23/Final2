import React, { useState, useEffect } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Grid from '@mui/material/Grid';
import axios from 'axios';
import sunnyImage from '/img/Clear.png';
import './style.css';

function Grib() {
    const [weatherData, setWeatherData] = useState([]);

    useEffect(() => {
        axios
            .get('https://api.openweathermap.org/data/2.5/onecall?lat=33.44&lon=-94.04&appid=deccf3474efa27ddf6ec3fba5099fa33')
            .then(response => {
                const forecastData = response.data.hourly.slice(0, 4);
                setWeatherData(forecastData);
            })
            .catch(error => {
                console.error('Error al obtener datos del pronóstico:', error);
            });
    }, []);

    return (
        <Grid container spacing={2} className="weather-grid">
            {weatherData.map((hour, index) => (
                <Grid item xs={12} sm={6} md={3} key={index}>
                    <Card className="weather-card">
                        <CardHeader title='Tomorrow' className="small-title" />
                        <CardContent>
                            <img src={sunnyImage} alt="Sunny" className="weather-icon" />
                            <p className="temp">{Math.round(hour.temp - 273.15)}°C</p>
                        </CardContent>
                    </Card>
                </Grid>
            ))}
        </Grid>
    );
}

export default Grib;
