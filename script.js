let bingoTables = [];
let history = [];
let verificationOptions = {
    'A': true,
    'E': true,
    'S': true,
    'I': true,
    'U': true,
    'O': true,
    'H': true,
    'C': true,
    'Z': true,
    'W': true,
    'D': true,
    'G': true,
    'F': true,
    'N': true,
    'P': true,
    'L': true,
    'R': true,
    'LL': true,
    'T': true,
    'V': true
};

document.addEventListener('DOMContentLoaded', () => {
    const letters = Object.keys(verificationOptions);
    letters.forEach(letter => {
        const checkBox = document.getElementById(`check${letter}`);
        if (checkBox) {
            checkBox.addEventListener('change', (event) => {
                verificationOptions[letter] = event.target.checked;
            });
        }
    });
});

function generateBingoCards() {
    const bingoCount = parseInt(document.getElementById('bingoCount').value);
    const bingoCardsContainer = document.getElementById('bingoCardsContainer');
    bingoCardsContainer.innerHTML = '';

    const rowsPerCard = 5; // Cada cartón de bingo tendrá 5 filas
    const colsPerCard = 5; // Cada cartón de bingo tendrá 5 columnas

    for (let i = 0; i < bingoCount; i++) {
        const cardDiv = document.createElement('div');
        cardDiv.classList.add('bingoCard');

        const header = document.createElement('div');
        header.classList.add('bingoHeader');
        header.textContent = `BINGO #${i + 1}`;
        cardDiv.appendChild(header);

        const tableDiv = document.createElement('div');
        tableDiv.classList.add('bingoTable');
        tableDiv.id = `bingoTable-${i}`;
        cardDiv.appendChild(tableDiv);

        const letters = ['B', 'I', 'N', 'G', 'O'];
        letters.forEach((letter, index) => {
            const letterCell = document.createElement('div');
            letterCell.classList.add('bingoLetter');
            letterCell.textContent = letter;
            tableDiv.appendChild(letterCell);
        });

        bingoCardsContainer.appendChild(cardDiv);
        bingoTables[i] = Array.from({ length: rowsPerCard }, () => Array(colsPerCard).fill({ number: null, marked: false }));

        renderTable(i, rowsPerCard, colsPerCard);
    }

    showInputFields(bingoCount, rowsPerCard, colsPerCard);
}

function renderTable(cardIndex, rows, cols) {
    const tableDiv = document.getElementById(`bingoTable-${cardIndex}`);
    tableDiv.innerHTML = '';

    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            cell.id = `cell-${cardIndex}-${row}-${col}`;
            cell.textContent = '';

            // Bloquear la celda central
            if (row === 2 && col === 2) {
                cell.textContent = 'FREE';
                cell.style.backgroundColor = '#ddd';
                bingoTables[cardIndex][row][col] = { number: 'FREE', marked: true };
            } else {
                bingoTables[cardIndex][row][col] = { number: null, marked: false };
            }

            tableDiv.appendChild(cell);
        }
    }
}

function showInputFields(bingoCount, rows, cols) {
    const inputSection = document.getElementById('inputSection');
    inputSection.style.display = 'block';
    inputSection.innerHTML = '<h2>Ingrese los números</h2><button onclick="saveNumbers()">Guardar Números</button>';

    for (let i = 0; i < bingoCount; i++) {
        const inputTable = document.createElement('div');
        inputTable.classList.add('bingoTable');
        inputTable.style.gridTemplateColumns = `repeat(${cols}, 50px)`;
        inputTable.style.gridTemplateRows = `repeat(${rows}, 50px)`;
        inputTable.id = `inputTable-${i}`;
        inputSection.appendChild(inputTable);

        for (let row = 0; row < rows; row++) {
            for (let col = 0; col < cols; col++) {
                const inputCell = document.createElement('div');
                inputCell.classList.add('input-cell');
                const input = document.createElement('input');
                input.type = 'number';
                input.id = `input-${i}-${row}-${col}`;

                // Bloquear la celda central
                if (row === 2 && col === 2) {
                    input.disabled = true;
                    input.style.backgroundColor = '#ddd';
                }

                inputCell.appendChild(input);
                inputTable.appendChild(inputCell);
            }
        }
    }
}

