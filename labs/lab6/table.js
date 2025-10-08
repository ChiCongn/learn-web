
document.addEventListener("DOMContentLoaded", () => {
    const selects = [...document.querySelectorAll('[name="select"]')];
    const groupOp = document.querySelector("div.group-op");
    const selectAll = document.getElementById("select-all");

    selects.forEach(select => {
        select.onchange = function () {
            if (select.checked) {
                this.parentNode.parentNode.classList.add("selectedr");
            } else {
                this.parentNode.parentNode.classList.remove("selectedr");
            }

            const allChecked = selects.every(sel => sel.checked);
            const anyChecked = selects.some(sel => sel.checked);

            selectAll.checked = allChecked;
            groupOp.classList.toggle("nodisplay", !anyChecked);
        };
    });
});


document.getElementById("select-all").onchange = function() {
	const selects = document.querySelectorAll('[name="select"]');	
    selects.forEach(sel => {
        sel.checked = this.checked;
        if (sel.checked) {
            sel.parentNode.parentNode.classList.add("selectedr");
        } else {
            sel.parentNode.parentNode.classList.remove("selectedr");
        }
    });	
	
	if (this.checked) {
        document.querySelector("div.group-op").classList.remove("nodisplay");
    } else {
        document.querySelector("div.group-op").classList.add("nodisplay");
    }
};


document.querySelector(".group-op-delete").onclick = function() {
    const selects = document.querySelectorAll('[name="select"]');	
    selects.forEach(sel => {
        if (sel.checked) {
            sel.parentNode.parentNode.parentNode.removeChild(sel.parentNode.parentNode);
        }
    });	
};

