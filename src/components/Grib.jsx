import React, { useState, useEffect } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Grid from '@mui/material/Grid';
import axios from 'axios';
import sunnyImage from '/Clear.png';
import './style.css';

function Grib() {
    const [weatherData, setWeatherData] = useState([]);

    useEffect(() => {
        axios
            .get('https://api.openweathermap.org/data/2.5/onecall?lat=33.44&lon=-94.04&exclude=current,minutely,hourly&appid=deccf3474efa27ddf6ec3fba5099fa33')
            .then(response => {
                const dailyForecastData = response.data.daily.slice(1, 5); 
                setWeatherData(dailyForecastData);
            })
            .catch(error => {
                console.error('Error al obtener datos del pronóstico:', error);
            });
    }, []);

    const formatDate = timestamp => {
        const date = new Date(timestamp * 1000);
        const options = { weekday: 'long' };
        return new Intl.DateTimeFormat('en-US', options).format(date);
    };

    return (
        <Grid container spacing={2} className="weather-grid">
            {weatherData.map((day, index) => (
                <Grid item xs={12} sm={6} md={3} key={index}>
                    <Card className="weather-card">
                        <CardHeader title={formatDate(day.dt)} className="small-title" />
                        <CardContent>
                            <img src={sunnyImage} alt="Sunny" className="weather-icon" />
                            <p className="temp">{Math.round(day.temp.day - 273.15)}°C</p>
                        </CardContent>
                    </Card>
                </Grid>
            ))}
        </Grid>
    );
}

export default Grib;
