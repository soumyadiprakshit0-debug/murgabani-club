const API_URL =
"https://script.google.com/macros/s/AKfycbxVNrYgPMqWGibcTQyFth5aPYwJmP4cbeW29sUZaAUjeBtD3Ap_T6ztRBqO_eYAqW1D/exec";

const form = document.getElementById("applicationForm");
const submitBtn = document.getElementById("submitBtn");


// ======================================
// LOADING
// ======================================

function showLoading(show) {

    document.getElementById("loadingOverlay").style.display =
        show ? "flex" : "none";

}


// ======================================
// CUSTOM MESSAGE MODAL
// ======================================

function showMessage(title, message, icon = "⚠️") {

    document.getElementById("messageTitle").textContent =
        title;

    document.getElementById("messageText").textContent =
        message;

    document.getElementById("messageIcon").textContent =
        icon;

    document.getElementById("messageModal").style.display =
        "flex";

}


function closeMessageModal() {

    document.getElementById("messageModal").style.display =
        "none";

}


window.closeMessageModal = closeMessageModal;


// ======================================
// CLOSE MESSAGE WHEN CLICKING OUTSIDE
// ======================================

document.getElementById("messageModal")
.addEventListener("click", function(e) {

    if (e.target === this) {

        closeMessageModal();

    }

});


// ======================================
// SUCCESS MODAL
// ======================================

function showSuccess(requestId) {

    document.getElementById("successMessage").innerHTML =
    `
    Your membership application has been submitted successfully.

    <br><br>

    <b>Request ID :</b> ${requestId}

    <br><br>

    Please wait for the administrator's approval.
    You will receive your Member ID and password by email
    after approval.
    `;

    document.getElementById("successModal").style.display =
        "flex";

}


function closeSuccessModal() {

    document.getElementById("successModal").style.display =
        "none";

    window.location.href = "index.html";

}


window.closeSuccessModal = closeSuccessModal;


// ======================================
// NAME AUTO CAPITALIZATION
// ======================================

const nameInput =
    document.getElementById("name");


nameInput.addEventListener("input", () => {

    let value =
        nameInput.value;


    // Remove numbers and unwanted symbols

    value =
        value.replace(/[^a-zA-Z\s]/g, "");


    // Replace multiple spaces

    value =
        value.replace(/\s+/g, " ");


    // Capitalize first letter

    value =
        value
        .toLowerCase()
        .replace(/\b[a-z]/g, letter =>
            letter.toUpperCase()
        );


    nameInput.value =
        value;

});


// ======================================
// MOBILE NUMBER
// ======================================

const mobileInput =
    document.getElementById("mobile");


mobileInput.addEventListener("input", () => {

    // Numbers only

    let value =
        mobileInput.value.replace(/\D/g, "");


    // Maximum 10 digits

    value =
        value.substring(0, 10);


    mobileInput.value =
        value;

});


// ======================================
// EMAIL
// ======================================

const emailInput =
    document.getElementById("email");


emailInput.addEventListener("input", () => {

    // Remove spaces

    emailInput.value =
        emailInput.value.replace(/\s/g, "");

});


// ======================================
// FORM SUBMIT
// ======================================

form.addEventListener("submit", async (e) => {

    e.preventDefault();


    // ======================================
    // GET VALUES
    // ======================================

    const name =
        nameInput.value.trim();

    const mobile =
        mobileInput.value.trim();

    const email =
        emailInput.value.trim();

    const reason =
        document.getElementById("reason")
        .value.trim();

    const agree =
        document.getElementById("agree")
        .checked;


    // ======================================
    // NAME VALIDATION
    // ======================================

    if (name === "") {

        showMessage(
            "Name Required",
            "Please enter your full name.",
            "👤"
        );

        nameInput.focus();

        return;

    }


    // ======================================
    // NAME FORMAT
    // ======================================

    if (!/^[A-Za-z]+(?: [A-Za-z]+)*$/.test(name)) {

        showMessage(
            "Invalid Name",
            "Please enter a valid name using letters only.",
            "⚠️"
        );

        nameInput.focus();

        return;

    }


    // ======================================
    // INDIAN MOBILE
    // ======================================

    if (!/^[6-9][0-9]{9}$/.test(mobile)) {

        showMessage(
            "Invalid Mobile Number",
            "Please enter a valid Indian mobile number.\n\nExample: 9876543210",
            "📱"
        );

        mobileInput.focus();

        return;

    }


    // ======================================
    // EMAIL REQUIRED
    // ======================================

    if (email === "") {

        showMessage(
            "Email Required",
            "Please enter your Gmail address.",
            "📧"
        );

        emailInput.focus();

        return;

    }


    // ======================================
    // GMAIL VALIDATION
    // ======================================

    const gmailPattern =
        /^[a-zA-Z0-9._%+-]+@gmail\.com$/i;


    if (!gmailPattern.test(email)) {

        showMessage(
            "Invalid Gmail Address",
            "Please enter a valid Gmail address.\n\nOnly @gmail.com addresses are accepted.\n\nExample: example@gmail.com",
            "📧"
        );

        emailInput.focus();

        return;

    }


    // ======================================
    // DECLARATION
    // ======================================

    if (!agree) {

        showMessage(
            "Declaration Required",
            "Please accept the club rules and regulations before submitting your application.",
            "☑️"
        );

        return;

    }


    // ======================================
    // SUBMIT
    // ======================================

    submitBtn.disabled = true;

    submitBtn.textContent =
        "Submitting...";

    showLoading(true);


    try {

        const response = await fetch(

            API_URL +
            "?action=applyMembership" +
            "&name=" +
            encodeURIComponent(name) +
            "&mobile=" +
            encodeURIComponent(mobile) +
            "&email=" +
            encodeURIComponent(email) +
            "&reason=" +
            encodeURIComponent(reason)

        );


        const result =
            await response.json();


        showLoading(false);


        submitBtn.disabled = false;

        submitBtn.textContent =
            "Submit Application";


        // ======================================
        // SUCCESS
        // ======================================

        if (result.success) {

            form.reset();

            showSuccess(
                result.requestId
            );

        }


        // ======================================
        // SERVER ERROR
        // ======================================

        else {

            showMessage(
                "Application Failed",
                result.message ||
                "Unable to submit your application. Please try again.",
                "❌"
            );

        }


    } catch (err) {

        console.error(
            "Membership application error:",
            err
        );


        showLoading(false);


        submitBtn.disabled = false;

        submitBtn.textContent =
            "Submit Application";


        showMessage(
            "Network Error",
            "Unable to connect to the server.\n\nPlease check your internet connection and try again.",
            "🌐"
        );

    }

});