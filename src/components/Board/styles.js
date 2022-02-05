import styled from 'styled-components';

import { BoardUnstyled } from './Board';


export const Board = styled(BoardUnstyled)`
    display: grid;
    grid-template-columns 100vw;
    grid-template-rows auto auto;
    grid-row-gap: 5vh;
    align-items: center;
    justify-items: center;
`;