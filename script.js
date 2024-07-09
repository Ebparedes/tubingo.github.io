    let bingoTables = [];

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
            let bingoCompleted = true;

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

            // Verificar letras
            checkForLetterA(tableIndex);
            checkForLetterE(tableIndex);
            checkForLetterS(tableIndex);
            checkForLetterI(tableIndex);
            checkForLetterU(tableIndex);
            checkForLetterO(tableIndex);
            checkForLetterH(tableIndex);
            checkForLetterC(tableIndex);
            checkForLetterZ(tableIndex);
            checkForLetterW(tableIndex);
            checkForLetterD(tableIndex);
            checkForLetterG(tableIndex);
            checkForLetterF(tableIndex);
            checkForLetterN(tableIndex);
            checkForLetterP(tableIndex);
            checkForLetterL(tableIndex);
            checkForLetterR(tableIndex);
            checkForLetterLL(tableIndex);
            checkForLetterT(tableIndex);
            checkForLetterV(tableIndex);


        // Si se completa todo el bingo, mostrar mensaje para todo el bingo
        if (allMarked && bingoCompleted) {
            alert(`¡Felicidades! Has completado el BINGO #${tableIndex + 1}.`);
        }
    });
}

// Función para verificar letra A
function checkForLetterA(tableIndex) {
    const letraACoords = [
        [0, 0], [0, 1], [0, 2], [0, 3], [0, 4],
        [1, 0], [1, 4],
        [2, 0], [2, 1], [2, 3], [2, 4],
        [3, 0], [3, 4],
        [4, 0], [4, 4]
    ];

    const allMarked = letraACoords.every(([row, col]) => bingoTables[tableIndex][row][col].marked);
    if (allMarked) {
        alert(`¡Completaste la letra A en el BINGO #${tableIndex + 1}!`);
    }
}

// Función para verificar letra E
function checkForLetterE(tableIndex) {
    const letraECoords = [
        [0, 4], [0, 3], [0, 2], [0, 1], [0, 0],
        [1, 0],
        [2, 0],
        [3, 0],
        [4, 0], [4, 1], [4, 2], [4, 3], [4, 4],
        [2, 1], [2, 2], [2, 3], [2, 4]
    ];

    const allMarked = letraECoords.every(([row, col]) => bingoTables[tableIndex][row][col].marked);
    if (allMarked) {
        alert(`¡Completaste la letra E en el BINGO #${tableIndex + 1}!`);
    }
}

// Función para verificar letra S
function checkForLetterS(tableIndex) {
    const letraSCoords = [
        [0, 4], [0, 3], [0, 2], [0, 0], [0, 1],
        [1, 0],
        [2, 0], [2, 1], [2, 3], [2, 4],
        [3, 4],
        [4, 4], [4, 3], [4, 1], [4, 0], [4, 2]
    ];

    const allMarked = letraSCoords.every(([row, col]) => bingoTables[tableIndex][row][col].marked);
    if (allMarked) {
        alert(`¡Completaste la letra S en el BINGO #${tableIndex + 1}!`);
    }
}

// Función para verificar letra I
function checkForLetterI(tableIndex) {
    const letraICoords = [
        [0, 0], [0, 1], [0, 2], [0, 3], [0, 4],
        [1, 2],
        [3, 2],
        [4, 2],
        [4, 1], [4, 0], [4, 3], [4, 4]
    ];

    const allMarked = letraICoords.every(([row, col]) => bingoTables[tableIndex][row][col].marked);
    if (allMarked) {
        alert(`¡Completaste la letra I en el BINGO #${tableIndex + 1}!`);
    }
}

// Función para verificar letra U
function checkForLetterU(tableIndex) {
    const letraUCoords = [
        [0, 0],
        [1, 0],
        [2, 0],
        [3, 0],
        [4, 0],
        [4, 1], [4, 2], [4, 3], [4, 4],
        [3, 4],
        [2, 4],
        [1, 4],
        [0, 4]
    ];

    const allMarked = letraUCoords.every(([row, col]) => bingoTables[tableIndex][row][col].marked);
    if (allMarked) {
        alert(`¡Completaste la letra U en el BINGO #${tableIndex + 1}!`);
    }
}

// Función para verificar letra O
function checkForLetterO(tableIndex) {
    const letraOCoords = [
        [0, 0],
        [1, 0],
        [2, 0],
        [3, 0],
        [4, 0],
        [4, 1], [4, 2], [4, 3], [4, 4],
        [3, 4],
        [2, 4],
        [1, 4],
        [0, 4],
        [0, 3], [0, 2], [0, 1]
    ];

    const allMarked = letraOCoords.every(([row, col]) => bingoTables[tableIndex][row][col].marked);
    if (allMarked) {
        alert(`¡Completaste la letra O en el BINGO #${tableIndex + 1}!`);
    }
}

