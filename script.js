const matrixTypes = Object.freeze({
    INVALID: Symbol("invalid"),
    COVERED_S1: Symbol("covered s1"),
    COVERED_S2: Symbol("covered s2"),
    UNCOVERED: Symbol("uncovered"),
    EXCLUDED: Symbol("excluded"),
    HIDDEN: Symbol("hidden"),
    HEADER: Symbol("header")
});

const matrixSize = 15;
const MATRIX_COL_LABELS = ["A", "¬A", "B", "¬B", "C", "¬C", "D", "¬D", "E", "¬E", "F", "¬F", "G", "¬G"];
const MATRIX_ROW_LABELS = ["¬H", "H", "¬G", "G", "¬F", "F", "¬E", "E", "¬D", "D", "¬C", "C", "¬B", "B"];

const TABLE_CONTAINER = document.getElementById("matrixContainer");

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

const C = {
    coordinates: [
        ...Array.from({length: 14}, (_, i) => [1 + i, 1])
    ],
    checkbox: document.getElementById("C"),
    color: 'rgba(0,0,0,0.5)'
}
const D = {
    coordinates: [
        ...Array.from({length: 6}, (_, i) => [9, 1 + i]),
        ...Array.from({length: 8}, (_, i) => [1 + i, 8])
    ],
    checkbox: document.getElementById("D"),
    color: 'rgba(230,159,0,0.5)'
}
const AFS = {
    coordinates: [
        ...Array.from({length: 6}, (_, i) => [1 + i, 9]),
        ...Array.from({length: 6}, (_, i) => [1 + i, 10]),
        ...Array.from({length: 8}, (_, i) => [7, 1 + i]),
        ...Array.from({length: 8}, (_, i) => [8, 1 + i]),
    ],
    include: [
        ...Array.from({length: 10}, (_, i) => [1 + i, 6]),
        ...Array.from({length: 10}, (_, i) => [1 + i, 5]),
        ...Array.from({length: 10}, (_, i) => [11, 1 + i]),
        ...Array.from({length: 10}, (_, i) => [12, 1 + i]),
    ],
    checkbox: document.getElementById("AFS"),
    color: 'rgba(0,158,115,0.5)'
}
const ALS = {
    coordinates: [
        ...Array.from({length: 8}, (_, i) => [1 + i, 8]),
        ...Array.from({length: 6}, (_, i) => [1 + i, 9]),
        ...Array.from({length: 6}, (_, i) => [1 + i, 10]),
        ...Array.from({length: 6}, (_, i) => [7, 1 + i]),
        ...Array.from({length: 6}, (_, i) => [8, 1 + i]),
        ...Array.from({length: 6}, (_, i) => [9, 1 + i]),
    ],
    include: [
        ...Array.from({length: 6}, (_, i) => [1 + i, 1]),
        ...Array.from({length: 4}, (_, i) => [11 + i, 1]),
        ...Array.from({length: 6}, (_, i) => [1 + i, 5]),
        ...Array.from({length: 6}, (_, i) => [1 + i, 6]),
        [11, 3],
        [11, 4],
        [12, 3]
        // ...Array.from({length: 10}, (_, i) => [1 + i, 6]),
        // ...Array.from({length: 10}, (_, i) => [1 + i, 5]),
        // ...Array.from({length: 14}, (_, i) => [1 + i, 1]),
        // ...Array.from({length: 10}, (_, i) => [11, 1 + i]),
        // ...Array.from({length: 10}, (_, i) => [12, 1 + i]),
    ],
    checkbox: document.getElementById("ALS"),
    color: 'rgba(86,180,233,0.5)'
}
const AF = {
    coordinates: [
        ...Array.from({length: 12}, (_, i) => [1 + i, 3]),
        ...Array.from({length: 12}, (_, i) => [1 + i, 4]),
        ...Array.from({length: 2}, (_, i) => [13, 1 + i]),
        ...Array.from({length: 2}, (_, i) => [14, 1 + i])
    ],
    checkbox: document.getElementById("AF"),
    color: 'rgba(240,228,66,0.5)'
}
const PCI = {
    coordinates: [
        ...Array.from({length: 14}, (_, i) => [2 * i, 1]),
        ...Array.from({length: 2}, (_, i) => [6 + 2 * i, 3]),
        ...Array.from({length: 3}, (_, i) => [2 * i, 5]),
    ],
    checkbox: document.getElementById("PCI"),
    color: 'rgba(213,94,0,0.5)'
}
const FILTER = [C, D, AFS, ALS, AF, PCI]

