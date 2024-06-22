import HeaderComponent from "./HeaderComponent";
import WeatherDetails from "./WeatherDetails";
import { useState, useEffect, createContext, useMemo } from "react";
import HelperFunctions from "../utils/HelperFunctions";
import LocationDetails from "./LocationDetails";
import Loader from "./Loader";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const weatherData = createContext();
const WeatherHomePage = () => {
    const [location, setLocation] = useState({ latitude: null, longitude: null })
    const [loading, setLoading] = useState(true)
    const [details, setDetails] = useState()
    const imgpath = (imageName) => {
        return new URL(`../assets/Background/${imageName}.jpg`, import.meta.url).href;
    }
    const { getLocation, getWeatherDetails, getWeatherForecast, weatherTemplate } = HelperFunctions();
    const getcurrentDetails = async (latitude, longitude, getgeolocation) => {
        try {
            const weatherDetails = await getWeatherDetails(latitude, longitude)
            const WeatherForecast = await getWeatherForecast(latitude, longitude)
            if (weatherDetails !== undefined && WeatherForecast !== undefined) {
                const requiredDetails = weatherTemplate(weatherDetails, WeatherForecast, getgeolocation)
                setLoading(requiredDetails.loading)
                setDetails(requiredDetails)
                document.body.style.backgroundImage = `url(${imgpath(requiredDetails.weatherMain.toLowerCase())})`;
                document.body.style.backgroundSize = 'cover';
                document.body.style.backgroundRepeat = 'no-repeat';

            }
        }
        catch (error) {

            const notify = () => toast.error("Something went wrong.");
            notify();
        }

    }
    const searchLocation = async (location) => {
        try {
            const getgeolocation = await getLocation(location)
            const { lat, lon } = getgeolocation
            getcurrentDetails(lat, lon, getgeolocation)
        } catch (error) {
            const notify = () => toast.error("Location not found. Check location name");
            notify();

        }

    }
    const getgeolocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(position => {
                setLocation({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude
                });
                getcurrentDetails(location.latitude, location.longitude)
            }, (error) => {

                searchLocation("Delhi")

            })
        } else {
            const notify = () => toast.error("Something went wrong");
            notify();
        }
    }
    useEffect(() => {
        getgeolocation();

    }, [location.latitude, location.longitude])


    return (
        <>
            {loading && (
                <div className="h-screen flex items-center justify-center">
                    <Loader />
                </div>
            )}
            {!loading &&
                <weatherData.Provider value={{ location, details, searchLocation }}>
                    <div className="flex justify-around w-[90%] m-auto h-[90vh]  flex-col lg:flex-row">
                        <div className="flex justify-between flex-col flex-1 p-4">
                            <HeaderComponent />
                            <LocationDetails />
                        </div>
                        <WeatherDetails />
                        <ToastContainer />
                    </div>
                </weatherData.Provider>}
        </>
    )
}

export default WeatherHomePage;