import styled from 'styled-components';

import { LetterBoxUnstyled } from './LetterBox';
import { COLORS } from '../../styles';

export const LetterBox = styled(LetterBoxUnstyled)`
width: 5rem;
height: 5rem;
border: 1px solid ${COLORS.gray};
display: inline-flex;
justify-content: center;
align-items: center;
font-size: 2rem;
line-height: 2rem;
font-weight: bold;
vertical-align: middle;
box-sizing: border-box;
background-color: ${props => props?.color || COLORS.black};
text-transform: uppercase;
user-select: none;
color: ${COLORS.lightGray};
`;