const ASF_INCLUDE = [
    ...Array.from({length: 10}, (_, i) => [1 + i, 6]),
    ...Array.from({length: 10}, (_, i) => [1 + i, 5]),
    ...Array.from({length: 10}, (_, i) => [11, 1 + i]),
    ...Array.from({length: 10}, (_, i) => [12, 1 + i]),
]
const ASF_EXCLUDE = [
    ...Array.from({length: 6}, (_, i) => [1 + i, 9]),
    ...Array.from({length: 6}, (_, i) => [1 + i, 10]),
    ...Array.from({length: 8}, (_, i) => [7, 1 + i]),
    ...Array.from({length: 8}, (_, i) => [8, 1 + i]),
]
const ASL_INCLUDE = [
    ...Array.from({length: 10}, (_, i) => [1 + i, 6]),
    ...Array.from({length: 10}, (_, i) => [1 + i, 5]),
    ...Array.from({length: 14}, (_, i) => [1 + i, 1]),
    ...Array.from({length: 10}, (_, i) => [11, 1 + i]),
    ...Array.from({length: 10}, (_, i) => [12, 1 + i]),
]
const ASL_EXCLUDE = [
    ...Array.from({length: 6}, (_, i) => [1 + i, 9]),
    ...Array.from({length: 6}, (_, i) => [1 + i, 10]),
    ...Array.from({length: 8}, (_, i) => [7, 1 + i]),
    ...Array.from({length: 8}, (_, i) => [8, 1 + i]),
    // ...Array.from({length: 14}, (_, i) => [1 + i, 1]),
    ...Array.from({length: 6}, (_, i) => [9, 1 + i]),
    ...Array.from({length: 8}, (_, i) => [1 + i, 8]),
]


const SAMPLE_1 = {
    coordinates: [
        [1, 1], [1, 2], [1, 3],         [1, 4], [1, 5], [1, 6], [1, 7], [1, 8], [1, 9], [1, 10],          [1, 12], [1, 13], [1, 14],
                [2, 2],                 [2, 4],         [2, 6], [2, 7],                 [2, 10],                   [2, 13],
        [3, 1], [3, 2],                 [3, 4],         [3, 6], [3, 7], [3, 8],         [3, 10],          [3, 12], [3, 13], [3, 14],
        [4, 1], [4, 2], [4, 3],         [4, 4], [4, 5], [4, 6], [4, 7], [4, 8], [4, 9], [4, 10],          [4, 12], [4, 13], [4, 14],
        [5, 1], [5, 2], [5, 3],         [5, 4], [5, 5], [5, 6], [5, 7], [5, 8], [5, 9], [5, 10],          [5, 12], [5, 13], [5, 14],
                [6, 2],                 [6, 4],                 [6, 7],                                   [6, 12], [6, 13], [6, 14],
        [7, 1], [7, 2],                 [7, 4], [7, 5], [7, 6], [7, 7], [7, 8], [7, 9], [7, 10],          [7, 12], [7, 13], [7, 14],
        [8, 1], [8, 2], [8, 3],         [8, 4], [8, 5],         [8, 7], [8, 8], [8, 9], [8, 10], [8, 11], [8, 12], [8, 13], [8, 14],
        [9, 1], [9, 2], [9, 3],         [9, 4], [9, 5], [9, 6], [9, 7], [9, 8], [9, 9], [9, 10], [9, 11], [9, 12], [9, 13], [9, 14],
        [10, 1], [10, 2], [10, 3],      [10, 4], [10, 5], [10, 6], [10, 7], [10, 8], [10, 9], [10, 10], [10, 11], [10, 12], [10, 13], [10, 14],
        [11, 1], [11, 2],               [11, 4], [11, 5], [11, 6], [11, 7], [11, 8], [11, 9], [11, 10], [11, 11], [11, 12], [11, 13], [11, 14],
        [12, 1], [12, 2], [12, 3],      [12, 4], [12, 5], [12, 6], [12, 7], [12, 8], [12, 9], [12, 10], [12, 11], [12, 12], [12, 13], [12, 14],
        [13, 1], [13, 2], [13, 3],      [13, 4], [13, 5], [13, 6], [13, 7], [13, 8], [13, 9], [13, 10], [13, 11], [13, 12], [13, 13], [13, 14],
        [14, 1], [14, 2], [14, 3],      [14, 4], [14, 5], [14, 6], [14, 7], [14, 8], [14, 9], [14, 10], [14, 11], [14, 12], [14, 13], [14, 14]

        // c1 = {A, ¬B,¬C, ¬D, ¬E,¬F,¬G, ¬H}
        // c2 ={A, B, C,¬D, E,¬F,G, ¬H}
    ],
    button: document.getElementById("s1"),
    matrixType: matrixTypes.COVERED_S1,
};


