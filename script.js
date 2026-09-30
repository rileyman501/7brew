const GOOGLE_SCRIPT_URL =
"https://script.google.com/macros/s/AKfycbyEKGPBt5zkGdb9JI1RDczU51Eb54U83E0mVGZ3UNyKPehZFfhoCDJG8k98tK9OPGQK7A/exec";


// -------------------------
// YES PAGE
// -------------------------

function submitToday(event) {

    event.preventDefault();

    const time = document.getElementById("time").value;

    const today = new Date();

    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");

    const date = `${year}-${month}-${day}`;

    sendToCalendar(date, time);
}


// -------------------------
// NO PAGE
// -------------------------

function submitFuture(event) {

    event.preventDefault();

    const date = document.getElementById("date").value;
    const time = document.getElementById("futureTime").value;

    sendToCalendar(date, time);
}


// -------------------------
// SEND TO GOOGLE CALENDAR
// -------------------------

function sendToCalendar(date, time) {

    const message = document.getElementById("message");

    message.innerHTML = "Scheduling our 7 Brew trip... ☕";

    const formData = new FormData();

    formData.append("date", date);
    formData.append("time", time);

    fetch(GOOGLE_SCRIPT_URL, {
        method: "POST",
        body: formData,
        mode: "no-cors"
    })
    .then(() => {

        message.innerHTML =
            "🎉 It's official! 7 Brew with Annie is on the calendar! ";

    })
    .catch(() => {

        message.innerHTML =
            "Something went wrong. Try again.";

    });
}


// -------------------------
// PREVENT PAST DATES
// -------------------------

const datePicker = document.getElementById("date");

if (datePicker) {

    const today = new Date();

    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");

    datePicker.min = `${year}-${month}-${day}`;
}