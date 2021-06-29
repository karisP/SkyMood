import React from "react";
import styles from './FiveDay.module.css';

const FiveDay = (props) => {
    //get the Date and the Icon
    return (
        <div className={styles.container}>
            <div>Five Day</div>
            <div>
                {
                    props.data ?
                        props.data.list.map(day => {
                            return (
                                <div className={styles.forecast}>
                                    <span>Date</span>
                                    <span>{Math.round(day.main.temp)}</span>
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