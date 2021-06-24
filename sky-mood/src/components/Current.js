import styles from './Current.module.css';

const Current = (props) => {
    console.log(props.data);
    return (
        <div className={styles.container}>
            <div>Current</div>
            <div className={styles.temp}>
                <span>73</span>
                <span>Detroit, MI</span>            
            </div>
        </div>
    )
}

export default Current;