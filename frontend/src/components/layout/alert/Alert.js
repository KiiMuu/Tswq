import styles from './Alert.module.scss';

const Alert = ({ type, content, icon }) => {
    return (
        <div className={styles['alert-wrapper']}>
            <div className={`${styles['alert']} ${styles[type]}`}>
                <span>{icon}</span>
                <p>{content}</p>
            </div>
        </div>
    )
}

Alert.defaultProps = {
    type: 'info'
}

export default Alert;
