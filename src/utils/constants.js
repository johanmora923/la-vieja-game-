

export const TURNS = {
    x: '×',
    o: 'o' 
}




export const winners = [
    [0, 1, 2], // row 1
    [3, 4, 5], // row 2
    [6, 7, 8], // row 3
    [0, 3, 6], // col 1
    [1, 4, 7], // col 2
    [2, 5, 8], // col 3
    [0, 4, 8], // diagonal 1
    [2, 4, 6]  // diagonal 2
]

export default [TURNS, winners]