// Función para verificar letra H
function checkForLetterH(tableIndex) {
    const letraHCoords = [
        [0, 0],
        [1, 0],
        [2, 0],
        [3, 0],
        [4, 0],
        [2, 1], [2, 3], [2, 4],
        [0, 4],
        [1, 4],
        [3, 4],
        [4, 4]
    ];

    const allMarked = letraHCoords.every(([row, col]) => bingoTables[tableIndex][row][col].marked);
    if (allMarked) {
        alert(`¡Completaste la letra H en el BINGO #${tableIndex + 1}!`);
    }
}

// Función para verificar letra C
function checkForLetterC(tableIndex) {
    const letraCCoords = [
        [0, 0],
        [1, 0],
        [2, 0],
        [3, 0],
        [4, 0],
        [0, 4],
        [4, 4],
        [0, 3], [0, 2], [0, 1],
        [4, 1], [4, 2], [4, 3]
    ];

    const allMarked = letraCCoords.every(([row, col]) => bingoTables[tableIndex][row][col].marked);
    if (allMarked) {
        alert(`¡Completaste la letra C en el BINGO #${tableIndex + 1}!`);
    }
}

// Función para verificar letra Z
function checkForLetterZ(tableIndex) {
    const letraZCoords = [
        [0, 0],
        [4, 0],
        [0, 4],
        [4, 4],
        [0, 3], [0, 2], [0, 1],
        [4, 1], [4, 2], [4, 3],
        [1, 3], [3, 1]
    ];

    const allMarked = letraZCoords.every(([row, col]) => bingoTables[tableIndex][row][col].marked);
    if (allMarked) {
        alert(`¡Completaste la letra Z en el BINGO #${tableIndex + 1}!`);
    }
}

// Función para verificar letra W
function checkForLetterW(tableIndex) {
    const letraWCoords = [
        [0, 0],
        [4, 0],
        [1, 0],
        [2, 0],
        [3, 0],
        [3, 1], [3, 3],
        [4, 4],
        [3, 4],
        [2, 4],
        [1, 4],
        [0, 4],
        [1, 2]
    ];

    const allMarked = letraWCoords.every(([row, col]) => bingoTables[tableIndex][row][col].marked);
    if (allMarked) {
        alert(`¡Completaste la letra W en el BINGO #${tableIndex + 1}!`);
    }
}

// Función para verificar letra D
function checkForLetterD(tableIndex) {
    const letraDCoords = [
        [0, 0],
        [1, 4],
        [0, 4],
        [2, 4],
        [3, 4],
        [4, 3], [4, 2], [4, 1],
        [0, 3], [0, 2], [0, 1],
        [4, 0],
        [4, 4],
        [3, 1],
        [2, 1],
        [1, 1]
    ];

    const allMarked = letraDCoords.every(([row, col]) => bingoTables[tableIndex][row][col].marked);
    if (allMarked) {
        alert(`¡Completaste la letra D en el BINGO #${tableIndex + 1}!`);
    }
}

// Función para verificar letra G
function checkForLetterG(tableIndex) {
    const letraGCoords = [
        [0, 0],
        [0, 4],
        [4, 3], [4, 2], [4, 1],
        [0, 3], [0, 2], [0, 1],
        [4, 0],
        [4, 4],
        [1, 0],
        [2, 0],
        [3, 0],
        [3, 4],
        [2, 4],
        [2, 3]
    ];

    const allMarked = letraGCoords.every(([row, col]) => bingoTables[tableIndex][row][col].marked);
    if (allMarked) {
        alert(`¡Completaste la letra G en el BINGO #${tableIndex + 1}!`);
    }
}

// Función para verificar letra F
function checkForLetterF(tableIndex) {
    const letraFCoords = [
        [0, 0],
        [0, 4],
        [0, 3],
        [0, 2],
        [0, 1],
        [4, 0],
        [1, 0],
        [2, 0],
        [3, 0],
        [2, 1],
        [2, 3],
        [2, 4]
    ];

    const allMarked = letraFCoords.every(([row, col]) => bingoTables[tableIndex][row][col].marked);
    if (allMarked) {
        alert(`¡Completaste la letra F en el BINGO #${tableIndex + 1}!`);
    }
}

// Función para verificar letra N
function checkForLetterN(tableIndex) {
    const letraNCoords = [
        [0, 0],
        [4, 0],
        [1, 0],
        [2, 0],
        [3, 0],
        [1, 1],
        [3, 3],
        [4, 4],
        [3, 4],
        [2, 4],
        [1, 4],
        [0, 4]
    ];

    const allMarked = letraNCoords.every(([row, col]) => bingoTables[tableIndex][row][col].marked);
    if (allMarked) {
        alert(`¡Completaste la letra N en el BINGO #${tableIndex + 1}!`);
    }
}

