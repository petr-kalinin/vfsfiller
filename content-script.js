function fillLogin() {
    document.getElementById("EmailId").value = window.vfsoptions.login.login;
    document.getElementById("Password").value = window.vfsoptions.login.password;
}

function createButton(name, onclick) {
    var button = document.createElement('button');
    button.innerHTML = name;
    button.onclick = onclick;
    return button;
}

function fillData(customer) {
    return function() {
        console.log(customer);
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

    panel.appendChild(createButton("L", fillLogin));
    window.vfsoptions.customers.map(function (customer, i) {
        panel.appendChild(createButton(i, fillData(customer)));
    });
}

if (/(v.svi.ase.vicesru.sia)|(localhost)/.test(window.location.host)) {
    initButtons();
}
