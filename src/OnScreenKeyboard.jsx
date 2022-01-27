import React from 'react';
import PropTypes from 'prop-types';

const zip = (...arrays) => {
    const length = Math.min(...arrays.map(arr => arr.length));
    return Array.from({ length }, (value, index) => arrays.map((array => array[index])));
};

const OnScreenKeyboard = (props) => {
    const qwerty = [[...'qwertyuiop'], [...'asdfghjkl'], ['ENTER', ...'zxcvbnm', 'DEL']];
    const keypressHandlers = qwerty.map(row => row.map(key => () => props.onClick({ key })));
    console.log(zip(qwerty, keypressHandlers));
    return (
        <div className='keyboard'>
            {
                zip(qwerty, keypressHandlers).map((row, i) =>
                    <div key={`row-${i}`} className='keyrow'>
                        {
                            zip(...row).map(([letter, keyhandler]) =>
                                <div key={`keyboard-${letter}`}
                                    onClick={keyhandler}
                                    className='keycap'
                                >
                                    {letter}
                                </div>
                            )
                        }
                    </div>

                )
            }
        </div>
    );
};

OnScreenKeyboard.propTypes = {
    onClick: PropTypes.func
};

export default OnScreenKeyboard;
