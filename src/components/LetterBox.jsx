import React from 'react';
import PropTypes from 'prop-types';


const LetterBox = (props) => <div className={props.className}> {props.letter} </div>;

LetterBox.propTypes = {
    className: PropTypes.string,
    letter: PropTypes.string
};

LetterBox.defaultProps = {
    className: 'letterBox',
    letter: ''
};

export default LetterBox;