// c3 = {A,B, C,¬D, E,¬F,¬G,H}
// c4 = {A,B, C,¬D, E, F,G,¬H}}
const SAMPLE_2 = {
    coordinates: [
        [1, 1], [1, 2], [1, 3],         [1, 5],         [1, 7], [1, 8], [1, 9],         [1, 11],         [1, 13],
        [2, 1], [2, 2], [2, 3],         [2, 5],         [2, 7], [2, 8], [2, 9],                 [2, 12], [2, 13], [2, 14],
        [3, 1], [3, 2], [3, 3],         [3, 5],         [3, 7], [3, 8], [3, 9],                 [3, 12], [3, 13], [3, 14],
        [4, 1], [4, 2], [4, 3],         [4, 5],         [4, 7], [4, 8], [4, 9],         [4, 11],         [4, 13], [4, 14],
        [5, 1], [5, 2], [5, 3],         [5, 5],         [5, 7], [5, 8], [5, 9],         [5, 11], [5, 12], [5, 13], [5, 14],
        [6, 1], [6, 2], [6, 3],         [6, 5],         [6, 7], [6, 8], [6, 9],         [6, 11], [6, 12], [6, 13], [6, 14],
                [7, 2],                 [7, 5],         [7, 7],         [7, 9],         [7, 11], [7, 12], [7, 13], [7, 14],
        [8, 1], [8, 2], [8, 3],         [8, 5],         [8, 7], [8, 8], [8, 9],         [8, 11], [8, 12], [8, 13], [8, 14],
        [9, 1], [9, 2], [9, 3],         [9, 5],         [9, 7], [9, 8], [9, 9],         [9, 11], [9, 12], [9, 13], [9, 14],
        [10, 1], [10, 2], [10, 3],         [10, 5],          [10, 7], [10, 8],         [10, 10], [10, 11], [10, 12], [10, 13], [10, 14],
                 [11, 2],                 [11, 5],         [11, 7], [11, 8], [11, 9], [11, 10], [11, 11], [11, 12], [11, 13], [11, 14],
        [12, 1], [12, 2], [12, 3],         [12, 5],          [12, 7], [12, 8], [12, 9], [12, 10], [12, 11], [12, 12], [12, 13], [12, 14],
                 [13, 2], [13, 3], [13, 4], [13, 5],         [13, 7], [13, 8], [13, 9], [13, 10], [13, 11], [13, 12], [13, 13], [13, 14],
        [14, 1], [14, 2], [14, 3], [14, 4], [14, 5],         [14, 7], [14, 8], [14, 9], [14, 10], [14, 11], [14, 12], [14, 13], [14, 14]
    ],
    button: document.getElementById("s2"),
    matrixType: matrixTypes.COVERED_S2,
};
const SAMPLES = [SAMPLE_1, SAMPLE_2];


function update() {
    let matrix = createMatrix();
    matrix = exclude_invalid(matrix);
    let activeFilters = FILTER.filter((e) => e.checkbox.checked);
    activeFilters.forEach((filter) => {
        filterMatrix(matrix, filter);
    });
    SAMPLES.forEach(sample => {
        matrix = cover(matrix, sample);
    });

    let interactionCount = 0;
    let coveredInteractionCountS1 = 0;
    let coveredInteractionCountS2 = 0;
    [interactionCount, coveredInteractionCountS1, coveredInteractionCountS2] = countInteractions(matrix);
    let table = matrixToTable(matrix);
    while (TABLE_CONTAINER.firstChild) {
        TABLE_CONTAINER.firstChild.remove()
    }
    TABLE_CONTAINER.appendChild(table);

    document.querySelector('#s1-cov').innerHTML = coveredInteractionCountS1 + '/' + interactionCount
        + " = <strong>" + Math.ceil(((coveredInteractionCountS1 / interactionCount) + Number.EPSILON) * 100) + "%</strong>";
    document.querySelector('#s2-cov').innerHTML = coveredInteractionCountS2 + '/' + interactionCount
        + " = <strong>" + Math.ceil(((coveredInteractionCountS2 / interactionCount) + Number.EPSILON) * 100) + "%</strong>";
}

function createMatrix() {
    let matrix = new Array(matrixSize);

    for (let i = 0; i < matrix.length; i++) {
        matrix[i] = new Array(matrixSize);
        for (let j = 0; j < matrixSize; j++) {
            matrix[i][j] = {
                matrixType: matrixTypes.UNCOVERED,
                label: "&#10006;",
                coveredByS1: false,
                coveredByS2: false,
                bgColors: [],
            };
        }
    }

    // set labels
    let colLabels = [""].concat(MATRIX_COL_LABELS);
    for (let i = 0; i < colLabels.length; i++) {
        matrix[0][i].matrixType = matrixTypes.HEADER;
        matrix[0][i].label = colLabels[i];
    }

    for (let i = 1; i <= MATRIX_ROW_LABELS.length; i++) {
        matrix[i][0].matrixType = matrixTypes.HEADER;
        matrix[i][0].label = MATRIX_ROW_LABELS[i - 1];
    }

    matrix = hideCells(matrix, hideCoordinates);

    return matrix;
}

