const cells = document.querySelectorAll(".portalModTd");
const content = document.querySelector("#content");

cells.forEach(cell => {
    cell.addEventListener("click", () => {
        cells.forEach(c => c.className="portalModTd");
        cell.className="portalModTdSelected";
        content.textContent = cell.textContent;
    })
});