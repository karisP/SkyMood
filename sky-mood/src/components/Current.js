import styles from './Current.module.css';

const Current = (props) => {
    //todo:convert temp to Fahrenheit and round
    return (
        <div className={styles.container}>
            <div>Current</div>
            <div className={styles.temp}>
                {
                    props.data ?
                        <>
                            <span>{props.data.main.temp}</span>
                            <span>{props.data.name}</span>
                        </>
                        :
                        props.loading ?
                            <span>Loading current weather...</span>
                            :
                            <span>Error getting data</span>
                }
            </div>
        </div>
    )
}

export default Current;