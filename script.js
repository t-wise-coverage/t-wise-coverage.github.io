// script.js

const matrixSize = 14;
const table = document.getElementById("matrix");
const checkboxes = document.querySelectorAll('input[type="checkbox"]');
const colors = ["", "2", "3_1", "3_2", "4_1", "4_2", "5", "6_1", "6_2", "7"];

const hideCoordinates = [
    ...Array.from({length: 12}, (_, i) => [14, 14 - i]),
    ...Array.from({length: 12}, (_, i) => [13, 14 - i]),
    ...Array.from({length: 10}, (_, i) => [12, 14 - i]),
    ...Array.from({length: 10}, (_, i) => [11, 14 - i]),
    ...Array.from({length: 8}, (_, i) => [10, 14 - i]),
    ...Array.from({length: 8}, (_, i) => [9, 14 - i]),
    ...Array.from({length: 6}, (_, i) => [8, 14 - i]),
    ...Array.from({length: 6}, (_, i) => [7, 14 - i]),
    ...Array.from({length: 4}, (_, i) => [6, 14 - i]),
    ...Array.from({length: 4}, (_, i) => [5, 14 - i]),
    ...Array.from({length: 2}, (_, i) => [4, 14 - i]),
    ...Array.from({length: 2}, (_, i) => [3, 14 - i]),
    ...Array.from({length: 0}, (_, i) => [2, 14 - i]),
    ...Array.from({length: 0}, (_, i) => [1, 14 - i]),
];
const invalidCoordinates = [
    ...Array.from({length: 6}, (_, i) => [10, 1 + i]),
    ...Array.from({length: 14}, (_, i) => [1 + i, 2]),
    ...Array.from({length: 8}, (_, i) => [1 + i, 7]),
    [2, 4],
    [2, 6],
    [2, 10],
    [2, 13],
    [4, 4],
    [4, 6],
    [4, 10],
    [6, 4],
    [7, 5],
    [8, 4],
    [8, 6],
    [12, 4]
];
const core = [
    ...Array.from({length: 14}, (_, i) => [1 + i, 1])
]
const dead = [
    ...Array.from({length: 6}, (_, i) => [9, 1 + i]),
    ...Array.from({length: 8}, (_, i) => [1 + i, 8])
]
const ASF_include = [
    ...Array.from({length: 10}, (_, i) => [1 + i, 6]),
    ...Array.from({length: 10}, (_, i) => [1 + i, 5]),
    ...Array.from({length: 10}, (_, i) => [11, 1 + i]),
    ...Array.from({length: 10}, (_, i) => [12, 1 + i]),
]
const ASF_exclude = [
    ...Array.from({length: 6}, (_, i) => [1 + i, 9]),
    ...Array.from({length: 6}, (_, i) => [1 + i, 10]),
    ...Array.from({length: 8}, (_, i) => [7, 1 + i]),
    ...Array.from({length: 8}, (_, i) => [8, 1 + i]),
]
const ASL_include = [
    ...Array.from({length: 10}, (_, i) => [1 + i, 6]),
    ...Array.from({length: 10}, (_, i) => [1 + i, 5]),
    ...Array.from({length: 14}, (_, i) => [1 + i, 1]),
    ...Array.from({length: 10}, (_, i) => [11, 1 + i]),
    ...Array.from({length: 10}, (_, i) => [12, 1 + i]),
]
const ASL_exclude = [
    ...Array.from({length: 6}, (_, i) => [1 + i, 9]),
    ...Array.from({length: 6}, (_, i) => [1 + i, 10]),
    ...Array.from({length: 8}, (_, i) => [7, 1 + i]),
    ...Array.from({length: 8}, (_, i) => [8, 1 + i]),
    // ...Array.from({length: 14}, (_, i) => [1 + i, 1]),
    ...Array.from({length: 6}, (_, i) => [9, 1 + i]),
    ...Array.from({length: 8}, (_, i) => [1 + i, 8]),
]
const Abstract = [
    // ...Array.from({length: 12}, (_, i) => [3 + i, 1]),
    ...Array.from({length: 12}, (_, i) => [1 + i, 3]),
    ...Array.from({length: 12}, (_, i) => [1 + i, 4]),
    ...Array.from({length: 2}, (_, i) => [13, 1 + i]),
    ...Array.from({length: 2}, (_, i) => [14, 1 + i])
]
const Evi = [
    [1, 13],
    [3,9],
    [4,9]
]
const Evi_exclude = [
    [2, 14],
    [2,9],
    [1,9]
]
const PC = [
    ...Array.from({length: 14}, (_, i) => [2*i, 1]),
    ...Array.from({length: 2}, (_, i) => [6+ 2*i, 3]),
    ...Array.from({length: 3}, (_, i) => [2*i, 5]),
]

