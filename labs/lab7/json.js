document.getElementById("loadBtn").addEventListener("click", async function () {
    this.disabled = true;

    try {
        //const response = await fetch("https://itest.com.vn/lects/webappdev/json/data/");
        const response = await fetch("./data.json");
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

        const users = await response.json();
        const tbody = document.querySelector("#tbl tbody");
        //tbody.innerHTML = "";

        users.forEach(user => {
            console.log("user...");
            const row = document.createElement("tr");

            const nameCell = document.createElement("td");
            nameCell.textContent = user.name;

            const ageCell = document.createElement("td");
            ageCell.textContent = user.age;

            const carsCell = document.createElement("td");
            carsCell.innerHTML = `
                ${user.cars.length} <br>
                ${user.cars.map(c => `${c.name} - ${c.models.join(", ")}`).join("<br>")}
            `;

            row.append(nameCell, ageCell, carsCell);
            tbody.appendChild(row);
        });

    } catch (err) {
        console.error("Failed to load data:", err);
    }
});
