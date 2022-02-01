import styled from 'styled-components';

import LetterBox from './components/LetterBox';
import { OnScreenKeyboard, Keyrow, Keycap } from './components/OnScreenKeyboard';


const COLORS = {
    gray: '#3a3a3c',
    black: '#121213',
    lightGray: '#d7dadc',
    green: '#528c53',
    yellow: '#b79e47'
};

const KeycapStyled = styled(Keycap)`
    width: 5vw;
    border: 1px solid lightgray;
    border-radius: 5px;
    margin: 5px;
    padding: 0px 0px 5px 0px;
    text-align: center;
    font-size: 20px;
    background-color: ${props => props.colorLetter(props.letter)}
`;

const KeyrowStyled = styled(Keyrow)`
    display: flex;
    align-items: center;
    justify-content: space-around;
`;

const OnScreenKeyboardStyled = styled(OnScreenKeyboard)`
    display: table;
    color: aliceblue;
`;

const Letterbox = styled(LetterBox)`
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

const BoardContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`;

const GameBoard = styled.div`
    display: grid;
    grid-template-rows: repeat(6, 1fr);
    grid-gap: 5px;
    padding: 10px;
    box-sizing: border-box;
    width: 350px;
    height: 420px;
`;
const GameViewPort = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    width: auto;
    height: auto;
`;
const Row = styled.div`
    display: flex;
    margin-top: 0.5rem;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
    width: 27rem;
    font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
    font-size: 50px;
`;
const Header = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 4rem;
    color: ${COLORS.gray};
    border-bottom: 1px solid ${COLORS.gray};
    font-weight: 700;
    font-size: 36px;
    letter-spacing: 0.2rem;
    text-transform: uppercase;
    text-align: center;
    pointer-events: none;
    margin-bottom: 3rem;
`;

export {
    COLORS,
    Letterbox,
    BoardContainer,
    GameBoard,
    GameViewPort,
    Row,
    Header,
    KeycapStyled,
    KeyrowStyled,
    OnScreenKeyboardStyled
};