// Función para verificar letra P
function checkForLetterP(tableIndex) {
    const letraPCoords = [
        [0, 0],
        [4, 0],
        [1, 0],
        [2, 0],
        [3, 0],
        [1, 4],
        [0, 4],
        [2, 1],
        [2, 3],
        [2, 4],
        [0, 3],
        [0, 2],
        [0, 1]
    ];

    const allMarked = letraPCoords.every(([row, col]) => bingoTables[tableIndex][row][col].marked);
    if (allMarked) {
        alert(`¡Completaste la letra P en el BINGO #${tableIndex + 1}!`);
    }
}

// Función para verificar letra L
function checkForLetterL(tableIndex) {
    const letraLCoords = [
        [0, 0],
        [4, 0],
        [1, 0],
        [2, 0],
        [3, 0],
        [4, 1],
        [4, 2],
        [4, 3],
        [4, 4]
    ];

    const allMarked = letraLCoords.every(([row, col]) => bingoTables[tableIndex][row][col].marked);
    if (allMarked) {
        alert(`¡Completaste la letra L en el BINGO #${tableIndex + 1}!`);
    }
}

// Función para verificar letra R
function checkForLetterR(tableIndex) {
    const letraRCoords = [
        [0, 0],
        [4, 0],
        [1, 0],
        [2, 0],
        [3, 0],
        [0, 1],
        [0, 2],
        [0, 3],
        [1, 3],
        [2, 3],
        [2, 1],
        [3, 2],
        [4, 3]
    ];

    const allMarked = letraRCoords.every(([row, col]) => bingoTables[tableIndex][row][col].marked);
    if (allMarked) {
        alert(`¡Completaste la letra R en el BINGO #${tableIndex + 1}!`);
    }
}

// Función para verificar letra LL
function checkForLetterLL(tableIndex) {
    const letraLLCoords = [
        [0, 0],
        [1, 0],
        [2, 0],
        [3, 0],
        [4, 0],
        [4, 1],
        [0, 3],
        [2, 3],
        [3, 3],
        [4, 3],
        [4, 4],
        [1, 3]
    ];

    const allMarked = letraLLCoords.every(([row, col]) => bingoTables[tableIndex][row][col].marked);
    if (allMarked) {
        alert(`¡Completaste la letra LL en el BINGO #${tableIndex + 1}!`);
    }
}

// Función para verificar letra T
function checkForLetterT(tableIndex) {
    const letraTCoords = [
        [0, 0],
        [0, 3],
        [0, 1],
        [0, 2],
        [1, 2],
        [3, 2],
        [4, 2],
        [0, 4]
    ];

    const allMarked = letraTCoords.every(([row, col]) => bingoTables[tableIndex][row][col].marked);
    if (allMarked) {
        alert(`¡Completaste la letra T en el BINGO #${tableIndex + 1}!`);
    }
}

// Función para verificar letra J
function checkForLetterJ(tableIndex) {
    const letraJCoords = [
        [0, 0],
        [0, 3],
        [0, 1],
        [0, 2],
        [1, 2],
        [0, 4],
        [3, 2],
        [4, 2],
        [4, 1],
        [4, 0],
        [3, 0]
    ];

    const allMarked = letraJCoords.every(([row, col]) => bingoTables[tableIndex][row][col].marked);
    if (allMarked) {
        alert(`¡Completaste la letra J en el BINGO #${tableIndex + 1}!`);
    }
}

// Función para verificar letra B
function checkForLetterB(tableIndex) {
    const letraBCoords = [
        [0, 0],
        [0, 3],
        [0, 1],
        [0, 2],
        [0, 4],
        [4, 1],
        [4, 0],
        [3, 0],
        [4, 2],
        [4, 3],
        [4, 4],
        [3, 4],
        [2, 3],
        [1, 4],
        [2, 0],
        [1, 0],
        [2, 1]
    ];

    const allMarked = letraBCoords.every(([row, col]) => bingoTables[tableIndex][row][col].marked);
    if (allMarked) {
        alert(`¡Completaste la letra B en el BINGO #${tableIndex + 1}!`);
    }
}

// Función para verificar letra K
function checkForLetterK(tableIndex) {
    const letraKCoords = [
        [0, 0],
        [4, 0],
        [3, 0],
        [2, 0],
        [1, 0],
        [2, 1],
        [1, 2],
        [0, 3],
        [3, 2],
        [4, 3]
    ];

    const allMarked = letraKCoords.every(([row, col]) => bingoTables[tableIndex][row][col].marked);
    if (allMarked) {
        alert(`¡Completaste la letra K en el BINGO #${tableIndex + 1}!`);
    }
}

// Función para verificar letra M
function checkForLetterM(tableIndex) {
    const letraMCoords = [
        [0, 0],
        [4, 0],
        [3, 0],
        [2, 0],
        [1, 0],
        [3, 2],
        [1, 1],
        [1, 3],
        [0, 4],
        [1, 4],
        [2, 4],
        [3, 4],
        [4, 4]
    ];

    const allMarked = letraMCoords.every(([row, col]) => bingoTables[tableIndex][row][col].marked);
    if (allMarked) {
        alert(`¡Completaste la letra M en el BINGO #${tableIndex + 1}!`);
    }
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
