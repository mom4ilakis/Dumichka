import React from 'react';
import PropTypes from 'prop-types';

import { KeyrowStyled, KeycapStyled } from '../styles';

const zip = (...arrays) => {
    const length = Math.min(...arrays.map(arr => arr.length));
    return Array.from({ length }, (value, index) => arrays.map((array => array[index])));
};

const Keycap = ({ letter, onClick, className }) => <div className={className} onClick={onClick}>{letter}</div>;

const Keyrow = ({ row, colorLetter, className }) =>
    <div className={className}>
        {
            zip(...row).map(([letter, keyhandler]) =>
                <KeycapStyled key={`keyboard-${letter}`} letter={letter} onClick={keyhandler} colorLetter={colorLetter}/>)
        }
    </div>;


const OnScreenKeyboard = (props) => {
    const qwerty = [[...'qwertyuiop'], [...'asdfghjkl'], ['ENTER', ...'zxcvbnm', 'DEL']];
    const keypressHandlers = qwerty.map(row => row.map(key => () => props.onClick({ key })));

    return (
        <div className={props.className}>
            {
                zip(qwerty, keypressHandlers).map((row, i) => <KeyrowStyled key={`row-${i}`} row={row} colorLetter={props.colorLetter}/>)
            }
        </div>
    );
};

Keycap.propTypes = {
    letter: PropTypes.string,
    onClick: PropTypes.func,
    className: PropTypes.string
};

Keyrow.propTypes = {
    row: PropTypes.array,
    colorLetter: PropTypes.func,
    className: PropTypes.string
};

OnScreenKeyboard.propTypes = {
    onClick: PropTypes.func,
    colorLetter: PropTypes.func,
    className: PropTypes.string
};


export { OnScreenKeyboard, Keyrow, Keycap };
