document.getElementById("loadBtn").onclick = function () {
    this.disabled = true;

    const xmlhttp = getXmlHttpObject();
    const tbody = document.querySelector("#tbl tbody");

    xmlhttp.onreadystatechange = function () {
        if (this.readyState !== 4) return;       // request finished and response is ready 
        if (this.status !== 200) return;        

        try {
            console.log("responseText:");
            console.log(this.responseText);
            const users = JSON.parse(this.responseText);
            console.log("users:");
            console.log(users);
            tbody.innerHTML = "";

            users.forEach(user => {
                const row = document.createElement("tr");

                const nameCell = document.createElement("td");
                nameCell.textContent = user.name;

                const ageCell = document.createElement("td");
                ageCell.textContent = user.age;

                const carsCell = document.createElement("td");
                carsCell.innerHTML = `
                    ${user.cars.length}<br>
                    ${user.cars.map(c => `${c.name} - ${c.models.join(", ")}`).join("<br>")}
                `;

                row.append(nameCell, ageCell, carsCell);
                tbody.appendChild(row);
            });

        } catch (err) {
            console.error("Invalid JSON:", err);
        }
    };

    xmlhttp.open("GET", "data.json", true); // method, url, async, user, password
    xmlhttp.send(null);
};


function getXmlHttpObject() {
    let xmlhttp = null;
    try {
        xmlhttp = new XMLHttpRequest(); 
    } catch (e) {
        try {
            xmlhttp = new ActiveXObject("Msxml2.XMLHTTP"); 
        } catch (e) {
            try {
                xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
            } catch (e) {
                console.log("Trình duyệt không hỗ trợ AJAX!");
            }
        }
    }
    return xmlhttp;
}
