import styles from './Dropdown.module.scss';
import useToggle from '../../../hooks/useToggle';

const Dropdown = ({ name, icon, items, style }) => {
    const { isOpen, handleToggle, elementRef } = useToggle();

    const options = items.map(item => (
        <li key={item.id} className={styles.item}>{item.content}</li>
    ));

    return (
        <div className={styles.dropdown}>
            <button onClick={handleToggle} style={style}>
                {name} <span>{icon}</span>
            </button>
            <nav
                ref={elementRef} 
                className={`${styles.dropdownContent} ${isOpen ? styles.open : ''} rounded-md shadow-lg`}>
                <ul className='list-none'>
                    {options}
                </ul>
            </nav>
        </div>
    )
}

export default Dropdown;
