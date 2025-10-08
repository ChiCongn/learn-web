document.getElementById("name").focus();

document.getElementById("name").onblur = function() {
	this.value = standardizeName(this.value);
};

document.getElementById("name").onkeyup = function(e) {
	goNextField(e, this, 'address');
};

document.getElementById("address").onkeyup = function(e) {
	goNextField(e, this, 'men');
};

document.getElementById("men").onkeyup = function(e) {
	goNextField(e, this, 'women');
};

document.getElementById("women").onkeyup = function(e) {
	goNextField(e, this, 'birth');
};

document.getElementById("birth").onkeyup = function(e) {
	goNextField(e, this, 'email');
};

document.getElementById("email").onkeyup = function(e) {
	goNextField(e, this, 'phone');
};

document.getElementById("username").onkeyup = function(e) {
	goNextField(e, this, 'password');
};

document.getElementById("password").onkeyup = function(e) {
	goNextField(e, this, 'confirm-password');
};

document.getElementById("confirm-password").onkeyup = function(e) {
	goNextField(e, this, 'note');
};


function goNextField(e, myself, nextcontrolid) {
    if (window.event) e = window.event; //de chay ca tren IE
	if (e.keyCode == 13) {
		document.getElementById(nextcontrolid).focus();
	}
}


function approve() {
    //console.log("accept");
	let valid = true;

	document.getElementById("error-name").innerHTML  = "";
	document.getElementById("error-birth").innerHTML = "";
	document.getElementById("error-email").innerHTML = "";
	document.getElementById("error-username").innerHTML = "";
	document.getElementById("error-password").innerHTML = "";
	document.getElementById("error-confirm-password").innerHTML = "";

    //check required fields
	if (document.getElementById("password").value == "") {
		document.getElementById("error-password").innerHTML = "Quý vị chưa nhập mật khẩu";
		document.getElementById("password").focus();
		valid = false;

	} else if (document.getElementById("confirm-password").value == "") {
		document.getElementById("error-confirm-password").innerHTML = "Quý vị chưa gõ lại mật khẩu";
		document.getElementById("confirm-password").focus();
		valid = false;

	} else if (document.getElementById("confirm-password").value  != document.getElementById("password").value ) {
		document.getElementById("error-confirm-password").innerHTML = "Mật khẩu và gõ lại mật khẩu không trùng nhau";
		document.getElementById("confirm-password").focus();
		valid = false;
	}

	if (document.getElementById("username").value == "") {
		document.getElementById("error-username").innerHTML = "Quý vị chưa nhập tên sử dụng";
		document.getElementById("username").focus();
		valid = false;
        
	} else if (!isUsername(document.getElementById("username").value)) {
		document.getElementById("error-username").innerHTML = "Tên sử dụng không đúng định dạng";
		document.getElementById("username").focus();
		valid = false;
	}

	if (document.getElementById("email").value == "") {
        console.log("emial null");
		document.getElementById("error-email").innerHTML = "Quý vị chưa nhập e-mail";
		document.getElementById("email").focus();
		valid = false;
	} else if (!isEmail(document.getElementById("email").value)) {
        console.log("email");		
		document.getElementById("error-email").innerHTML = "E-mail không đúng định dạng";
		document.getElementById("email").focus();
		valid = false;
	}

	if (document.getElementById("birth").value == "") {
		document.getElementById("error-birth").innerHTML = "Quý vị chưa nhập ngày sinh";
		document.getElementById("birth").focus();
		valid = false;
	} else if (!isDate(document.getElementById("birth").value)) {
		document.getElementById("error-birth").innerHTML = "Ngày sinh không đúng định dạng";
		document.getElementById("birth").focus();
		valid = false;
	}

	if (document.getElementById("name").value == "") {
		document.getElementById("error-name").innerHTML = "Quý vị chưa nhập họ tên";
		document.getElementById("name").focus();
		valid = false;
	}

	//submit form
	if (valid) document.getElementById("form").submit();
}

function isEmail(s) {
    if (!s) return false;
    const t = s.trim();
    // regex: label(.label)*@label(.label)*
    // label = [A-Za-z0-9]+
    const re = /^[A-Za-z0-9]+(?:\.[A-Za-z0-9]+)*@[A-Za-z0-9]+(?:\.[A-Za-z0-9]+)*$/;
    return re.test(t);
}

function isUsername(s) {
	return true;
}

function isDate(d) { //d = nn/tt/nnnn
	s = d.split('/');

	if (s.length != 3) return false;
	if (isNaN(s[0]) || isNaN(s[1]) || isNaN(s[2])) return false;

	//convert to number
	ngay = parseInt(s[0]);
	thang = parseInt(s[1]);
	nam = parseInt(s[2]);

	if (thang > 12 || thang < 1) return false;
	if (thang == 1 || thang == 3 || thang == 5 || thang == 7 || thang == 8 || thang == 10 || thang == 12) {
		if (ngay > 31) return false;
	} else if (thang == 2){
		if (nam%4 == 0 && nam%100 != 0) {
			if (ngay > 29) return false;
		} else if (ngay > 28) return false;
	} else if (ngay > 30) return false;

	if (ngay < 1) return false;

	date = new Date();
	if (nam > date.getFullYear() || nam < 1950) return false;

	return true;
}


function standardizeName(name) {
	dname = name;
	ss = dname.split(' ');
	dname = "";
	for (i = 0; i < ss.length; i++)
		if (ss[i].length > 0) {
			if (dname.length > 0) dname = dname + " ";
			dname = dname + ss[i].substring(0, 1).toUpperCase();
			dname = dname + ss[i].substring(1).toLowerCase();
		}
	return dname;
}


function ignore() {
	document.location.href = "../";
}


document.getElementById("file").onchange = function () {
    let preview = document.querySelector("img.preview");
    let file = this.files[0];
    let reader = new FileReader();
    reader.onload = function () {
        preview.src = reader.result;
    };
    if (file) {
        reader.readAsDataURL(file);
        preview.classList.remove("nodisplay");
    }
};
