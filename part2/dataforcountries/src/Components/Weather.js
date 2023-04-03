import axios from "axios"
import { useEffect, useState } from "react"

const Weather = ({ lat, lon, capital }) => {

    const [weather, setWeather] = useState(null)

    const weatherHook = () => {
        axios
            .get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${process.env.REACT_APP_OPEN_WEATHER}`)
            .then(res => {
                setWeather(res.data)
            })
        
    }

    useEffect(weatherHook, []) // eslint-disable-line
    if (weather === null) {
        return null
    }
    return (
        // console.log(weather)
        <div>
            <h2>Current weather in {capital}</h2>
            <p>Temperature: {((weather.main.temp) - 273.15).toFixed(2)} C</p>
            <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt={weather.weather.main}/>
            <p>Wind: {weather.wind.speed} m/s</p>
        </div>
    )
}

export default Weather