function exclude_invalid(matrix) {
    invalidCoordinates.forEach(([row, col]) => {
        if (row > 0 && col > 0 && row < matrix.length && col < matrix[row].length) {
            matrix[row][col].matrixType = matrixTypes.INVALID;
            matrix[row][col].bgColors = ['lightgrey'];
            matrix[row][col].label = "";
        }
    });
    return matrix;
}

function filterMatrix(matrix, filter) {
    filter.coordinates.forEach(([row, col]) => {
        if (row > 0 && col > 0 && row <= matrixSize && col <= matrixSize) {
            if (matrix[row][col].matrixType !== matrixTypes.INVALID
                && matrix[row][col].matrixType !== matrixTypes.HIDDEN) {
                matrix[row][col].matrixType = matrixTypes.EXCLUDED;
                matrix[row][col].bgColors = matrix[row][col].bgColors.concat(filter.color);
                matrix[row][col].label = "";
            }
        }
    });

    if (filter.include) {
        filter.include.forEach(([row, col]) => {
            if (row > 0 && col > 0 && row <= matrixSize && col <= matrixSize) {
                if (matrix[row][col].matrixType !== matrixTypes.INVALID
                    && matrix[row][col].matrixType !== matrixTypes.HIDDEN
                    && matrix[row][col].matrixType !== matrixTypes.EXCLUDED) {
                    matrix[row][col].matrixType = matrixTypes.UNCOVERED;
                    matrix[row][col].bgColors = matrix[row][col].bgColors.concat(filter.color);
                }
            }
        });
    }
}

function matrixToTable(matrix) {
    let table = document.createElement("table");
    table.setAttribute("id", "matrix");
    matrix.forEach((row) => {
        let tr = document.createElement("tr");
        row.forEach((entry) => {
            let td = document.createElement("td");
            if (entry.matrixType !== matrixTypes.HIDDEN) {
                td.innerHTML = entry.label;
                td.style.background = getGradient(entry.bgColors);
                tr.appendChild(td);
            } else {
                td.style.display = 'none';
            }
            tr.appendChild(td);
        })
        table.appendChild(tr);
    });
    return table;
}

function cover(matrix, sample) {
    sample.coordinates.forEach(([row, col]) => {
        if (row > 0 && col > 0 && row <= matrixSize && col <= matrixSize) {
            if (matrix[row][col].matrixType !== matrixTypes.INVALID
                && matrix[row][col].matrixType !== matrixTypes.HIDDEN
                && matrix[row][col].matrixType !== matrixTypes.EXCLUDED) {
                matrix[row][col].matrixType = sample.matrixType;
                if (sample.matrixType === matrixTypes.COVERED_S1) {
                    matrix[row][col].coveredByS1 = true;
                }
                if (sample.matrixType === matrixTypes.COVERED_S2) {
                    matrix[row][col].coveredByS2 = true;
                }
                if (sample.button.checked) {
                    matrix[row][col].label = "&#10004;";
                }
            }
        }
    });
    return matrix;
}

function countInteractions(matrix) {
    let interactions = 0;
    let interactionsS1 = 0;
    let interactionsS2 = 0;
    matrix.forEach((row) => {
        row.forEach((entry) => {
            if (entry.matrixType !== matrixTypes.INVALID
                && entry.matrixType !== matrixTypes.HIDDEN
                && entry.matrixType !== matrixTypes.EXCLUDED
                && entry.matrixType !== matrixTypes.HEADER) {
                interactions++;
                if (entry.coveredByS1) {
                    interactionsS1++;
                }
                if (entry.coveredByS2) {
                    interactionsS2++;
                }
            }
        });
    });
    return [interactions, interactionsS1, interactionsS2];
}

function getGradient(colors) {
    if (colors.length === 0) {
        colors = ["white"];
    }
    if (colors.length > 1) {
        let gradientStops = [];
        const step = 100 / (colors.length);

        for (let i = 0; i < colors.length; i++) {
            if (i === 0) {
                gradientStops.push(`${colors[i]} ${step}%`);
            } else {
                gradientStops.push(`${colors[i]} ${(i) * step}%, ${colors[i]} ${(i + 1) * step}%`);
            }
        }
        return `linear-gradient(to right, ${gradientStops.join(', ')})`;
    } else {
        return colors.pop();
    }
}

function hideCells(matrix, coordinates) {
    hideCoordinates.forEach(([row, col]) => {
        if (row > 0 && col > 0 && row <= matrixSize && col <= matrixSize) {
            matrix[row][col].matrixType = matrixTypes.HIDDEN;
            // cell.style.display = 'none';
        }
    });
    return matrix;
}

document.addEventListener("DOMContentLoaded", () => {
    update();
});
