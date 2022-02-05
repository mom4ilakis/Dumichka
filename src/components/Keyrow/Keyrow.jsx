import React from 'react';
import PropTypes from 'prop-types';

import Keycap from '../Keycap';
import { zip } from '../../utils/Utils';

const Keyrow = ({ row, colorLetter, className }) =>
    <div className={className}>
        {
            zip(...row).map(([letter, keyhandler]) =>
                <Keycap key={`keyboard-${letter}`} letter={letter} onClick={keyhandler} colorLetter={colorLetter}/>)
        }
    </div>;

Keyrow.propTypes = {
    row: PropTypes.array,
    colorLetter: PropTypes.func,
    className: PropTypes.string
};

export { Keyrow as KeyrowUnstyled };
