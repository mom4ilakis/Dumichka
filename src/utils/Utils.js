
export const zip = (...arrays) => {
    const length = Math.min(...arrays.map(arr => arr.length));
    return Array.from({ length }, (value, index) => arrays.map((array => array[index])));
};

export function checkWord(guess, solution) {

    //TODO: if allowed words don't contain guess -> invalid
    const evaluation = [];
    const letterBuffer = [];
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