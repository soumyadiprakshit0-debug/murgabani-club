const API_URL =
"https://script.google.com/macros/s/AKfycbxVNrYgPMqWGibcTQyFth5aPYwJmP4cbeW29sUZaAUjeBtD3Ap_T6ztRBqO_eYAqW1D/exec";

// ===============================
// ELEMENTS
// ===============================

const memberTableBody = document.getElementById("memberTableBody");
const searchMember = document.getElementById("searchMember");

const membershipRequestsBtn =
document.getElementById("membershipRequestsBtn");

const membershipRequestsSection =
document.getElementById("membershipRequestsSection");

const requestTableBody =
document.getElementById("requestTableBody");

const memberModal =
document.getElementById("memberModal");

const requestModal =
document.getElementById("requestModal");

const successModal =
document.getElementById("successModal");

const rejectModal =
document.getElementById("rejectModal");

const toast =
document.getElementById("toast");

const toastIcon =
document.getElementById("toastIcon");

const toastMessage =
document.getElementById("toastMessage");

let members = [];
let rejectRequestId = "";

// ===============================
// TOAST
// ===============================

function showToast(type,message){

    toast.className="toast";

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
    },4000);

}

// ===============================
// LOAD MEMBERS
// ===============================

async function loadMembers(){

    try{

        const response =
        await fetch(API_URL+"?action=getMembers");

        const data =
        await response.json();

        if(!data.success){

            showToast(
            "error",
            "Unable to load members."
            );

            return;

        }

        members=data.members;

        renderMembers(members);

    }

    catch(err){

        console.error(err);

        showToast(
        "error",
        "Unable to load members."
        );

    }

}

// ===============================
// LOAD MEMBERSHIP REQUESTS
// ===============================

async function loadMembershipRequests(){

    try{

        const response=
        await fetch(
        API_URL+
        "?action=getMembershipRequests"
        );

        const data=
        await response.json();

        if(!data.success){

            showToast(
            "error",
            "Unable to load requests."
            );

            return;

        }

        requestTableBody.innerHTML="";

        const badge=
        document.getElementById("requestCount");

        badge.textContent=
        data.requests.length;

        badge.style.display=
        data.requests.length>0
        ?"inline-flex"
        :"none";

        data.requests.forEach(req=>{

            requestTableBody.innerHTML+=`

<tr
data-id="${req.requestId}"
data-name="${req.name}"
data-mobile="${req.mobile}"
data-email="${req.email}"
data-reason="${req.reason}"
data-status="${req.status}"
>

<td>${req.requestId}</td>

<td>${req.name}</td>

<td>${req.mobile}</td>

<td>${req.status}</td>

<td>

<button
onclick="viewRequest('${req.requestId}')">

👁 View

</button>

</td>

</tr>

`;

        });

        membershipRequestsSection.style.display="block";

    }

    catch(err){

        console.error(err);

        showToast(
        "error",
        "Unable to load requests."
        );

    }

}
// ===============================
// RENDER MEMBERS
// ===============================

function renderMembers(records){

    memberTableBody.innerHTML="";

    records.forEach(member=>{

        memberTableBody.innerHTML+=`

<tr>

<td>${member.memberId}</td>

<td>${member.name}</td>

<td>${member.mobile}</td>

<td>${member.role}</td>

<td>

<span class="${member.status.toLowerCase()}">
${member.status}
</span>

</td>

<td>

<button
onclick="editMember('${member.memberId}')">

✏️ Edit

</button>

</td>

</tr>

`;

    });

}

// Make Edit button work
window.editMember = editMember;

// ===============================
// SEARCH MEMBER
// ===============================

searchMember.addEventListener("input",()=>{

    const keyword=
    searchMember.value
    .trim()
    .toLowerCase();

    const filtered=
    members.filter(member=>

        member.memberId
        .toLowerCase()
        .includes(keyword)

        ||

        member.name
        .toLowerCase()
        .includes(keyword)

        ||

        String(member.mobile)
        .includes(keyword)

    );

    renderMembers(filtered);

});

// ===============================
// PAGE LOAD
// ===============================

document.addEventListener("DOMContentLoaded",()=>{

    loadMembers();

});

// ===============================
// BUTTON EVENTS
// ===============================

document
.getElementById("addMemberBtn")
.addEventListener("click",()=>{

    memberModal.style.display="flex";

});

document
.getElementById("closeModalBtn")
.addEventListener("click",()=>{

    memberModal.style.display="none";

});

