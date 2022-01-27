export function checkWord(guess, solution) {

    //TODO: if allowed words don't contain guess -> invalid
    var evaluation = [];
    var letterBuffer = [];
    solution.split('').forEach((letter, i) => {
        if (guess[i] !== letter) {
            letterBuffer.push(letter);
        }
    });

    guess.split('').map((letter, i) => {
        let j;
        if (solution[i] === letter) {
            evaluation.push('correct');
        } else if ((j = letterBuffer.indexOf(letter)) > -1) {
            letterBuffer[j] = '';
            evaluation.push('present');
        } else {
            evaluation.push('absent');
        }
    });
    console.log(evaluation);
    return evaluation;
}