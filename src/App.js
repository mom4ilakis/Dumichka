import React from 'react';
import PropTypes from 'prop-types';

const LetterBox = ( props ) => <div className={props.className}> {props.letter} </div>;

class Board extends React.Component {
    constructor( props ) {
        super( props );
        const gameState = this.loadFromLocalStorage();
        const { answer, attempts, currentAttempt, gameFinished } = gameState;
        this.answer = answer || this.generateTodayAnswer();
        this.state = {
            attempts: attempts || [...Array( 6 ).keys()].map(() => ''),
            currentAttempt: currentAttempt|| 0,
            gameFinished: gameFinished || false
        };
    }

    componentDidMount = () => {
        document.addEventListener('keyup', this.handleKeyPress);
    };

    componentWillUnmount = () => {
        console.log('Unmounting...');
        document.removeEventListener('keyup', this.handleKeyPress);
        this.saveToLocalStorage();
    };

    onFinish = () => {
        document.removeEventListener('keyup', this.handleKeyPress);
    };

    generateTodayAnswer = () => 'weary';

    isValidAnswer = () => this.state.attempts[this.state.currentAttempt].length === 5;

    loadFromLocalStorage = () => {
        console.log('Loading from LS');
        const parsedGameState = JSON.parse(window.localStorage.getItem('gameState'));
        if (parsedGameState) {
            const answer = parsedGameState.answer;
            const { attempts, currentAttempt, gameFinished } = JSON.parse(parsedGameState.boardState);
            return {
                attempts,
                currentAttempt,
                gameFinished,
                answer

            };
        } else {
            return {
                attempts: undefined,
                currentAttempt: undefined,
                gameFinished: undefined,
                answer: undefined
            };
        }
    };

    saveToLocalStorage = () => {
        console.log('Saving to LS');
        window.localStorage.setItem('gameState', JSON.stringify({ 'boardState': JSON.stringify(this.state), 'answer': this.answer }));
    };

    handleKeyPress = ( event ) => {
        const { key } = event;
        const currentWordLen = this.state.attempts[this.state.currentAttempt].length;

        if ( key.length === 1 && key.match(/[a-z]/i) && currentWordLen < 5 ) {
            this.setState(( state ) => {
                const { currentAttempt, attempts } = state;
                const newWord = attempts[currentAttempt] + key;
                const newAttempts = attempts;
                newAttempts[currentAttempt] = newWord;
                return { attempts: newAttempts };
            } );
        }
        if ( key === 'Enter' && this.isValidAnswer()) {
            this.setState(( state ) => {
                const { currentAttempt, attempts } = state;
                return {
                    gameFinished: this.answer === attempts[currentAttempt] || currentAttempt >= 6,
                    currentAttempt: currentAttempt + 1
                };
            },
            () => {
                this.saveToLocalStorage();
                this.state.gameFinished && this.onFinish();
            }
            );
        }
        if ( key === 'Backspace' ) {
            if ( currentWordLen > 0 ) {
                this.setState(( state ) => {
                    const { currentAttempt, attempts } = state;
                    const newWord = attempts[currentAttempt].slice( 0, currentWordLen-1 );
                    const newAttempts = attempts;
                    newAttempts[currentAttempt] = newWord;
                    return { attempts: newAttempts };
                } );
            }
        }
    };

    renderBoard = () => {
        const { attempts, currentAttempt } = this.state;
        return attempts.map(( word, index ) =>
            <div key={`row-${index}-${word}`} className='row'>
                {
                    [...Array( 5 ).keys()].map(( char_index ) => {
                        const letter = word.charAt(char_index);
                        let color = currentAttempt!== index && letter && (letter === this.answer.charAt(char_index) ? 'green' : this.answer.includes(letter) ? 'yellow' :  'gray');
                        const className = 'letterBox ' + color;
                        const key = `${index}-${letter}-${char_index}`;
                        return <LetterBox key={key} letter={letter} className={className}/>;
                    } )
                }
            </div>
        );
    };

    render = () => {
        return (
            <React.Fragment>
                <div className='board'>
                    {
                        this.renderBoard()
                    }
                </div>
                <button onClick={this.saveToLocalStorage}>Click to Save to Storage(DEBUG)</button>
                <button onClick={this.loadFromLocalStorage}>Click to Load to Storage(DEBUG)</button>

            </React.Fragment>
        );
    };
}

LetterBox.propTypes = {
    className: PropTypes.string,
    letter: PropTypes.string
};

LetterBox.defaultProps = {
    className: 'letterBox',
    letter: ''
};


function App() {
    return (
        <div className="App">
            <Board/>
        </div>
    );
}

export default App;
