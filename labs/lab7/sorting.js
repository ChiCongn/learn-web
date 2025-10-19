document.addEventListener("DOMContentLoaded", () => {
    const tables = document.querySelectorAll("table.sortable");

    tables.forEach(table => {
        const headers = table.querySelectorAll("th");

        headers.forEach((header, index) => {
            if (!header.classList.contains("sortcol")) return;
            
            header.innerHTML += '<span class="arrow"></span>';

            header.addEventListener("click", () => {
                console.log(`Sort column ${index}`);
                const isAscending = header.classList.toggle("asc");
                headers.forEach(h => h !== header && h.classList.remove("asc", "desc"));
                header.classList.toggle("desc", !isAscending);

                const rows = table.querySelectorAll("tbody tr");
                const n = rows.length;

                for (let i = 0; i < n; i++) {
                    let best = rows[i].cells[index].textContent.trim().toLowerCase();
                    let bestIndex = i;

                    for (let j = i + 1; j < n; j++) {
                        const val = rows[j].cells[index].textContent.trim().toLowerCase();
                        if ((isAscending && val < best) || (!isAscending && val > best)) {
                            bestIndex = j;
                            best = val;
                        }
                    }

                    if (i === bestIndex) continue;

                    for (let k = 1; k < rows[i].cells.length; k++) {
						const tmp = rows[i].cells[k].innerHTML;
						rows[i].cells[k].innerHTML = rows[bestIndex].cells[k].innerHTML;
						rows[bestIndex].cells[k].innerHTML = tmp;
					}	
                }
            });
        });
    });
});
