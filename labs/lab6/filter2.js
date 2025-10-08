
const minRange = document.getElementById('itest-min-range');
const maxRange = document.getElementById('itest-max-range');
const range = document.getElementById('itest-range');
const rangeValue = document.getElementById('itest-range-value');

function saveRangeToStorage(min, max) {
    localStorage.setItem('itest_range_min', min);
    localStorage.setItem('itest_range_max', max);
}

function loadRangeFromStorage() {
    const min = localStorage.getItem('itest_range_min');
    const max = localStorage.getItem('itest_range_max');
    return (min !== null && max !== null) ? [parseInt(min), parseInt(max)] : null;
}


function updateRange() {
    let min = parseInt(minRange.value);
    let max = parseInt(maxRange.value);

    if (max < min + 5) {
        if (event.target === minRange) {
            minRange.value = max - 5;
        } else {
            maxRange.value = min + 5;
        }
        min = parseInt(minRange.value);
        max = parseInt(maxRange.value);
    }

    const percent1 = (min / 100) * 100;
    const percent2 = (max / 100) * 100;

    range.style.left = percent1 + '%';
    range.style.width = (percent2 - percent1) + '%';
    rangeValue.textContent = `${min}% đến ${max}%`;
}

minRange.addEventListener('input', updateRange);
maxRange.addEventListener('input', updateRange);

const saved = loadRangeFromStorage();
if (saved) {
    const [min, max] = saved;
    minRange.value = min;
    maxRange.value = max;
}

updateRange();

function onRangeSelected(min, max) {
    const tbl = document.querySelectorAll("table.q-c");
    let c = 0;
    let c0 = 0;
    let okiec = 0;
    for (let i = 0; i < tbl.length; i++) {
        tbl[i].classList.add("okiedisplay");
        if (tbl[i].parentNode.parentNode.classList.contains("nodisplay-i")) {
            tbl[i].classList.add("nodisplay");
            tbl[i].classList.remove("okiedisplay");
            c0++;
        } else {
            let shit = tbl[i].querySelector("tr.stat td span.qus span.s-hit span:nth-of-type(2)");
            if (shit) {
                const percent = parseInt(shit.textContent.match(/(\d+)%/)[1], 10);
                if (percent < min || percent > max) {
                    tbl[i].classList.add("nodisplay");
                    tbl[i].classList.remove("okiedisplay");
                    c++;
                }
                else {
                    tbl[i].classList.remove("nodisplay");
                }
            }
        }
        if (tbl[i].classList.contains("okiedisplay")) {
            okiec++;
            tbl[i].querySelector("tr.h td:nth-of-type(1)").textContent = `Câu ${okiec}.`;
        }
    }
    saveRangeToStorage(min, max);
    document.querySelector("span.itest-no-c").textContent = `${tbl.length - c - c0}/${tbl.length - c0}`;
}

function handleChangeEnd() {
    const min = parseInt(minRange.value);
    const max = parseInt(maxRange.value);
    onRangeSelected(min, max);
}

minRange.addEventListener('change', handleChangeEnd);
maxRange.addEventListener('change', handleChangeEnd);

if (saved) {
    const [min, max] = saved;
    onRangeSelected(min, max);
} else {
    onRangeSelected(0, 100);
}
