import styled from 'styled-components';

import { KeycapUnstylied } from './Keycap';

export const Keycap = styled(KeycapUnstylied)`
width: 5vw;
border: 1px solid lightgray;
border-radius: 5px;
margin: 5px;
padding: 0px 0px 5px 0px;
text-align: center;
font-size: 20px;
background-color: ${props => props.colorLetter(props.letter)}
`;