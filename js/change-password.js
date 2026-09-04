const API_URL =
"https://script.google.com/macros/s/AKfycbxVNrYgPMqWGibcTQyFth5aPYwJmP4cbeW29sUZaAUjeBtD3Ap_T6ztRBqO_eYAqW1D/exec";


// ==========================================
// Toast Notification
// ==========================================

const toast = document.getElementById("toast");
const toastIcon = document.getElementById("toastIcon");
const toastMessage = document.getElementById("toastMessage");

function showToast(type, message) {

    toast.className = "toast";

    if (type === "success") {
        toast.classList.add("success");
        toastIcon.textContent = "✅";
    }

    if (type === "error") {
        toast.classList.add("error");
        toastIcon.textContent = "❌";
    }

    if (type === "warning") {
        toast.classList.add("warning");
        toastIcon.textContent = "⚠️";
    }

    toastMessage.textContent = message;

    toast.classList.add("show");

    setTimeout(() => {
        toast.classList.remove("show");
    }, 15000);
}


// ==========================================
// Button Spinner
// ==========================================

function showButtonSpinner(button, text) {

    button.disabled = true;

    button.innerHTML = `
        <span class="button-spinner"></span>
        <span>${text}</span>
    `;
}


function resetButton(button) {

    button.disabled = false;

    button.innerHTML = "Change Password";
}


// ==========================================
// Get Logged-in Member
// ==========================================

const memberId = sessionStorage.getItem("memberId");


// ==========================================
// Check Login
// ==========================================

if (!memberId) {

    window.location.replace("login.html");

} else {

    document.getElementById("memberId").value = memberId;

}


// ==========================================
// Change Password
// ==========================================

const changePasswordBtn =
    document.getElementById("changePasswordBtn");


changePasswordBtn.addEventListener("click", async () => {

    const newPassword =
        document.getElementById("newPassword").value.trim();

    const confirmPassword =
        document.getElementById("confirmPassword").value.trim();


    // ======================================
    // Validation
    // ======================================

    if (newPassword.length < 8) {

        showToast(
            "warning",
            "Password must be at least 8 characters."
        );

        return;
    }


    if (newPassword === "123456789") {

        showToast(
            "warning",
            "Choose a different password."
        );

        return;
    }


    if (newPassword !== confirmPassword) {

        showToast(
            "warning",
            "Passwords do not match."
        );

        return;
    }


    // ======================================
    // Show Spinner
    // ======================================

    showButtonSpinner(
        changePasswordBtn,
        "Changing Password..."
    );


    // ======================================
    // API Request
    // ======================================

    try {

        const response = await fetch(

            API_URL +
            "?action=changePassword" +
            "&memberId=" +
            encodeURIComponent(memberId) +
            "&password=" +
            encodeURIComponent(newPassword)

        );


        // ==================================
        // Check HTTP Response
        // ==================================

        if (!response.ok) {

            throw new Error(
                "Server returned HTTP " + response.status
            );

        }


        const data = await response.json();


        // ==================================
        // API Failure
        // ==================================

        if (!data.success) {

            resetButton(changePasswordBtn);

            showToast(
                "error",
                data.message || "Password change failed."
            );

            return;
        }


        // ==================================
        // Password Changed Successfully
        // ==================================

        showToast(
            "success",
            "Password changed successfully. Redirecting to login..."
        );


        // Change button state
        changePasswordBtn.disabled = true;

        changePasswordBtn.innerHTML = `
            <span class="button-spinner"></span>
            <span>Redirecting...</span>
        `;


        // ==================================
        // Clear Session
        // ==================================

        sessionStorage.clear();


        // ==================================
        // Redirect
        // IMPORTANT:
        // Relative path works with GitHub Pages
        // ==================================

        setTimeout(() => {

            window.location.replace("login.html");

        }, 2000);


    } catch (error) {

        console.error(
            "Change Password Error:",
            error
        );


        // Restore button
        resetButton(changePasswordBtn);


        showToast(
            "error",
            "Network error. Please try again."
        );

    }

});
