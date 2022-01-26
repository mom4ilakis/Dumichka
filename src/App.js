import React from 'react';
import PropTypes from 'prop-types';

const LetterBox = (props) => <div className={props.className}> {props.letter} </div>;

// const emptyRow = (props) =>  [...Array(5).keys()].map(() => <LetterBox key={props.key}/>);

class Board extends React.Component {
    constructor(props){
        super(props);
        this.answer = 'weary';
        this.state = {
            attempts: [...Array(6).keys()].map(() => ''),
            currentWord: 0
        };
    }

    componentDidMount = () => {
        document.addEventListener('keyup', this.handleKeyPress);
    };

    componentWillUnmount = () => {
        document.removeEventListener('keyup', this.handleKeyPress);
    };

    handleKeyPress = (event) => {
        const { key } = event;
        const currentWordLen = this.state.attempts[this.state.currentWord].length;

        if ( key.length === 1 && key.match(/[a-z]/i) && currentWordLen < 5) {
            this.setState((state) => {
                const {currentWord, attempts} = state;
                const newWord = attempts[currentWord] + key;
                const newAttempts = attempts;
                newAttempts[currentWord] = newWord;
                return { attempts: newAttempts };
            });
        }
        if (key === 'Enter') {
            this.setState((state) => {
                return {
                    currentWord: state.currentWord + 1
                };
            });
        }
        if (key === 'Backspace') {
            if (currentWordLen > 0){
                this.setState((state) => {
                    const {currentWord, attempts} = state;
                    const newWord = attempts[currentWord].slice(0, currentWordLen-1);
                    const newAttempts = attempts;
                    newAttempts[currentWord] = newWord;
                    return { attempts: newAttempts};
                });
            }
        }
    };

    renderBoard = () => {
        const {attempts, currentWord} = this.state;
        return attempts.map((word, index) =>
            <div key={`row-${index}-${word}`} className='row'>
                {
                    [...Array(5).keys()].map((char_index) => {
                        const letter = word.charAt(char_index);
                        let color = currentWord!==index && letter && (letter === this.answer.charAt(char_index) ? 'green' : this.answer.includes(letter) ? 'yellow' :  'gray');
                        const className = 'letterBox ' + color;
                        const key = `${index}-${letter}-${char_index}`;
                        return <LetterBox key={key} letter={letter} className={className}/>;
                    })
                }
            </div>
        );};

    render = () => {
        return (
            <React.Fragment>
                <div className='board'>
                    {
                        this.renderBoard()
                    }
                </div>
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
