let bingoTables = [];

function generateBingoCards() {
    const bingoCount = parseInt(document.getElementById('bingoCount').value);
    const bingoCardsContainer = document.getElementById('bingoCardsContainer');
    bingoCardsContainer.innerHTML = '';

    const rowsPerCard = 5; // Cada cuadro de bingo tendrá 5 filas
    const colsPerCard = 5; // Cada cuadro de bingo tendrá 5 columnas

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
        bingoTables[i] = Array.from({ length: rowsPerCard }, () => Array(colsPerCard).fill(null));

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
                cell.textContent = 'PAPU';
                cell.style.backgroundColor = '#ddd';
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
                    bingoTables[i][row][col] = number;
                } else {
                    bingoTables[i][row][col] = null;
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
                    if (cell === null) {
                        cellDiv.textContent = '';
                        cellDiv.classList.remove('marked');
                    } else {
                        cellDiv.textContent = cell;
                        cellDiv.classList.add('marked');
                    }
                }
            });
        });
    });
}

function markNumber() {
    const number = parseInt(document.getElementById('numberInput').value);
    if (isNaN(number)) return;

    bingoTables.forEach((table, tableIndex) => {
        table.forEach((row, rowIndex) => {
            row.forEach((cell, colIndex) => {
                const cellDiv = document.getElementById(`cell-${tableIndex}-${rowIndex}-${colIndex}`);
                if (cellDiv && cell === number) {
                    cellDiv.classList.toggle('marked');
                }
            });
        });
    });
}

function resetTable() {
    bingoTables.forEach((table, tableIndex) => {
        table.forEach((row, rowIndex) => {
            row.forEach((_, colIndex) => {
                const cellDiv = document.getElementById(`cell-${tableIndex}-${rowIndex}-${colIndex}`);
                if (cellDiv) {
                    cellDiv.classList.remove('marked');
                }
            });
        });
    });
    document.getElementById('numberInput').value = '';
}
