import React from "react";
import styles from './FiveDay.module.css';

const FiveDay = (props) => {
    //todo: convert temp to Fahrenheit and round
    //get the Date and the Icon
    return (
        <div className={styles.container}>
            <div>Five Day</div>
            <div>
                {
                    props.data ?

                        props.data.list.slice(0, 5).map(day => {
                            return (
                                <div className={styles.forecast}>
                                    <span>Date</span>
                                    <span>{day.main.temp}</span>
                                    <span>Icon</span>
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