membershipRequestsBtn
.addEventListener("click",()=>{

    loadMembershipRequests();

});

// ===============================
// EDIT MEMBER
// ===============================

async function editMember(memberId) {

    const member = members.find(m => m.memberId === memberId);

    if (!member) return;

    document.getElementById("editMemberId").value = member.memberId;
    document.getElementById("editName").value = member.name;
    document.getElementById("editMobile").value = member.mobile;
    document.getElementById("editEmail").value = member.email;
    document.getElementById("editRole").value = member.role;
    document.getElementById("editPassword").value = member.password;
    document.getElementById("editStatus").value = member.status;

    document.getElementById("editMemberModal").style.display = "flex";

}
// ===============================
// ADD MEMBER
// ===============================

document
.getElementById("saveMemberBtn")
.addEventListener("click", async()=>{

    const name=
    document.getElementById("memberName").value.trim();

    const mobile=
    document.getElementById("memberMobile").value.trim();

    const email=
    document.getElementById("memberEmail").value.trim();

    const role=
    document.getElementById("memberRole").value;

    if(name.length<3){

        showToast(
        "warning",
        "Member name must contain at least 3 characters."
        );

        return;

    }

    if(!/^[6-9]\d{9}$/.test(mobile)){

        showToast(
        "warning",
        "Enter a valid mobile number."
        );

        return;

    }

    if(
        email &&
        !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
    ){

        showToast(
        "warning",
        "Enter a valid email address."
        );

        return;

    }

    try{

        const response=
        await fetch(

        API_URL+

        "?action=addMember"+

        "&name="+encodeURIComponent(name)+

        "&mobile="+encodeURIComponent(mobile)+

        "&email="+encodeURIComponent(email)+

        "&role="+encodeURIComponent(role)

        );

        const result=
        await response.json();

        if(!result.success){

            showToast(
            "error",
            result.message
            );

            return;

        }

        showToast(
        "success",
        "Member Added Successfully"
        );

        memberModal.style.display="none";

        document.getElementById("memberName").value="";
        document.getElementById("memberMobile").value="";
        document.getElementById("memberEmail").value="";
        document.getElementById("memberRole").value="Member";

        loadMembers();

    }

    catch(err){

        console.error(err);

        showToast(
        "error",
        "Network Error"
        );

    }

});

// ===============================
// VIEW REQUEST
// ===============================

function viewRequest(requestId){

    const row=[...requestTableBody.rows]
    .find(r=>r.dataset.id===requestId);

    if(!row) return;

    document.getElementById("reqId").textContent=
    row.dataset.id;

    document.getElementById("reqName").textContent=
    row.dataset.name;

    document.getElementById("reqMobile").textContent=
    row.dataset.mobile;

    document.getElementById("reqEmail").textContent=
    row.dataset.email;

    document.getElementById("reqReason").value=
    row.dataset.reason;

    document.getElementById("reqStatus").textContent=
    row.dataset.status;

    requestModal.style.display="flex";

}

window.viewRequest=viewRequest;

// ===============================
// CLOSE REQUEST MODAL
// ===============================

document
.getElementById("closeRequestModalBtn")
.addEventListener("click",()=>{

    requestModal.style.display="none";

});

// ===============================
// ACCEPT REQUEST
// ===============================

document
.getElementById("acceptRequestBtn")
.addEventListener("click",async()=>{

    const requestId=
    document.getElementById("reqId").textContent;

    try{

        const response=
        await fetch(

        API_URL+

        "?action=approveMembershipRequest"+

        "&requestId="+
        encodeURIComponent(requestId)

        );

        const result=
        await response.json();

        if(!result.success){

            showToast(
            "error",
            result.message
            );

            return;

        }

        const m=result.member;

        document.getElementById("smMemberId").textContent=m.memberId;
        document.getElementById("smName").textContent=m.name;
        document.getElementById("smMobile").textContent=m.mobile;
        document.getElementById("smEmail").textContent=m.email;
        document.getElementById("smRole").textContent=m.role;
        document.getElementById("smPassword").textContent=m.password;
        document.getElementById("smStatus").textContent=m.status;
        document.getElementById("smJoinDate").textContent=m.joinDate;

        requestModal.style.display="none";

        successModal.style.display="flex";

        loadMembers();

        loadMembershipRequests();

    }

    catch(err){

        console.error(err);

        showToast(
        "error",
        "Network Error"
        );

    }

});

