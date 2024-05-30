var siteName = document.getElementById("siteName");
var siteUrl = document.getElementById("siteURL");
var searchBox = document.getElementById("search");
var submitButton = document.getElementById("submitBtn");
var shiftButton = document.getElementById("shiftButton");
var indexUpdate;
var allSeries = [];

submitButton.addEventListener('click', getSeries);
shiftButton.addEventListener('click', getUpdates);

if (localStorage.getItem("checkAllSeries") != null) {
    allSeries = JSON.parse(localStorage.getItem("checkAllSeries"));
    displaySeries();
}
function setLocalStorage() {
    localStorage.setItem("checkAllSeries", JSON.stringify(allSeries));
}

function getSeries() {
    product = {
        sName: siteName.value,
        sUrl: siteUrl.value,
    }
    allSeries.push(product);
    setLocalStorage()
    clearDataFromInput()
    displaySeries()
}

function clearDataFromInput(verification) {
    siteName.value = verification ? verification.sName : null;
    siteUrl.value = verification ? verification.sUrl : null;
}

function displaySeries() {
    var content = "";
    for (var i = 0; i < allSeries.length; i++) {
        content += ` 
        <tr>
        <td>${i + 1}</td>
        <td>${allSeries[i].sName}</td>
        <td><a href="${allSeries[i].sUrl}" target="_blank" class="btn btn-info" onclick=""><i class="fa-solid fa-eye pe-2"></i>Visit</a></td>
        <td><button class="btn btn-danger" onclick="deleteDataFromList(${i})"><i class="fa-solid fa-trash-can pe-2"></i>Delete</button></td>
        <td><button class="btn btn-success" onclick="getIndexToUpdateData(${i})"><i class="fa-solid fa-pen-to-square pe-2"></i>Update</button></td>
        </tr>`
    }
    document.getElementById("displaySeries").innerHTML = content;
}

function getIndexToUpdateData(index) {
    indexUpdate = index;
    clearDataFromInput(allSeries[index]);
    getChangeBtn();
}

function getChangeBtn() {
    submitButton.classList.add('d-none');
    shiftButton.classList.remove('d-none');
}

function getUpdates() {
    allSeries[indexUpdate].sName = siteName.value
    allSeries[indexUpdate].sUrl = siteUrl.value
    displaySeries(allSeries);
    setLocalStorage()
    getBtnOrigin()
    clearDataFromInput()
}

function getBtnOrigin() {
    submitButton.classList.remove('d-none');
    shiftButton.classList.add('d-none');
}

function deleteDataFromList(index) {
    allSeries.splice(index, 1);
    setLocalStorage();
    displaySeries(allSeries);
}

function getSearchInput() {
    var newWord = searchBox.value;
    var newContent = ``;
    for (var i = 0; i < allSeries.length; i++) {
        if (allSeries[i].sName.toLowerCase().trim().includes(newWord.toLowerCase().trim())) {
            newContent += ` 
            <tr>
            <td>${i + 1}</td>
            <td>${allSeries[i].sName}</td>
            <td><a href="${allSeries[i].sUrl}" target="_blank" class="btn btn-info" onclick=""><i class="fa-solid fa-eye pe-2"></i>Visit</a></td>
            <td><button class="btn btn-danger" onclick="deleteDataFromList(${i})"><i class="fa-solid fa-trash-can pe-2"></i>Delete</button></td>
            <td><button class="btn btn-success" onclick="getIndexToUpdateData(${i})"><i class="fa-solid fa-pen-to-square pe-2"></i>Update</button></td>
            </tr>`
        }
    }
    document.getElementById("displaySeries").innerHTML = newContent;
}