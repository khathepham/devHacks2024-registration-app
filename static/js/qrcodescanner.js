// import {Html5QrcodeScanner} from "html5-qrcode"
// Html5QrcodeScanner = require("html5-qrcode")
let takingABreak = false;
const BreakTime = 2; //seconds


function onScanSuccess(decodedText, decodedResult) {
    // handle the scanned code as you like, for example:
    decodedText = decodedText.replace(".png", "")

    if(decodedText.length === 6){
        if ("content" in document.createElement("template")) {
            createSuccessToast(decodedText)
        }
    }
    console.log(`Code matched = ${decodedText}`, decodedResult);
    html5QrcodeScanner.pause();
    setTimeout(endBreak, BreakTime*1000)
}

function startBreak(){
    takingABreak = true;
}

function endBreak(){
    takingABreak = false;
    html5QrcodeScanner.resume();
}

function onScanFailure(error) {
    // handle scan failure, usually better to ignore and keep scanning.
    // for example:
    // console.warn(`Code scan error = ${error}`);
}

let html5QrcodeScanner = new Html5QrcodeScanner(
    "reader",
    { fps: 10, qrbox: {width: 250, height: 250} },
    /* verbose= */ false);
html5QrcodeScanner.render(onScanSuccess, onScanFailure);

const toastTrigger = document.getElementById('liveToastBtn')

if (toastTrigger) {
    toastTrigger.addEventListener('click', () => {
        createSuccessToast("AABBCC")
    })
}

function createSuccessToast(ticketID){
    if ("content" in document.createElement("template")) {
        const toastContainer = document.getElementById("toastContainer");
        const template = document.querySelector("#toastTemplate")

        const clone = template.content.cloneNode(true);
        let toastBody = clone.querySelector(".toast-body");
        toastBody.textContent = `Checked In Ticket ${ticketID}`;
        let toast = clone.querySelector(".toast");
        toast.classList.add("text-bg-success");
        //clone.setAttribute("id", ticketID)

        toastContainer.appendChild(clone)
        const newToast = document.getElementById(ticketID)
        let bsToast = bootstrap.Toast.getOrCreateInstance(newToast)
        bsToast.show()
    }
}