// ===============================
// SUCCESS MODAL
// ===============================

document
.getElementById("closeSuccessBtn")
.addEventListener("click",()=>{

    successModal.style.display="none";

});

document
.getElementById("copyPasswordBtn")
.addEventListener("click",()=>{

    navigator.clipboard.writeText(

        document.getElementById("smPassword").textContent

    );

    showToast(
    "success",
    "Password Copied"
    );

});
// ===============================
// REJECT REQUEST
// ===============================

document
.getElementById("rejectRequestBtn")
.addEventListener("click",()=>{

    rejectRequestId=
    document.getElementById("reqId").textContent;

    document.getElementById("rejectReqId").textContent=
    rejectRequestId;

    document.getElementById("rejectReqName").textContent=
    document.getElementById("reqName").textContent;

    rejectModal.style.display="flex";

});

// ===============================
// CANCEL REJECT
// ===============================

document
.getElementById("cancelRejectBtn")
.addEventListener("click",()=>{

    rejectModal.style.display="none";

});

// ===============================
// CONFIRM REJECT
// ===============================

document
.getElementById("confirmRejectBtn")
.addEventListener("click",async()=>{

    try{

        const response=
        await fetch(

        API_URL+

        "?action=rejectMembershipRequest"+

        "&requestId="+
        encodeURIComponent(rejectRequestId)

        );

        const result=
        await response.json();

        if(!result.success){

            showToast(
            "error",
            result.message
            );

            return;

        }

        rejectModal.style.display="none";

        requestModal.style.display="none";

        showToast(
        "success",
        "Membership request rejected successfully."
        );

        loadMembershipRequests();

    }

    catch(err){

        console.error(err);

        showToast(
        "error",
        "Network Error"
        );

    }

});
// ===============================
// INITIAL PAGE LOAD
// ===============================

document.addEventListener("DOMContentLoaded", () => {

    loadMembers();

    // Load request count badge automatically
    loadMembershipRequests();

    // Hide request section initially
    membershipRequestsSection.style.display = "none";

});

// ===============================
// BACK BUTTON
// ===============================

document.getElementById("backBtn")
.addEventListener("click", () => {

    window.history.back();

});

// ===============================
// CLOSE MODALS WHEN CLICKING OUTSIDE
// ===============================

window.addEventListener("click", (e) => {

    if (e.target === memberModal) {

        memberModal.style.display = "none";

    }

    if (e.target === requestModal) {

        requestModal.style.display = "none";

    }

    if (e.target === successModal) {

        successModal.style.display = "none";

    }

    if (e.target === rejectModal) {

        rejectModal.style.display = "none";

    }

});

// ===============================
// ESC KEY SUPPORT
// ===============================

document.addEventListener("keydown", (e) => {

    if (e.key === "Escape") {

        memberModal.style.display = "none";
        requestModal.style.display = "none";
        successModal.style.display = "none";
        rejectModal.style.display = "none";

    }

});

// ===============================
// REFRESH REQUEST COUNT
// ===============================

setInterval(() => {

    loadMembershipRequests();

}, 30000);

document
.getElementById("updateMemberBtn")
.addEventListener("click", async () => {

    const memberId = document.getElementById("editMemberId").value;
    const name = document.getElementById("editName").value;
    const mobile = document.getElementById("editMobile").value;
    const email = document.getElementById("editEmail").value;
    const role = document.getElementById("editRole").value;
    const password = document.getElementById("editPassword").value;
    const status = document.getElementById("editStatus").value;

    try {

        const response = await fetch(

            API_URL +
            "?action=updateMember" +
            "&memberId=" + encodeURIComponent(memberId) +
            "&name=" + encodeURIComponent(name) +
            "&mobile=" + encodeURIComponent(mobile) +
            "&email=" + encodeURIComponent(email) +
            "&role=" + encodeURIComponent(role) +
            "&password=" + encodeURIComponent(password) +
            "&status=" + encodeURIComponent(status)

        );

        const result = await response.json();

        if (!result.success) {
            showToast("error", result.message);
            return;
        }

        showToast("success", "Member updated successfully.");

        document.getElementById("editMemberModal").style.display = "none";

        loadMembers();

    } catch (err) {

        showToast("error", "Network Error");

    }

});

document
.getElementById("closeEditModalBtn")
.addEventListener("click", () => {

    document.getElementById("editMemberModal").style.display = "none";

});