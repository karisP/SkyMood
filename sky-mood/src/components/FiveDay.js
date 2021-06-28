import React from "react";
import styles from './FiveDay.module.css';

const FiveDay = (props) => {
    //convert the date time for display
    const convertDateTime = (datetime) => {
        const dayOfWeek = ['Sun', 'Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat'];
        const date = new Date(datetime);
        let time = '';
        if(date.getUTCHours() < 12) {
            time = `${date.getUTCHours()} AM`;
        } else if (date.getUTCHours() === 12) {
            time = `12 PM`;
        } else {
            time = `${date.getUTCHours() - 12} PM`;
        }
        return `${dayOfWeek[date.getDay()]} ${date.getDate()} ${time}`;
    }

    return (
        <div className={styles.container}>
            <div>
                {
                    props.data ?

                        props.data.list.map((day, key) => {
                            return (
                                <div className={styles.forecast} key={key}>
                                    <span>{convertDateTime(day.dt_txt)}</span>
                                    <span>{Math.round(day.main.temp)}&#176; F</span>
                                    <img src={`http://openweathermap.org/img/w/${day.weather[0].icon}.png`} alt="weather icon"/>
                                </div>

                            )
                        })

                        :
                        props.loading && !props.error ?
                            <span>Loading forecast...</span>
                            :
                            <span>Error getting data</span>
                }
            </div>
        </div>
    )
}

export default FiveDay;