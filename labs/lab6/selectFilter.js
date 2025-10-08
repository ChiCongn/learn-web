function addTQGFilter() {
	const rfg = document.querySelectorAll("h3.rfg:has(+ div.rfg table.q-c.okiedisplay)");
	if (rfg.length < 2) return;
	let sel = document.createElement("select");
	sel.classList.add("form-control");
	sel.style.width = "250px";
	sel.style.display = "inline";
	sel.style.position = "absolute";
	sel.style.right = "2.41rem";
	sel.style.top = "4.5rem";
	let opt = document.createElement("option");
	opt.value = "0";
	opt.textContent = "Tất cả phần thi";
	sel.appendChild(opt);
	document.querySelector("div#controlPanel").appendChild(sel);
	for (let i = 0; i < rfg.length; i++) {
		opt = document.createElement("option");
		opt.value = rfg[i].className.toString().replace(/[a-z\s\-]/gi, "");
		opt.textContent = rfg[i].textContent;
		sel.appendChild(opt);
	}
	sel.onchange = function() {
		const v = this.value;
		let items = document.querySelectorAll(":is(h3.rfg, div.rfg)");
		for (let i = 0; i < items.length; i++) {
			if (v == "0" || items[i].classList.contains("rfg-"+v)) { 
				items[i].classList.remove("nodisplay");
				items[i].classList.remove("nodisplay-i");
			}else {
				items[i].classList.add("nodisplay");
				items[i].classList.add("nodisplay-i");
			}
		}
		const saved = loadRangeFromStorage();
		if (saved) {
			const [min, max] = saved;
			onRangeSelected(min, max);
		}
	};
}
addTQGFilter();
