import React, { useState, useEffect } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Grid from '@mui/material/Grid';
import axios from 'axios';

function Grib() {
    const [weatherData, setWeatherData] = useState([]);

    useEffect(() => {
        axios.get('https://api.openweathermap.org/data/2.5/onecall?lat=33.44&lon=-94.04&exclude={part}&appid=deccf3474efa27ddf6ec3fba5099fa33')
            .then(response => {
                const forecastData = response.data.daily.slice(0, 5); 
                setWeatherData(forecastData);
            })
            .catch(error => {
                console.error('Error al obtener datos del pronóstico:', error);
            });
    }, []);

    return (
        <Grid container spacing={2}>
            {weatherData.map((day, index) => (
                <Grid item xs={12} sm={6} md={3} key={index}>
                    <Card>
                        <CardHeader title='Tomorrow' />
                        <CardContent>
                            <p>{day.temp.max}°C</p>
                            <p>{day.temp.min}°C</p>
                            {/* Agrega más contenido si es necesario */}
                        </CardContent>
                    </Card>
                </Grid>
            ))}
        </Grid>
    );
}

export default Grib;
