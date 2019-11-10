import React from 'react'
import 'moment/locale/hu';
import Moment from 'react-moment';
import { IWeatherItem } from '../App'

interface IProps {
    weatherItem: IWeatherItem;
    fetchedTimezone: number;
}

const ThreeHourBlock: React.FC<IProps> = ({ fetchedTimezone, weatherItem: { dt, weather, main, wind } }) => {
    const dateForMoment: Date = new Date((dt + fetchedTimezone) * 1000);
    return (
        <>
            <div className="weather-item">

                <div className="hour text-center border-bottom">
                    <span className="time">
                        <i className="far fa-clock orange"></i> &nbsp;
                        <Moment locale="hu" date={dateForMoment} utc format="HH:mm" />
                    </span>
                </div>
                <div className="row">
                    <div className="col-md-3 col text-center">
                        <img src={`http://openweathermap.org/img/wn/${weather[0].icon}@2x.png`} alt="" />
                        <div className="description text-center">{weather[0].description} </div>
                    </div>
                    <div className="degree col-md-3 col text-center">
                        {Math.round(main.temp)} °C
                    </div>
                    <div className="other-info col-md-5 d-flex flex-column justify-content-center align-items-center">
                        <div className="humidity">Páratartalom: <b>{main.humidity}% </b></div>
                        <div className="wind">Szélerősség: {wind.speed} m/s </div>
                        <div className="wind">Szélirány: {wind.deg} fok </div>
                    </div>
                </div>

            </div>
        </>
    )
}

export default ThreeHourBlock;