function saveNumbers() {
    for (let i = 0; i < bingoTables.length; i++) {
        for (let row = 0; row < bingoTables[i].length; row++) {
            for (let col = 0; col < bingoTables[i][row].length; col++) {
                if (row === 2 && col === 2) continue;

                const input = document.getElementById(`input-${i}-${row}-${col}`);
                const number = parseInt(input.value);
                if (!isNaN(number)) {
                    bingoTables[i][row][col].number = number;
                } else {
                    bingoTables[i][row][col].number = null;
                }
            }
        }
    }
    updateBingoCards();
    document.getElementById('inputSection').style.display = 'none';
}

function updateBingoCards() {
    bingoTables.forEach((table, tableIndex) => {
        table.forEach((row, rowIndex) => {
            row.forEach((cell, colIndex) => {
                const cellDiv = document.getElementById(`cell-${tableIndex}-${rowIndex}-${colIndex}`);
                if (cellDiv) {
                    if (cell.number === null) {
                        cellDiv.textContent = '';
                        cellDiv.classList.remove('marked');
                    } else {
                        cellDiv.textContent = cell.number;
                        if (cell.marked) {
                            cellDiv.classList.add('marked');
                        } else {
                            cellDiv.classList.remove('marked');
                        }
                    }
                }
            });
        });
    });
}

function markNumber() {
    const number = parseInt(document.getElementById('numberInput').value);
    if (isNaN(number)) return;

    let allMarked = true;

    bingoTables.forEach((table, tableIndex) => {
        table.forEach((row, rowIndex) => {
            row.forEach((cell, colIndex) => {
                const cellDiv = document.getElementById(`cell-${tableIndex}-${rowIndex}-${colIndex}`);
                if (cellDiv && cell.number === number) {
                    cellDiv.classList.toggle('marked');
                    bingoTables[tableIndex][rowIndex][colIndex].marked = !bingoTables[tableIndex][rowIndex][colIndex].marked;
                }

                if (!bingoTables[tableIndex][rowIndex][colIndex].marked) {
                    allMarked = false;
                }
            });
        });

        checkForLetters(tableIndex);
    });

    if (allMarked) {
        alert('¡Felicidades! Has completado todos los cuadros de bingo.');
    }
}

