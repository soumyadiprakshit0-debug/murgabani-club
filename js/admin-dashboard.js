// ======================================
// MURGABANI CLUB
// Admin Dashboard
// ======================================

// ==========================
// Disable Browser Back Button
// ==========================
history.pushState(null, null, location.href);

window.addEventListener("popstate", () => {
    history.pushState(null, null, location.href);
});

// NEW WEB APP URL
const API_URL =
"https://script.google.com/macros/s/AKfycbxVNrYgPMqWGibcTQyFth5aPYwJmP4cbeW29sUZaAUjeBtD3Ap_T6ztRBqO_eYAqW1D/exec";

const welcome = document.getElementById("welcome");
const yearSelect = document.getElementById("year");
const pujaSelect = document.getElementById("puja");

const members = document.getElementById("members");
const collection = document.getElementById("collection");
const expenses = document.getElementById("expenses");
const balance = document.getElementById("balance");

const loading = document.getElementById("loading");

// Welcome
welcome.textContent =
"Welcome, " + (sessionStorage.getItem("memberName") || "Member");

// Loading
function showLoading(show) {
    loading.style.display = show ? "block" : "none";
  yearSelect.disabled = show;
    pujaSelect.disabled = show;
}

// Load Dashboard (Fast)
async function loadDashboardInit() {

    showLoading(true);

    try {

        const response = await fetch(API_URL + "?action=dashboardInit");
        const data = await response.json();

        if (!data.success) {
            alert("Unable to load dashboard.");
            return;
        }

        // Years
        yearSelect.innerHTML = "";

        data.years.forEach(year => {

            yearSelect.innerHTML +=
                `<option value="${year}">${year}</option>`;

        });

        yearSelect.value = data.selectedYear;

        // Pujas
        pujaSelect.innerHTML = "";

        data.pujas.forEach(puja => {

            pujaSelect.innerHTML +=
                `<option value="${puja}">${puja}</option>`;

        });

        pujaSelect.value = data.selectedPuja;

        // Cards
        members.textContent = data.members;
        collection.textContent =
"₹" + Number(data.collection).toLocaleString("en-IN");

expenses.textContent =
"₹" + Number(data.expense).toLocaleString("en-IN");

balance.textContent =
"₹" + Number(data.balance).toLocaleString("en-IN");
      balance.style.color =
Number(data.balance) >= 0
? "#16a34a"
: "#dc2626";

    } catch (err) {

        console.error(err);
        alert("Unable to load dashboard.");

    }

    showLoading(false);
}

// Reload Dashboard when filter changes
async function loadDashboard() {

    showLoading(true);

    try {

        const response = await fetch(
            API_URL +
            "?action=dashboard" +
            "&year=" + encodeURIComponent(yearSelect.value) +
            "&puja=" + encodeURIComponent(pujaSelect.value)
        );

        const data = await response.json();

        if (data.success) {

            members.textContent = data.members;
         collection.textContent =
"₹" + Number(data.collection).toLocaleString("en-IN");

expenses.textContent =
"₹" + Number(data.expense).toLocaleString("en-IN");

balance.textContent =
"₹" + Number(data.balance).toLocaleString("en-IN"); 
          balance.style.color =
Number(data.balance) >= 0
? "#16a34a"
: "#dc2626";

        }

    } catch (err) {

        console.error(err);

    }

    showLoading(false);
}

// Change Year
yearSelect.addEventListener("change", async () => {

    showLoading(true);

    try {

        const response = await fetch(
            API_URL +
            "?action=pujas&year=" +
            encodeURIComponent(yearSelect.value)
        );

        const pujas = await response.json();

        pujaSelect.innerHTML = "";

        pujas.forEach(puja => {

            pujaSelect.innerHTML +=
                `<option value="${puja}">${puja}</option>`;

        });

        await loadDashboard();

    } catch (err) {

        console.error(err);

    }

    showLoading(false);

});

// Change Puja
pujaSelect.addEventListener("change", loadDashboard);

// Start
loadDashboardInit();
// ==========================
// Road Collection Button
// ==========================
document.getElementById("roadCollectionBtn").addEventListener("click", () => {

    window.location.assign("road-collection.html");

});
// ==========================
// Village Collection Button
// ==========================
document.getElementById("villageCollectionBtn").addEventListener("click", () => {

    const collectorName = sessionStorage.getItem("memberName") || "";

    const url =
        "https://docs.google.com/forms/d/e/1FAIpQLSe6ULSxFbaOss0mxjrdbBbdFzuBKIegpKK7KT9J7Ng8xiP2pw/viewform?usp=pp_url"
        + "&entry.1655971270=" + encodeURIComponent(collectorName);

   window.open(url, "_blank");

});
// ==========================
// Members Collection Button
// ==========================

document.getElementById("memberCollectionBtn").addEventListener("click", () => {

    const puja = document.getElementById("puja").value;

    const url =
        "https://docs.google.com/forms/d/e/1FAIpQLSc_PCxt4ew8sKUPss5o7mf1H1V0cC7tzUCNBR7wOtSeifUkOQ/viewform?usp=pp_url" +
        "&entry.168636625=" + encodeURIComponent(puja);

    window.open(url, "_blank");

});
// ==========================
// Expenses Button
// ==========================
// ==========================
// Expenses Button
// ==========================
document.getElementById("expenseBtn").addEventListener("click", () => {

    const paidBy = sessionStorage.getItem("memberName") || "";

    const url =
        "https://docs.google.com/forms/d/e/1FAIpQLSfBwCNd-avZ_9BLSbd0Osoq3oNjbr6xTfzD0vu9U6Czppy1-Q/viewform?usp=pp_url"
        + "&entry.834757402=" + encodeURIComponent(paidBy);

    window.open(url, "_blank");

});
// ==========================
// Reports Button
// ==========================
document.getElementById("reportBtn").addEventListener("click", () => {

    const year = yearSelect.value;
    const puja = pujaSelect.value;

    window.location.href =
        "report.html?year=" +
        encodeURIComponent(year) +
        "&puja=" +
        encodeURIComponent(puja);

});

// ==========================
// Manage Members Button
// ==========================

document.getElementById("memberManageBtn").addEventListener("click", () => {

    window.location.assign("manage-members.html");

});