function fillLogin(data) {
    return function() {
        document.getElementById("EmailId").value = data.login;
        document.getElementById("Password").value = data.password;
    }
}

function createButton(name, onclick) {
    var button = document.createElement('button');
    button.innerHTML = name;
    button.onclick = onclick;
    return button;
}

function reload() {
    /*
    const old_value = document.getElementById("SubVisaCategoryId").value
    function reload2() {
        document.getElementById("SubVisaCategoryId").value = old_value
        document.getElementById("SubVisaCategoryId").click()
    }
    function reload1() {
        document.getElementById("VisaCategoryId").value = 1273
        setTimeout(reload2, 2000);
    }
    document.getElementById("SubVisaCategoryId").value = 0
    document.getElementById("VisaCategoryId").value = 1274
    setTimeout(reload1, 2000);
    */
    document.getElementById("btnContinue").disabled = false;
    document.getElementById("btnContinue").click();
}

function fillData(customer) {
    return function() {
        document.getElementById("PassportNumber").value = customer.passport;
        document.getElementById("DateOfBirth").value = customer.birth_date;
        document.getElementById("PassportExpiryDate").value = customer.expiry;
        document.getElementById("NationalityId").value = customer.nationality;
        document.getElementById("FirstName").value = customer.first_name;
        document.getElementById("LastName").value = customer.last_name;
        document.getElementById("GenderId").value = customer.gender;
    }
}

function initButtons() {
    var panel = document.createElement('div');
    panel.classList.add("buttonPanel");
    document.body.appendChild(panel);

    window.vfsoptions.login.map(function (data, i) {
        panel.appendChild(createButton("L" + i, fillLogin(data)));
    });
    panel.appendChild(createButton("R", reload));
    window.vfsoptions.customers.map(function (customer, i) {
        panel.appendChild(createButton(i, fillData(customer)));
    });
}

if (/(v.svi.ase.vicesru.sia)|(localhost)/.test(window.location.host)) {
    initButtons();
}
