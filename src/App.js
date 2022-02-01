import React from 'react';

import { checkWord } from './utils/Utils';
import { GameViewPort, Header, Letterbox, Row, COLORS, OnScreenKeyboardStyled } from './styles';
import propTypes from 'prop-types';
import styled from 'styled-components';


const COLOUR_MAPPING = {
    correct: COLORS.green, present: COLORS.yellow, absent: COLORS.gray
};

const LETTER_COLORS_MAP = 'abcdefghijklmnopqrstuvwxyz'.split('').reduce((obj, letter) => {
    obj[letter] = '';
    return obj;
},
{});


class Board extends React.Component {
    constructor(props) {
        super(props);
        const gameState = this.loadFromLocalStorage();
        const { answer, attempts, currentAttempt, gameFinished, evaluations } = gameState;
        this.answer = answer || this.generateTodayAnswer();
        this.state = {
            attempts: attempts || [...Array(6).keys()].map(() => ''),
            currentAttempt: currentAttempt || 0,
            gameFinished: gameFinished || false,
            evaluations: evaluations || []
        };
    }

    componentDidMount = () => {
        console.log('mounting');
        this.loadFromLocalStorage();
        const { gameFinished } = this.state;
        if (!gameFinished) {
            document.addEventListener('keyup', this.handleKeyPress);
        }
    };

    componentWillUnmount = () => {
        console.log('Unmounting...');
        document.removeEventListener('keyup', this.handleKeyPress);
        this.saveToLocalStorage();
    };

    onFinish = () => {
        document.removeEventListener('keyup', this.handleKeyPress);
    };

    generateTodayAnswer = () => 'sissy';

    isValidAnswer = () => this.state.attempts[this.state.currentAttempt].length === 5;

    updateColorForLetter = (letter, color) => {
        const prevColor = LETTER_COLORS_MAP[letter];
        if (!prevColor) {
            LETTER_COLORS_MAP[letter] = color;
            return;
        }
        if (prevColor && prevColor !=='green' && prevColor !== color) {
            if (prevColor === 'gray') {
                LETTER_COLORS_MAP[letter] = color;
            } else if (prevColor === 'yellow' && color === 'green') {
                LETTER_COLORS_MAP[letter] = color;
            }
        }
    };

    colorLetter = (letter) => LETTER_COLORS_MAP[letter];

    loadFromLocalStorage = () => {
        const parsedGameState = JSON.parse(window.localStorage.getItem('gameState'));
        if (parsedGameState) {
            const answer = parsedGameState.answer;
            const { attempts, currentAttempt, gameFinished, evaluations } = parsedGameState.boardState;
            return {
                attempts: attempts,
                currentAttempt: currentAttempt,
                gameFinished: gameFinished,
                answer: answer,
                evaluations: evaluations

            };
        } else {
            return {
                attempts: undefined,
                currentAttempt: undefined,
                gameFinished: undefined,
                answer: undefined,
                evaluations: undefined
            };
        }
    };

    saveToLocalStorage = () => {
        window.localStorage.setItem('gameState', JSON.stringify({ 'boardState': this.state, 'answer': this.answer }));
    };

    handleKeyPress = (event) => {
        const { key } = event;
        const currentWordLen = this.state.attempts[this.state.currentAttempt].length;

        if (key.length === 1 && key.match(/[a-z]/i) && currentWordLen < 5) {
            this.setState((state) => {
                const { currentAttempt, attempts } = state;
                const newWord = attempts[currentAttempt] + key;
                const newAttempts = attempts;
                newAttempts[currentAttempt] = newWord;
                return { attempts: newAttempts };
            });
            this.saveToLocalStorage();
        }
        if (key === 'Enter' && this.isValidAnswer()) {
            this.setState((state) => {
                const { currentAttempt, attempts, evaluations } = state;
                const evaluation = checkWord(attempts[currentAttempt], this.answer);
                evaluations.push(evaluation);
                const attemptBuffer = currentAttempt + 1;
                return {
                    currentAttempt: currentAttempt + 1,
                    gameFinished: this.answer === attempts[currentAttempt] || attemptBuffer >= 6
                };
            }, () => {
                this.saveToLocalStorage();
                this.state.gameFinished && this.onFinish();
            });
        }
        if (['Backspace', 'DEL'].includes(key)) {
            if ( currentWordLen > 0 ) {
                this.setState(( state ) => {
                    const { currentAttempt, attempts } = state;
                    const newWord = attempts[currentAttempt].slice(0, currentWordLen - 1);
                    const newAttempts = attempts;
                    newAttempts[currentAttempt] = newWord;
                    return { attempts: newAttempts };
                });
                this.saveToLocalStorage();
            }
        }
    };

    renderBoard = () => {
        const { attempts, currentAttempt, evaluations } = this.state;
        return attempts.map((word, index) =>
            <Row key={`row-${index}-${word}`}>
                {
                    [...Array(5).keys()].map((char_index) => {
                        const letter = word.charAt(char_index);
                        let color = currentAttempt !== index && letter && COLOUR_MAPPING[evaluations[index][[char_index]]];
                        this.updateColorForLetter(letter, color);
                        const key = `${index}-${letter}-${char_index}`;
                        return <Letterbox key={key} letter={letter} color={color}/>;
                    })
                }
            </Row>
        );
    };

    render = () => {
        return (
            <div className={this.props.className}>
                <div>
                    {
                        this.renderBoard()
                    }
                </div>
                <OnScreenKeyboardStyled onClick={this.handleKeyPress} colorLetter={this.colorLetter}/>
            </div>
        );
    };
}

Board.propTypes = {
    className: propTypes.string
};

const BoardStyled = styled(Board)`
    display: grid;
    grid-template-columns 100vw;
    grid-template-rows auto auto;
    grid-row-gap: 5vh;
    align-items: center;
    justify-items: center;
`;

function App() {
    return (
        <>
            <Header>WORDLE</Header>
            <GameViewPort>
                <BoardStyled/>
            </GameViewPort>
        </>
    );
}

export default App;
