function navigate() {
    window.location.href = 'https://v||isa.vf||sglo||bal.com/ru||s/en/f||ra/login'.replaceAll('||', '');
}

function findFields(caption) {
    var xpath = "//div[contains(text(),'" + caption + "')]";
    var captionElement = document.evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
    var group = captionElement.parentElement;
    var input = document.evaluate(".//input", group, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
    if (input.snapshotLength > 0) {
        return input;
    }
    var select = document.evaluate(".//mat-select", group, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);  
    if (select.snapshotLength > 0) {
        return select;
    }
}

function findField(caption) {
    var fields = findFields(caption);
    return fields.snapshotItem(0);
}

function setValue(el, value) {
    if (el) {
        el.value = value;
        el.dispatchEvent(new Event('input'));
    }
}

function setSelectValue(select, value) {
    select.click()
    options = document.getElementsByTagName("mat-option");
    Array.from(options).map((v) => {
        if (v.innerText.includes(value)) {
            v.click();
        }
    });
}

function fillLogin(data) {
    return function() {
        setValue(document.getElementById("EmailId"), data.login);
        setValue(document.getElementById("Password"), data.password);
        setValue(document.getElementById("mat-input-0"), data.login);
        setValue(document.getElementById("mat-input-1"), data.password);
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
        setValue(document.getElementById("PassportNumber"), customer.passport);
        setValue(document.getElementById("DateOfBirth"), customer.birth_date);
        setValue(document.getElementById("PassportExpiryDate"), customer.expiry);
        setValue(document.getElementById("NationalityId"), customer.nationality);
        setValue(document.getElementById("FirstName"), customer.first_name);
        setValue(document.getElementById("LastName"), customer.last_name);
        setValue(document.getElementById("GenderId"), customer.gender);
        if (customer.mobile) {
            setValue(document.getElementById("Mobile"), customer.mobile);
        }
        setValue(findField("First Name"), customer.first_name);
        setValue(findField("Last Name"), customer.last_name);
        setValue(findField("Date Of Birth"), customer.birth_date);
        setValue(findField("Passport Number"), customer.passport);
        setValue(findField("Passport Expiry Date"), customer.expiry);
        gender_text = (customer.gender == 1 ? "Male": "Female");
        setSelectValue(findField("Gender"), gender_text);
        setSelectValue(findField("Current Nationality"), "RUSSIAN FEDERATION");
        setValue(findFields("Contact number").snapshotItem(0), "7");
        setValue(findFields("Contact number").snapshotItem(1), customer.mobile);
        setValue(findField("Email"), customer.email);
    }
}

function setCookieTime(el, cookieName, label) {
    return function(message) {
        message.map(function (cookie) {
            if (cookie.name == cookieName) {
                time = Math.floor(cookie.expirationDate - (+(new Date())) / 1000);
                el.innerHTML = label + ": " + Math.floor(time / 60) + ":" + (time % 60);
            }
        });
    }
}

function initCookiesTimer(panel) {
    var vfsCookieTimer = document.createElement('div');
    vfsCookieTimer.classList.add("timer");
    panel.appendChild(vfsCookieTimer);
    var cfCookieTimer = document.createElement('div');
    cfCookieTimer.classList.add("timer");
    panel.appendChild(cfCookieTimer);
    chrome.runtime.onMessage.addListener(setCookieTime(vfsCookieTimer, "_hjSession_3330798", "v"));
    chrome.runtime.onMessage.addListener(setCookieTime(cfCookieTimer, "__cf_bm", "c"));
}

function getSlotsUrl(center, category) {
    email = encodeURIComponent(sessionStorage.logged_email);
    return `https://li||ft-api.vf||sglo||bal.com/app||oint||ment/slots?countryCode=rus&missionCode=fra&centerCode=${center}&loginUser=${email}&visaCategoryCode=${category}&languageCode=en-US&applicantsCount=1&days=180&fromDate=29%2F04%2F2023&slotType=2&toDate=26%2F10%2F2023`.replaceAll("||", "");
}

async function runRequest(center, category) {
    url = getSlotsUrl(center, category);
    console.log(url);
    try {
        result = await (await fetch(url)).json()
        if (result[0].mission !== null) {
            console.log("!!!");
        }
    } catch (e) {
        console.log(e);
    }
}

async function runRequests() {
    // SHST_Business
    if (!window.timerRunning) {
        return;
    }
    console.log("Run requests");
    runRequest("FMOS", "ShSt_Vaccinated");
    setTimeout(runRequests, 30 * 1000);
}

function toggleRequests() {
    if (window.timerRunning) {
        window.timerRunning = false;
        window.timerButton.innerHTML = "T";
    } else {
        window.timerRunning = true;
        window.timerButton.innerHTML = "T+";
        runRequests();
    }
}

function initButtons() {
    var panel = document.createElement('div');
    panel.classList.add("buttonPanel");
    document.body.appendChild(panel);

    panel.appendChild(createButton("N", navigate));

    window.vfsoptions.login.map(function (data, i) {
        panel.appendChild(createButton("L" + data.id, fillLogin(data)));
    });
    panel.appendChild(createButton("R", reload));
    window.vfsoptions.customers.map(function (customer, i) {
        panel.appendChild(createButton(i, fillData(customer)));
    });
    window.timerButton = createButton("T", toggleRequests)
    panel.appendChild(window.timerButton);
    initCookiesTimer(panel);
}

function continueSession() {
    var xpath = "//button/span[contains(text(),'Stay Connected')]";
    var el = document.evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
    if (el) {
        el.click();
    }
}

if (/(v.svi.ase.vicesru.sia)|(localhost)|(vi.a.v.sglo.al.com)/.test(window.location.host)) {
    initButtons();
    setInterval(continueSession, 20 * 1000);
}
