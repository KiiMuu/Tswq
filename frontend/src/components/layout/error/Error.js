import styles from './Error.module.scss';

const Error = ({ icon, errorMsg }) => {
    return (
        <div className={`${styles.errorWrapper} shadow-md rounded-md`}>
            <div className={styles.error}>
                <span>{icon}</span>
                <p>{errorMsg}</p>
            </div>
        </div>
    )
}

export default Error;
