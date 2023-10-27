import React, { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import axios from "axios";
import "./style.css"; 


function getWeatherDataByCoords(latitude, longitude) {
    return axios
        .get(`https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&appid=deccf3474efa27ddf6ec3fba5099fa33`)
        .then((response) => {
            return response.data.current;
        })
        .catch((error) => {
            console.error("Error al obtener datos del pronóstico:", error);
            return null;
        });
}

function Grib2() {
    const [weatherData, setWeatherData] = useState(null);
    const [showLocationData, setShowLocationData] = useState(false); 

    
    const handleGetLocationClick = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(async (position) => {
                const { latitude, longitude } = position.coords;
                const weatherInfo = await getWeatherDataByCoords(latitude, longitude);
                if (weatherInfo) {
                    setWeatherData(weatherInfo);
                }
                setShowLocationData(true);
            });
        } else {
            console.error("La geolocalización no es compatible en este navegador.");
        }
    };

   
    useEffect(() => {
        async function fetchData() {
            const weatherInfo = await getWeatherDataByCoords(33.44, -94.04);
            if (weatherInfo) {
                setWeatherData(weatherInfo);
            }
        }
        fetchData();
    }, []); 

    return (
        <div className="centered-content">
            <div>
                <h3>Today's Highlights</h3>
            </div>
            <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                <Grid item xs={6}>
                    <Card>
                        <CardContent>
                            <h2>Wind Status</h2>
                            {weatherData && weatherData.wind_speed} m/s
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={6}>
                    <Card>
                        <CardContent>
                            <h2>Humidity</h2>
                            {weatherData && weatherData.humidity}%
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={6}>
                    <Card>
                        <CardContent>
                            <h2>Visibility</h2>
                            {weatherData && weatherData.visibility} meters
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={6}>
                    <Card>
                        <CardContent>
                            <h2>Air Pressure</h2>
                            {weatherData && weatherData.pressure} hPa
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </div>
    );
}

export default Grib2;