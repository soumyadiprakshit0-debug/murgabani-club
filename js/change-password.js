const API_URL =
"https://script.google.com/macros/s/AKfycbxVNrYgPMqWGibcTQyFth5aPYwJmP4cbeW29sUZaAUjeBtD3Ap_T6ztRBqO_eYAqW1D/exec";

// Toast
const toast = document.getElementById("toast");
const toastIcon = document.getElementById("toastIcon");
const toastMessage = document.getElementById("toastMessage");

function showToast(type, message){

    toast.className = "toast";

    if(type==="success"){
        toast.classList.add("success");
        toastIcon.textContent="✅";
    }

    if(type==="error"){
        toast.classList.add("error");
        toastIcon.textContent="❌";
    }

    if(type==="warning"){
        toast.classList.add("warning");
        toastIcon.textContent="⚠️";
    }

    toastMessage.textContent=message;

    toast.classList.add("show");

    setTimeout(()=>{
        toast.classList.remove("show");
    },15000);

}

// Get logged-in member
const memberId = sessionStorage.getItem("memberId");

if(!memberId){
    window.location.href="login.html";
}

document.getElementById("memberId").value = memberId;

// Change Password
document
.getElementById("changePasswordBtn")
.addEventListener("click", async()=>{

    const newPassword =
        document.getElementById("newPassword").value.trim();

    const confirmPassword =
        document.getElementById("confirmPassword").value.trim();

    if(newPassword.length<8){
        showToast(
            "warning",
            "Password must be at least 8 characters."
        );
        return;
    }

    if(newPassword==="123456789"){
        showToast(
            "warning",
            "Choose a different password."
        );
        return;
    }

    if(newPassword!==confirmPassword){
        showToast(
            "warning",
            "Passwords do not match."
        );
        return;
    }

    try{


      
        const response = await fetch(

            API_URL +
            "?action=changePassword" +
            "&memberId=" + encodeURIComponent(memberId) +
            "&password=" + encodeURIComponent(newPassword)

        );

        const data = await response.json();

        if(!data.success){
            showToast(
                "error",
                data.message
            );
            return;
        }

const btn = document.getElementById("changePasswordBtn");
btn.disabled = true;
btn.textContent = "Redirecting...";
      
        showToast(
    "success",
    "Password changed successfully. Redirecting to login..."
);

// Clear the temporary session
sessionStorage.removeItem("memberId");

setTimeout(() => {

    sessionStorage.clear();

    window.location.href = "/login.html";

}, 2000);

    }catch(err){

        console.error(err);

        showToast(
            "error",
            "Network error. Please try again."
        );

    }

});