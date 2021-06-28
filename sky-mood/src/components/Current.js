import styles from './Current.module.css';

const Current = (props) => {

    let getTime = (milli) => {
        let time = new Date(milli);
        let hours = time.getUTCHours();
        if(hours > 12) hours = hours - 12;
        let minutes = time.getUTCMinutes();
        return hours + ":" + minutes;
      }

    return (
        <div className={styles.container}>
            <div className={styles.temp} style={{'backgroundColor': `${props.moodScheme}`}}>
                {
                    props.data ?
                        <>
                            <>
                                <span>{props.data.name} Weather</span>
                                <span>As of {getTime(props.data.dt)}</span>
                                <span>{Math.round(props.data.main.temp)}&#176; F</span>
                                <span>{props.data.weather[0].description}</span>
                            </>
                            <img src={`http://openweathermap.org/img/w/${props.data.weather[0].icon}.png`} alt="weather icon"/>
                        </>
                        :
                        props.loading && !props.error ?
                            <span>Loading current weather...</span>
                            :
                            <span>Error getting data</span>
                }
            </div>
        </div>
    )
}

export default Current;