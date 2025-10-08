const minRange = document.getElementById('min-range');
const maxRange = document.getElementById('max-range');
const rangeBar = document.getElementById('range');
const rangeValueText = document.getElementById('range-value');

// === Local Storage Utils ===
function saveRange(min, max) {
	localStorage.setItem('range_min', min);
	localStorage.setItem('range_max', max);
}

function loadRange() {
	const min = localStorage.getItem('range_min');
	const max = localStorage.getItem('range_max');
	return (min && max) ? [Number(min), Number(max)] : null;
}

// === UI Update for Slider Range ===
function updateRange(event) {
	let min = Number(minRange.value);
	let max = Number(maxRange.value);

	// prevent overlap: ensure at least 5% distance
	if (max < min + 5) {
		if (event.target === minRange) minRange.value = max - 5;
		else maxRange.value = min + 5;

		min = Number(minRange.value);
		max = Number(maxRange.value);
	}

	rangeBar.style.left = `${min}%`;
	rangeBar.style.width = `${max - min}%`;

	rangeValueText.textContent = `${min}% đến ${max}%`;
}

[minRange, maxRange].forEach(el => el.addEventListener('input', updateRange));

const savedRange = loadRange();
if (savedRange) {
	const [min, max] = savedRange;
	minRange.value = min;
	maxRange.value = max;
}
updateRange({ target: minRange });

// === Filter logic when range is confirmed ===
function onRangeSelected(min, max) {
	const tables = document.querySelectorAll("table.q-c");
	let hiddenCount = 0;
	let hiddenPartCount = 0;
	let visibleCount = 0;

	tables.forEach((table, index) => {
		table.classList.add("okiedisplay");

		// Skip hidden sections
		if (table.parentNode.parentNode.classList.contains("nodisplay-i")) {
			table.classList.add("nodisplay");
			table.classList.remove("okiedisplay");
			hiddenPartCount++;
			return;
		}

		// Extract percentage of correct answers
		const percentEl = table.querySelector("tr.stat td span.qus span.s-hit span:nth-of-type(2)");
		if (percentEl) {
			const percent = parseInt(percentEl.textContent.match(/(\d+)%/)[1], 10);
			if (percent < min || percent > max) {
				table.classList.add("nodisplay");
				table.classList.remove("okiedisplay");
				hiddenCount++;
			} else {
				table.classList.remove("nodisplay");
			}
		}

		if (table.classList.contains("okiedisplay")) {
			visibleCount++;
			table.querySelector("tr.h td:first-of-type").textContent = `Câu ${visibleCount}.`;
		}
	});

	saveRange(min, max);

	const totalVisible = tables.length - hiddenPartCount;
	document.querySelector("span.itest-no-c").textContent = `${totalVisible - hiddenCount}/${totalVisible}`;
}

// apply filter when stoping sliding
[minRange, maxRange].forEach(el => el.addEventListener('change', () => {
	onRangeSelected(Number(minRange.value), Number(maxRange.value));
}));


if (savedRange) {
	onRangeSelected(savedRange[0], savedRange[1]);
} else {
	onRangeSelected(0, 100);
}