function checkForLetters(tableIndex) {
    const letters = Object.keys(verificationOptions);
    const letterPatterns = {
        'A': [[0, 0], [0, 1], [0, 2], [0, 3], [0, 4], [1, 0], [1, 4], [2, 0], [2, 1], [2, 3], [2, 4], [3, 0], [3, 4], [4, 0], [4, 4]],
        'E': [[0, 4], [0, 3], [0, 2], [0, 1], [0, 0], [1, 0], [2, 0], [3, 0], [4, 0], [4, 1], [4, 2], [4, 3], [4, 4], [2, 1], [2, 2], [2, 3], [2, 4]],
        'S': [[0, 4], [0, 3], [0, 2], [0, 0], [0, 1], [1, 0], [2, 0], [2, 1], [2, 3], [2, 4], [3, 4], [4, 4], [4, 3], [4, 1], [4, 0], [4, 2]],
        'I': [[0, 0], [0, 1], [0, 2], [0, 3], [0, 4], [1, 2], [3, 2], [4, 2], [4, 1], [4, 0], [4, 3], [4, 4]],
        'U': [[0, 0], [1, 0], [2, 0], [3, 0], [4, 0], [4, 1], [4, 2], [4, 3], [4, 4], [3, 4], [2, 4], [1, 4], [0, 4]],
        'O': [[0, 0], [1, 0], [2, 0], [3, 0], [4, 0], [4, 1], [4, 2], [4, 3], [4, 4], [3, 4], [2, 4], [1, 4], [0, 4], [0, 3], [0, 2], [0, 1]],
        'H': [[0, 0], [1, 0], [2, 0], [3, 0], [4, 0], [2, 1], [2, 3], [2, 4], [0, 4], [1, 4], [3, 4], [4, 4]],
        'C': [[0, 0], [1, 0], [2, 0], [3, 0], [4, 0], [0, 4], [4, 4], [0, 3], [0, 2], [0, 1], [4, 1], [4, 2], [4, 3]],
        'Z': [[0, 0], [4, 0], [0, 4], [4, 4], [0, 3], [0, 2], [0, 1], [4, 1], [4, 2], [4, 3], [1, 3], [3, 1]],
        'W': [[0, 0], [4, 0], [1, 0], [2, 0], [3, 0], [3, 1], [3, 3], [4, 4], [3, 4], [2, 4], [1, 4], [0, 4], [1, 2]],
        'D': [[0, 0], [1, 4], [0, 4], [2, 4], [3, 4], [4, 3], [4, 2], [4, 1], [0, 3], [0, 2], [0, 1], [4, 0], [4, 4], [3, 1], [2, 1], [1, 1]],
        'G': [[0, 0], [0, 4], [4, 3], [4, 2], [4, 1], [0, 3], [0, 2], [0, 1], [4, 0], [4, 4], [1, 0], [2, 0], [3, 0], [3, 4], [2, 4], [2, 3]],
        'F': [[0, 0], [0, 4], [0, 3], [0, 2], [0, 1], [4, 0], [1, 0], [2, 0], [3, 0], [2, 1], [2, 3], [2, 4]],
        'N': [[0, 0], [4, 0], [1, 0], [2, 0], [3, 0], [1, 1], [3, 3], [4, 4], [3, 4], [2, 4], [1, 4], [0, 4]],
        'P': [[0, 0], [4, 0], [1, 0], [2, 0], [3, 0], [1, 4], [0, 4], [2, 1], [2, 3], [2, 4], [0, 3], [0, 2], [0, 1]],
        'L': [[0, 0], [4, 0], [1, 0], [2, 0], [3, 0], [4, 1], [4, 2], [4, 3], [4, 4]],
        'R': [[0, 0], [4, 0], [1, 0], [2, 0], [3, 0], [0, 1], [0, 2], [0, 3], [1, 3], [2, 3], [2, 1], [3, 2], [4, 3]],
        'LL': [[0, 0], [1, 0], [2, 0], [3, 0], [4, 0], [4, 1], [0, 3], [2, 3], [3, 3], [4, 3], [4, 4], [1, 3]],
        'T': [[0, 0], [0, 3], [0, 1], [0, 2], [1, 2], [3, 2], [4, 2], [0, 4]],
        'V': [[0, 0], [0, 1], [0, 2], [0, 3], [0, 4], [4, 0], [4, 1], [4, 2], [4, 3], [4, 4], [1, 2], [3, 2], [2, 2]]
    };

    letters.forEach(letter => {
        if (verificationOptions[letter]) {
            const pattern = letterPatterns[letter];
            const allMarked = pattern.every(([row, col]) => bingoTables[tableIndex][row][col].marked);
            if (allMarked) {
                alert(`¡Completaste la letra ${letter} en el BINGO #${tableIndex + 1}!`);
                addToHistory(letter, tableIndex + 1);
            }
        }
    });
}

function addToHistory(letter, tableIndex) {
    const historyList = document.getElementById('historyList');
    const listItem = document.createElement('li');
    listItem.classList.add('list-group-item');
    listItem.textContent = `Letra ${letter} completada en el BINGO #${tableIndex}`;
    historyList.appendChild(listItem);
}

function resetTable() {
    bingoTables.forEach((table, tableIndex) => {
        table.forEach((row, rowIndex) => {
            row.forEach((_, colIndex) => {
                const cellDiv = document.getElementById(`cell-${tableIndex}-${rowIndex}-${colIndex}`);
                if (cellDiv) {
                    cellDiv.classList.remove('marked');
                    bingoTables[tableIndex][rowIndex][colIndex].marked = false;
                }
            });
        });
    });
    document.getElementById('numberInput').value = '';
}
