let fields = [
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
]



function init() {
    render();
    addClickHandlers();
}

function addClickHandlers() {
    const cells = document.querySelectorAll("td");
    cells.forEach((cell, index) => {
        cell.setAttribute("onclick", `handleCellClick(${index})`);
    });
}

function handleCellClick(index) {
    const fieldValue = fields[index];
    if (!fieldValue) {
        fields[index] = isCrossTurn() ? "cross" : "circle";
        renderSpecificCell(index);
        disableCellClick(index);
    }
}

function disableCellClick(index) {
    const cell = document.querySelectorAll("td")[index];
    cell.removeAttribute("onclick");
}

function renderSpecificCell(index) {
    const cell = document.querySelectorAll("td")[index];
    const fieldValue = fields[index];
    cell.innerHTML = fieldValue === "cross" ? generateCrossSVG() : fieldValue === "circle" ? generateCircleSVG() : "";
}

function isCrossTurn() {
    const crossCount = fields.filter(value => value === "cross").length;
    const circleCount = fields.filter(value => value === "circle").length;
    return crossCount === circleCount;
}



function render() {
    const contentDiv = document.getElementById("content");
    
    let tableHtml = '<table>';
    let cellIndex = 0;
    for (let i = 0; i < 3; i++) {
        tableHtml += '<tr>';
        for (let j = 0; j < 3; j++) {
            const fieldValue = fields[cellIndex];
            tableHtml += `<td>${fieldValue === "cross" ? generateCrossSVG() : fieldValue === "circle" ? generateCircleSVG() : ""}</td>`;
            cellIndex++;
        }
        tableHtml += '</tr>';
    }
    tableHtml += '</table>';
    
    contentDiv.innerHTML = tableHtml;
    
}

function generateCircleSVG() {
    const svgCode = `
        <div class="circle">
        <svg width="70" height="70" xmlns="http://www.w3.org/2000/svg">
    <circle cx="35" cy="35" r="30" fill="none" stroke="#00a8e8" stroke-width="5">
        <animate attributeName="r" from="0" to="30" dur="400ms" fill="freeze" begin="0s;animation2.end" />
        <animate attributeName="stroke-dasharray" from="0 188.5" to="188.5 0" dur="0.5ms" fill="freeze" begin="0s;animation2.end" />
    </circle>
</svg>
        </div>
    `;
    return svgCode;
}

function generateCrossSVG() {
    const svgCode = `
        <svg width="70" height="70" xmlns="http://www.w3.org/2000/svg">
            <line x1="10" y1="10" x2="60" y2="60" stroke="#FFC000" stroke-width="5">
                <animate attributeName="x2" from="10" to="60" dur="400ms" fill="freeze" />
                <animate attributeName="y2" from="10" to="60" dur="400ms" fill="freeze" />
            </line>
            <line x1="60" y1="10" x2="10" y2="60" stroke="#FFC000" stroke-width="5">
                <animate attributeName="x2" from="60" to="10" dur="400ms" fill="freeze" />
                <animate attributeName="y2" from="10" to="60" dur="400ms" fill="freeze" />
            </line>
        </svg>
    `;
    return svgCode;
}






