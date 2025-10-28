// 	
//	Hàm đồng bộ
//	Hàm này chỉ có ý nghĩa demo cho một tác vụ nào đó
//  
function sFunction() {
    return ("Hello S!");
}
//
//	Hàm này viết lại sFunction() nhưng được thực hiện không đồng bộ
//	bằng cách tạo và trả về Promise một cách tường minh
//
function aFunction1() {
    console.log("A1");
    return new Promise(function (fulfill, reject) {
        fulfill("Hello A1!");
    });
}
//	
//	Hàm này là viết lại aFunction() bằng viêc sử dụng từ khóa async 
//	Promise được tạo và trả về một cách không tường minh
//	
async function aFunction2() {
    console.log("A2");
    return ("Hello A2!");
}
// 
//	Thêm p vào div.output
//
function output(txt) {
    let target = document.querySelector(".output");
    let p = document.createElement('p');
    p.textContent = txt;
    target.appendChild(p);
}
// 
//	Xóa nội dung div.output
//
function clearOutput() {
    document.querySelector(".output").innerHTML = "";
}

//
//	Gọi hàm sFunction1() ...
//	... rồi thêm đoạn văn 
//  thực hiện tuần tự
//
document.querySelector('button.sync').onclick = function () {
    clearOutput();
    output("BEGIN sync");
    let ret = sFunction();
    output(ret);
    output("END.");
};

//
//	Gọi hàm sFunction() ...
//	... rồi thêm đoạn văn 
//  BEGIN settimeout -> END -> (macrotask queue) setTimeout
//
document.querySelector('button.settimeout').onclick = function () {
    clearOutput();
    output("BEGIN settimeout");
    setTimeout(
        function () {
            let ret = sFunction();
            output(ret);
        },
        0);
    output("END.");
};

//
//	Gọi hàm aFunction() ...
//	... rồi thêm đoạn văn 
//  BEGIN promise -> push promise into micro task queue -> END -> 
// 
document.querySelector('button.promise').onclick = function () {
    clearOutput();
    output("BEGIN promise");
    aFunction1().then(function (ret) {
        output(ret);
    });
    output("END.");
};

//
//	Gọi hàm aFunction2() ...
//	... rồi thêm đoạn văn
//
document.querySelector('button.async').onclick = function () {
    clearOutput();
    output("BEGIN async");
    aFunction2().then(function (ret) {
        output(ret);
    });
    output("END.");
};

//
//	Gọi hàm aFunction() ...
//	... rồi thêm đoạn văn 
//
document.querySelector('button.await').onclick = async function () {
    clearOutput();
    output("BEGIN await");
    let ret = await aFunction1();
    output(ret);
    output("END.");
};

//
//	Gọi cả ba hàm aFunction1(), aFunction2() và sFunction()
//	... rồi thêm các đoạn văn
//
document.querySelector('button.syncvsasync').onclick = function () {
    clearOutput();
    output("BEGIN sync vs async");
    aFunction1().then(function (ret) {
        output(ret);
    });
    aFunction2().then(function (ret) {
        output(ret);
    });
    let ret = sFunction(1);
    output(ret);
    output("END.");
};
//
//	Đồng thời đợi aFunction1() và aFunction2()...
//	... rồi thêm các đoạn văn 
//
document.querySelector('button.waitall').onclick = function () {
    clearOutput();
    output("BEGIN waitall");
    console.log("start");
    let p1 = aFunction1();
    let p2 = aFunction2();
    Promise.all([p1, p2]).then(function (arr) {
        console.log("Promise all");
        output(arr[0]);
        output(arr[1]);
    });
    console.log("end");
    output("END.");
};

//
//	Đồng thời đợi aFunction1() và aFunction2()...
//	... rồi thêm các đoạn văn 
//
document.querySelector('button.mixed').onclick = function () {
    clearOutput();
    output("BEGIN mixed");
    setTimeout(() => {
        console.log("time out 10 ms");
        output('setTimeout 1');
    }, 10);
    setTimeout(() => {
        console.log("timeout 0ms");
        output('setTimeout 2');
    }, 0);

    new Promise(function (fulfill, reject) {
        console.log("promise 1");
        fulfill('Promise 1');
    })
    .then(function (res) { output(res); return "Sub Promise 1"; })
    .then(function (res) { output(res); });

    new Promise((fulfill, reject) => {
        console.log("promise 2");
        fulfill('Promise 2');
    })
    .then(res => { output(res); return "Sub Promise 2"; })
    .then(res => { output(res); });
    
    output("END.");
};