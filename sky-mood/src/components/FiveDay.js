import React from "react";
import styles from './FiveDay.module.css';

const FiveDay = (props) => {
    //get the Date and the Icon

    console.log(props.data);
    const convertDateTime = (milli) => {
        console.log(milli);
        const date = new Date(milli);
        const dayOfMonth = date.getDate();
        const daysOfWeek = ['Sun', 'Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat'];
        const dayOfWeek = daysOfWeek[date.getDay()];
        let time = date.getHours();
        // console.log(time);
        if(time > 12) time = (time - 12) + 'PM';
        else if (time === 0) time = '12 AM';
        else {
            time = time + 'AM'
        }
        return `${dayOfWeek}, ${dayOfMonth} ${time}`;
    }

    return (
        <div className={styles.container}>
            <div>Five Day</div>
            <div>
                {
                    props.data ?
                        props.data.list.map(day => {
                            return (
                                <div className={styles.forecast}>
                                    <span>{convertDateTime(day.dt_txt)}</span>
                                    <span>{Math.round(day.main.temp)}</span>
                                    <img src={`http://openweathermap.org/img/w/${day.weather[0].icon}.png`} alt={`${day.weather[0].description}`}/>
                                </div>
                            )
                        })
                        :
                        props.loading ?
                            <span>Loading forecast...</span>
                            :
                            <span>Error getting data</span>
                }
            </div>
        </div>
    )
}

export default FiveDay;