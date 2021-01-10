import { Fragment } from "react";
import PropTypes from 'prop-types';
import { 
    BsStar,
    BsStarFill,
    BsStarHalf
 } from "react-icons/bs";

const Rating = ({ rating, text, color }) => {
    return (
        <Fragment>
            <span className="inline-block">
                {rating >= 1 ? (
                    <BsStarFill className={color} />
                ) : rating >= 0.5 ? (
                    <BsStarHalf className={color} />
                ) : (
                    <BsStar />
                )}
            </span>
            <span className="inline-block">
                {rating >= 2 ? (
                    <BsStarFill className={color} />
                ) : rating >= 1.5 ? (
                    <BsStarHalf className={color} />
                ) : (
                    <BsStar />
                )}
            </span>
            <span className="inline-block">
                {rating >= 3 ? (
                    <BsStarFill className={color} />
                ) : rating >= 2.5 ? (
                    <BsStarHalf className={color} />
                ) : (
                    <BsStar />
                )}
            </span>
            <span className="inline-block">
                {rating >= 4 ? (
                    <BsStarFill className={color} />
                ) : rating >= 3.5 ? (
                    <BsStarHalf className={color} />
                ) : (
                    <BsStar />
                )}
            </span>
            <span className="inline-block">
                {rating >= 5 ? (
                    <BsStarFill className={color} />
                ) : rating >= 4.5 ? (
                    <BsStarHalf className={color} />
                ) : (
                    <BsStar />
                )}
            </span>
            <span className="inline-block ml-5 align-text-bottom text-gray-500">{text && text}</span>
        </Fragment>
    )
}

Rating.defaultProps = {
    color: 'text-yellow-300',
}

Rating.propTypes = {
    rating: PropTypes.number.isRequired,
    text: PropTypes.string.isRequired,
    color: PropTypes.string,
}

export default Rating;
