import React from 'react';
import PropTypes from 'prop-types';

import Keyrow from '../Keyrow';
import { zip } from '../../utils/Utils';

const OnScreenKeyboard = (props) => {
    const qwerty = [[...'qwertyuiop'], [...'asdfghjkl'], ['ENTER', ...'zxcvbnm', 'DEL']];
    const keypressHandlers = qwerty.map(row => row.map(key => () => props.onClick({ key })));

    return (
        <div className={props.className}>
            {
                zip(qwerty, keypressHandlers).map((row, i) => <Keyrow key={`row-${i}`} row={row} colorLetter={props.colorLetter}/>)
            }
        </div>
    );
};

OnScreenKeyboard.propTypes = {
    onClick: PropTypes.func,
    colorLetter: PropTypes.func,
    className: PropTypes.string
};

export { OnScreenKeyboard as OnScreenKeyboardUnstyled };
