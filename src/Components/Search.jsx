import React, { useState, useEffect, useContext, useRef } from 'react';
import searchIcon from '../assets/Icons/search.svg';
import { weatherData } from './WeatherHomePage';

const Search = () => {
  const { details, searchLocation } = useContext(weatherData);
  const [defaultLocation, setDefaultLocation] = useState('');
  const [searchValue, setSearchValue] = useState('');
  const inpRef = useRef(null);
  useEffect(() => {
    if (details.mainInfo.city) {
      setDefaultLocation(details.mainInfo.city);
      setSearchValue(details.mainInfo.city);
    }
  }, [details.mainInfo.city]);

  const handleSearch = (event) => {
    event.preventDefault();
    searchLocation(searchValue)
  };

  const handleChange = (event) => {
    setSearchValue(event.target.value);
  };

  return (
    <div>
      <form onSubmit={handleSearch}>
        <div className="flex bg-transparent gap-4 items-center text-white border-b-2 border-white justify-between">
          <input
            type="text"
            placeholder="Search Location"
            value={searchValue}
            onChange={handleChange}
            ref={inpRef}
            className="p-3 bg-transparent flex-1 text-white outline-none"
          />
          <button type="submit">
            <img src={searchIcon} alt="search" className="w-full" />
          </button>
        </div>
      </form>
    </div>
  );
};

export default Search;
