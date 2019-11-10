import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.css';
import './styles/App.css';

import Spinner from './components/Spinner';
import RequestForm from './components/RequestForm';
import Weather from './components/Weather';

interface IWeatherKind {
  description: string;
  icon: string;
}
export interface IWeatherItem {
  weather: Array<IWeatherKind>;
  dt: number;
  main: {
    temp: number;
    humidity: number;
  }
  wind: {
    speed: number;
    deg: number;
  }
}

export const defaultCity: string = 'Budapest';

const App: React.FC = () => {

  const [weatherList, setWeatherList] = useState<IWeatherItem[]>([]);

  const [fetchedCity, setFetchedCity] = useState<string>('');
  const [fetchedTimezone, setFetchedTimezone] = useState<number>(0);

  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    fetchData(defaultCity);
  }, [])

  const fetchData = (reqCity: string): void => {
    setLoading(true);
    axios.get(`http://api.openweathermap.org/data/2.5/forecast?q=${reqCity}&lang=hu&units=metric&APPID=71aded6cf739bad97fd113a08974bf05`)
      .then(res => {
        setFetchedCity(res.data.city.name);
        setFetchedTimezone(res.data.city.timezone);
        setWeatherList(res.data.list);
        setError(false);
        setLoading(false);
      })
      .catch(err => {
        console.log(err)
        setError(true);
        setLoading(false);
      })
  }

  return (
    <>
      <RequestForm fetchData={fetchData} />

      <div className="container-fluid">
        {loading && <Spinner />}
        {!loading && !error &&
          <>
            <h1 className="mainTitle text-center pt-3"> <span className="cityName"> {fetchedCity} </span> - 5 napos előrejelzés</h1>

            <Weather
              weatherList={weatherList}
              fetchedTimezone={fetchedTimezone} />

          </>
        }
        {error && <div className="errorMsg">Szerver hiba / Nincs ilyen város!</div>}
      </div>
    </>
  );
}

export default App;
