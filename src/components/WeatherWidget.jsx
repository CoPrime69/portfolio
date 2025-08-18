"use client";
import { useEffect, useState } from "react";

const APIkey = "69fd44237a7cab1fdb341314df814998"; // your API key

export default function WeatherWidget() {
    const [weather, setWeather] = useState(null);
    const [time, setTime] = useState("");

    // Fetch weather for Jodhpur
    useEffect(() => {
        fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=Jodhpur,IN&appid=${APIkey}&units=metric`
        )
            .then((res) => res.json())
            .then((data) => {
                setWeather({
                    temp: data.main.temp.toFixed(1),
                    desc: data.weather[0].main,
                    icon: `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`,
                });
            })
            .catch((err) => console.error(err));
    }, []);

    // Update time every second
    useEffect(() => {
        const updateTime = () => {
            const now = new Date();
            const options = {
                timeZone: "Asia/Kolkata",
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
            };
            setTime(now.toLocaleTimeString("en-US", options));
        };
        updateTime();
        const interval = setInterval(updateTime, 1000);
        return () => clearInterval(interval);
    }, []);

    if (!weather) return null;

    return (
        <div className="absolute top-4 right-6 flex items-center gap-3 text-white font-light text-lg z-50">
            <div className="flex items-center gap-1">
                <img src={weather.icon} alt="weather" className="w-6 h-6" />
                <span>{weather.temp}°C {weather.desc}</span>
            </div>
            <div>|</div>
            <div>{time}</div>
        </div>
    );
}
