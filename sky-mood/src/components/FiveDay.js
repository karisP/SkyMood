import React from "react";
import styles from './FiveDay.module.css';

const FiveDay = (props) => {
    const [error, setError] = React.useState(null);
    const [isLoaded, setIsLoaded] = React.useState(false);
    const [data, setData] = React.useState();
  // fetch 5 day forcast api 
  // React.useEffect(() => {
  //   fetch(`api.openweathermap.org/data/2.5/forecast?q=${props.location}&appid=`)
  //   .then(res => res.json())
  //   .then(
  //     (result) => {
  //         setIsLoaded(true);
  //         setData(result);
  //       },
  //       // Note: it's important to handle errors here
  //       // instead of a catch() block so that we don't swallow
  //       // exceptions from actual bugs in components.
  //       (error) => {
  //         setIsLoaded(true);
  //         setError(error);
  //       }
  //       )
  //     }, []);
  //     console.log(data);
    return(
        <div className={styles.container}>          
            <div>Five Day</div>
            <div className={styles.forecast}>
                <span>DateTime</span>
                <span>73</span>
                <span>Icon</span>
            </div>
        </div>
    )
}

export default FiveDay;