function exclude_invalid(coordinates) {
    coordinates.forEach(([row, col]) => {
        if (row > 0 && col > 0 && row <= matrixSize && col <= matrixSize) {
            const cell = table.rows[row].cells[col];
            cell.classList.add('light-grey');
            cell.innerHTML = "";
        }
    });
    updateInteractionCounter();
}

function colorCells(coordinates, color) {
    coordinates.forEach(([row, col]) => {
        if (row > 0 && col > 0 && row <= matrixSize && col <= matrixSize) {
            const cell = table.rows[row].cells[col];
            cell.classList.add(color); // Add blue class
        }
    });
    updateCellColors();
}

function removeColor(coordinates, color) {
    coordinates.forEach(([row, col]) => {
        if (row > 0 && col > 0 && row <= matrixSize && col <= matrixSize) {
            const cell = table.rows[row].cells[col];
            cell.classList.remove(color); // Remove blue class
        }
    });
    updateCellColors();
}

function hideCells(coordinates) {
    coordinates.forEach(([row, col]) => {
        if (row > 0 && col > 0 && row <= matrixSize && col <= matrixSize) {
            const cell = table.rows[row].cells[col];
            cell.style.display = 'none'; // Hide cell and remove its border
        }
    });
}

function updateCellColors() {
    const cells = document.querySelectorAll('.colored');
    cells.forEach(cell => {
        // const elements = ["1", "2", "3_1", "3_2", "4_1", "4_2", "5", "6_1", "6_2", "7"];

        const has1 = cell.classList.contains('1');
        const has2 = cell.classList.contains('2');
        const has3_1 = cell.classList.contains('3_1');
        const has3_2 = cell.classList.contains('3_2');
        const has4_1 = cell.classList.contains('4_1');
        const has4_2 = cell.classList.contains('4_2');
        const has5 = cell.classList.contains('5');
        const has6_1 = cell.classList.contains('6_1');
        const has6_2 = cell.classList.contains('6_2');
        const has7 = cell.classList.contains('7');
        const nothing = !(has1 || has2 || has3_1 || has3_2 || has4_1 || has4_2 || has5 || has6_1 || has6_2 || has7);
        const hasLightGrey = cell.classList.contains('light-grey');

        const c1 = 'rgba(0,0,0,0.5)';
        const c2 = 'rgba(230,159,0,0.5)';
        const c3 = 'rgba(86,180,233,0.5)';
        const c4 = 'rgba(0,158,115,0.5)';
        const c5 = 'rgba(240,228,66,0.5)';
        const c6 = 'rgba(0,114,178,0.5)';
        const c7 = 'rgba(213,94,0,0.5)';

        let selectedColors = [];

        if (!hasLightGrey){
            cell.innerHTML = "&#10003;";
        }
        if (has1 || has2 || has3_2 || has4_2 || has5 || has6_2 || has7){
            cell.innerHTML = "";
        }

        if (has1) {
            selectedColors.push(c1);
        } if (has2) {
            selectedColors.push(c2);
        } if (has3_1) {
            selectedColors.push(c3);
        } if (has3_2) {
            if (!has3_1){
                selectedColors.push(c3);
            }
        } if (has4_2) {
            if (!has4_1){
                selectedColors.push(c4);
            }
        } if (has4_1) {
            selectedColors.push(c4);
        } if (has5) {
            selectedColors.push(c5);
        } if (has6_1) {
            selectedColors.push(c6);
        } if (has6_2) {
            if (!has6_1){
                selectedColors.push(c6);
            }
        } if (has7) {
            selectedColors.push(c7);
        } if (nothing) {
            cell.style.background = '';
        }

        if (selectedColors.length > 1) {
            let gradientStops = [];
            const step = 100 / (selectedColors.length);

            for (let i = 0; i < selectedColors.length; i++) {
                if (i === 0){
                    gradientStops.push(`${selectedColors[i]} ${step}%`);
                }
                else {
                    gradientStops.push(`${selectedColors[i]} ${(i) * step}%, ${selectedColors[i]} ${(i + 1) * step}%`);
                }
            }

            cell.style.background = `linear-gradient(to right, ${gradientStops.join(', ')})`;
        }
        else{
            cell.style.background = selectedColors.pop();
        }

        if (hasLightGrey){
            cell.style.background = '';
        }
    });
    updateInteractionCounter();
}

