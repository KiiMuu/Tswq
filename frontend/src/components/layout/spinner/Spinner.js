import styles from './Spinner.module.scss';

const Spinner = ({ spinnerStyle }) => {
    return (
        <div className={`${styles['spinner-wrapper']} ${styles[spinnerStyle]}`}></div>
    )
}

export default Spinner;
