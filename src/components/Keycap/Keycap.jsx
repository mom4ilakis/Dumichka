import React from 'react';
import PropTypes from 'prop-types';

const Keycap = ({ letter, onClick, className }) => <div className={className} onClick={onClick}>{letter}</div>;

Keycap.propTypes = {
    letter: PropTypes.string,
    onClick: PropTypes.func,
    className: PropTypes.string
};

export { Keycap as KeycapUnstylied };
