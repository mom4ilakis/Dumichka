import React from 'react';

import { Header, GameViewPort } from './styles';
import Board from './components/Board';

function App() {
    return (
        <>
            <Header>WORDLE</Header>
            <GameViewPort>
                <Board/>
            </GameViewPort>
        </>
    );
}

export default App;
