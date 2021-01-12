import './Skeletons.scss';

const SkeletonElement = ({ element }) => {

    const classes = `skeleton ${element}`;

    return (
        <div className={classes}></div>
    )
}

export default SkeletonElement;
