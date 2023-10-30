import React, { useState, useEffect } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import LinearProgress from '@mui/material/LinearProgress';


function Grib2({ selectedState, updateWeatherData }) {
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    const getWeatherData = async () => {
      if (selectedState) {
        const apiKey = 'deccf3474efa27ddf6ec3fba5099fa33';
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${selectedState}&appid=${apiKey}`);
        if (response.ok) {
          const data = await response.json();
          setWeatherData({
            wind_speed: data.wind.speed,
            humidity: data.main.humidity,
            visibility: data.visibility,
            pressure: data.main.pressure,
          });
          updateWeatherData({ latitude: data.coord.lat, longitude: data.coord.lon }); 
        } else {
          console.error('Error al obtener datos del clima');
        }
      }
    };

    getWeatherData();
  }, [selectedState]);

  return (
    <div className="centered-content">
      <div>
        <h3 style={{ color: 'white' }}>Today's Highlights</h3>
      </div>
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid item xs={6}>
          <Card style={{ backgroundColor: 'rgb(20, 31, 87)', color: 'white' }}>
            <CardContent>
              <h2 className='custom-card'>Wind Status</h2>
              {weatherData && weatherData.wind_speed} m/s
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={6}>
          <Card style={{ backgroundColor: 'rgb(20, 31, 87)', color: 'white' }}>
            <CardContent>
            <h2 className='custom-card'>Humidity</h2>
              {weatherData && weatherData.humidity}%
              <LinearProgress variant="determinate" value={weatherData ? weatherData.humidity : 0} />
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={6}>
          <Card style={{ backgroundColor: 'rgb(20, 31, 87)', color: 'white' }}>
            <CardContent>
              <h2 className='custom-card'>Visibility</h2>
              {weatherData && weatherData.visibility} meters
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={6}>
          <Card style={{ backgroundColor: 'rgb(20, 31, 87)', color: 'white' }}>
            <CardContent>
              <h2 className='custom-card'>Air Pressure</h2>
              {weatherData && weatherData.pressure} hPa
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
}

export default Grib2;
