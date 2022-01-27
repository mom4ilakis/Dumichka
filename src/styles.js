import styled from 'styled-components';
import LetterBox from './LetterBox';
/* eslint-disable semi */

export const Letterbox = styled(LetterBox)`
    width: 5rem;
    height: 5rem;
    border: 1px solid #3a3a3c;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    font-size: 2rem;
    line-height: 2rem;
    font-weight: bold;
    vertical-align: middle;
    box-sizing: border-box;
    background-color: ${props => props?.color || '#121213'};
    text-transform: uppercase;
    user-select: none;
    color: #d7dadc;
`

export const BoardContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`

export const GameBoard = styled.div`
    display: grid;
    grid-template-rows: repeat(6, 1fr);
    grid-gap: 5px;
    padding: 10px;
    box-sizing: border-box;
    width: 350px;
    height: 420px;
`
export const GameViewPort = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    width: auto;
    height: auto;
`
export const Row = styled.div`
    display: flex;
    margin-top: 0.5rem;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
    width: 27rem;
    font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
    font-size: 50px;
`
export const Header = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 4rem;
    color: #d7dadc;
    border-bottom: 1px solid #3a3a3c;
    font-weight: 700;
    font-size: 36px;
    letter-spacing: 0.2rem;
    text-transform: uppercase;
    text-align: center;
    pointer-events: none;
    margin-bottom: 3rem;
`