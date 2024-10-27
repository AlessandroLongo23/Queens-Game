const colors = [
    'bg-red-300', 
    'bg-blue-300', 
    'bg-green-300', 
    'bg-yellow-300', 
    'bg-purple-300', 
    'bg-pink-300', 
    'bg-orange-300', 
    'bg-gray-300',
    'bg-teal-300',
    'bg-cyan-300',
    'bg-sky-300',
    'bg-indigo-300',
    'bg-violet-300',
    'bg-fuchsia-300',
]

export class Board {
    cells = $state([]);

    constructor(n) {
        this.n = n;
        for (let i = 0; i < n; i++) {
            this.cells[i] = [];
            for (let j = 0; j < n; j++)
                this.cells[i][j] = new Cell('empty', i, j);
        }

        this.initBoard();
    }

    initBoard() {
        this.placeQueens();
        this.assignColors();
        this.removeQueens();
    }

    placeQueens() {
        const positions = this.backtrackQueens(0, []);
        if (positions) {
            positions.forEach(([row, col], i) => {
                this.cells[row][col].state = 'queen';
                this.cells[row][col].color = colors[i];
            });
        } else {
            console.error("No valid queen placement found");
        }
    }

    backtrackQueens(row, positions) {
        if (row === this.n)
            return positions;

        const cols = this.shuffleArray([...Array(this.n).keys()]);

        for (const col of cols) {
            if (this.isSafe(row, col, positions)) {
                positions.push([row, col]);
                const result = this.backtrackQueens(row + 1, positions);
                if (result) 
                    return result;
                
                positions.pop();
            }
        }

        return null; 
    }

    isSafe(row, col, positions) {
        for (const [r, c] of positions) {
            if (c === col || r === row)
                return false;

            if (Math.abs(r - row) <= 1 && Math.abs(c - col) <= 1)
                return false;
        }
        return true;
    }

    shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }

        return array;
    }

    assignColors() {
        let assignedCells = this.cells.flat().filter(cell => cell.state === 'queen').map(c => ({
            parents: [],
            pos: {
                x: c.i,
                y: c.j
            },
            color: c.color
        }));
    
        let toAssign = [];
        for (let assigned of assignedCells)
            this.addToAssign(assigned, toAssign);
    
        while (toAssign.length > 0) {
            let cell = toAssign[Math.floor(Math.random() * toAssign.length)];

            cell.color = cell.parents[Math.floor(Math.random() * cell.parents.length)].color;
            this.cells[cell.pos.x][cell.pos.y].color = cell.color;
    
            toAssign.splice(toAssign.indexOf(cell), 1);
    
            this.addToAssign(cell, toAssign);
        }
    }
    
    addToAssign(cell, toAssign) {
        const neighbors = [
            { x: cell.pos.x - 1, y: cell.pos.y },
            { x: cell.pos.x + 1, y: cell.pos.y },
            { x: cell.pos.x, y: cell.pos.y - 1 },
            { x: cell.pos.x, y: cell.pos.y + 1 },
        ];
    
        for (let neighbor of neighbors) {
            if (this.isValidPos(neighbor.x, neighbor.y) && !this.cells[neighbor.x][neighbor.y].color) {
                let assignedNeighbor = toAssign.find(c => c.pos.x === neighbor.x && c.pos.y === neighbor.y);
    
                if (assignedNeighbor)
                    assignedNeighbor.parents.push(cell);
                else
                    toAssign.push({
                        parents: [cell],
                        pos: { x: neighbor.x, y: neighbor.y }
                    });
            }
        }
    }
    
    isValidPos(x, y) {
        return x >= 0 && x < this.n && y >= 0 && y < this.n;
    }

    removeQueens() {
        this.cells.flat().forEach(cell => {
            if (cell.state === 'queen')
                this.cells[cell.i][cell.j].state = 'empty';
        });
    }

    checkWin() {
        let queens = this.cells.flat().filter(c => c.state === 'queen');
        if (queens.length !== this.n)
            return false;

        if (this.checkError())
            return false;

        return true;
    }

    reset() {
        this.cells.flat().forEach(cell => {
            cell.state = 'empty';
            cell.error = false;
        });
    }

    checkError() {
        let queens = this.cells.flat().filter(c => c.state === 'queen');

        this.cells.flat().forEach(cell => {
            let numQueensSameRow = this.cells.flat().filter(c => c.i === cell.i && c.state === 'queen').length;
            let numQueensSameColumn = this.cells.flat().filter(c => c.j === cell.j && c.state === 'queen').length;
            let numQueensSameColour = this.cells.flat().filter(c => c.color === cell.color && c.state === 'queen').length;
            let isQueenInNeighbour = this.cells.flat().some(c => Math.abs(c.i - cell.i) + Math.abs(c.j - cell.j) <= 2 && c !== cell && cell.state === 'queen' && c.state === 'queen');

            if ((numQueensSameRow > 1 || numQueensSameColumn > 1 || numQueensSameColour > 1 || isQueenInNeighbour) && !cell.error)
                cell.error = true;
            else if (numQueensSameRow <= 1 && numQueensSameColumn <= 1 && numQueensSameColour <= 1 && !isQueenInNeighbour && cell.error)
                cell.error = false;
        });

        return this.cells.flat().some(c => c.error);
    }
}

class Cell {
    state = $state();
    error = $state();
    
    constructor(state, i, j) {
        this.state = state;
        this.error = false;
        this.i = i;
        this.j = j;
        this.color = '';
    }
}

