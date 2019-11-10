import React, { Fragment } from 'react';
import ThreeHourBlock from './ThreeHourBlock';
import DayHeader from './DayHeader';

import { IWeatherItem } from '../App'

interface IProps {
    weatherList: IWeatherItem[];
    fetchedTimezone: number;
}

let alreadyRenderedDay: number | null = null;

const Weather: React.FC<IProps> = ({ weatherList, fetchedTimezone }) => {
    return (<>
        {weatherList.map((item) => {
            // a lekért városban aktív időzónával itt korrigáljuk a megkapott UTC szerinti időt
            // később a Date objektum UTC metódusait használjuk az idő lekéréséhez
            // (nem engedjük hogy ő számoljon időzónát, mert mi már itt megtettük) 
            const itemDate: Date = new Date((item.dt + fetchedTimezone) * 1000);
            let dayHeader: boolean = false;

            if (alreadyRenderedDay !== itemDate.getUTCDate()) {
                //ha még nem rendereltük ki a napot
                dayHeader = true;
                alreadyRenderedDay = itemDate.getUTCDate();
            } else {
                //ha már megtörtént korábban a render
                dayHeader = false;
            }
            return (
                <Fragment key={item.dt}>
                    {dayHeader && <DayHeader itemDate={itemDate} />}
                    <ThreeHourBlock
                        weatherItem={item}
                        fetchedTimezone={fetchedTimezone} />
                </Fragment>
            )
        })
        }
    </>);
}

export default Weather;