function linkCheckboxesToMethods(){
    for (const checkbox in checkboxes) {
    }
    return null
}

function closePopup() {
    document.getElementById('popupOverlay').style.display = 'none';
    document.body.style.overflow = 'auto'; // Re-enable scrolling
}

function redirectToLink() {
    window.location.href = 'https://www.example.com';
}

function toggleInfoPanel() {
    const panel = document.getElementById('infoPanel');
    if (panel.classList.contains('open')) {
        panel.classList.remove('open');
    } else {
        panel.classList.add('open');
    }
}

function updateInteractionCounter(){
    const matrixText = document.getElementById("matrix").innerText;
    const count = "✓";
    document.getElementById("interaction_counter").innerHTML = "<strong>" + (matrixText.split(count).length - 1) + "<strong>";
}

document.addEventListener("DOMContentLoaded", () => {

    const rowLabels = ["¬H", "H", "¬G", "G", "¬F", "F", "¬E", "E", "¬D", "D", "¬C", "C", "¬B", "B"];
    const colLabels = ["A", "¬A", "B", "¬B", "C", "¬C", "D", "¬D", "E", "¬E", "F", "¬F", "G", "¬G"];

    // Create the upper triangular matrix with specified labels
    for (let i = 0; i <= matrixSize; i++) {
        const row = table.insertRow();
        for (let j = 0; j <= matrixSize; j++) {
            const cell = row.insertCell();
            if (i === 0 && j > 0) {
                // Top row labels
                cell.textContent = colLabels[j - 1];
            } else if (j === 0 && i > 0) {
                // Left column labels
                cell.textContent = rowLabels[i - 1];
            } else if (i > 0 && j > 0) {
                // Add class to manage colors
                cell.classList.add('colored');
                cell.innerHTML = "&#10003;";
            }
        }
    }

    document.getElementById("checkbox1").addEventListener("input", (event) => {
        event.target.checked ? colorCells(core, "1") : removeColor(core, "1");
    });

    document.getElementById("checkbox2").addEventListener("input", (event) => {
        event.target.checked ? colorCells(dead, "2") : removeColor(dead, "2");
    });

    document.getElementById("checkbox3").addEventListener("input", (event) => {
        event.target.checked ? colorCells(ASL_include, "3_1") : removeColor(ASL_include, "3_1");
        event.target.checked ? colorCells(ASL_exclude, "3_2") : removeColor(ASL_exclude, "3_2");
    });

    document.getElementById("checkbox4").addEventListener("input", (event) => {
        event.target.checked ? colorCells(ASF_include, "4_1") : removeColor(ASF_include, "4_1");
        event.target.checked ? colorCells(ASF_exclude, "4_2") : removeColor(ASF_exclude, "4_2");
    });
    document.getElementById("checkbox5").addEventListener("input", (event) => {
        event.target.checked ? colorCells(Abstract, "5") : removeColor(Abstract, "5");
    });
    document.getElementById("checkbox6").addEventListener("input", (event) => {
        event.target.checked ? colorCells(PC, "7") : removeColor(PC, "7");
    });

    hideCells(hideCoordinates);
    exclude_invalid(invalidCoordinates);
});
