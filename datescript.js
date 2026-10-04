let selectedRestaurant = "";


// Runs when Annie clicks a restaurant choice
function chooseRestaurant(restaurant) {

    selectedRestaurant = restaurant;

    // Show which restaurant type was selected
    document.getElementById("restaurantChoice").textContent =
        "Good choice: " + restaurant;

    // Show the date and time section
    document.getElementById("datePickerSection").style.display = "block";

    // Remove selected styling from all restaurant buttons
    const buttons = document.querySelectorAll(".restaurant-button");

    buttons.forEach(function(button) {

        button.classList.remove("selected");

        // Highlight the button that was clicked
        if (button.textContent.trim() === restaurant) {
            button.classList.add("selected");
        }

    });

    // Scroll down to the date picker
    document.getElementById("datePickerSection").scrollIntoView({
        behavior: "smooth",
        block: "start"
    });
}


// Runs when the final "It's a Date" button is clicked
function submitDate(event) {

    event.preventDefault();

    const date = document.getElementById("date").value;
    const time = document.getElementById("dateTime").value;


    // Make sure everything was selected
    if (!selectedRestaurant || !date || !time) {

        document.getElementById("dateMessage").innerHTML =
            "Make sure you pick the food, date, and time ❤️";

        return;
    }


    // Convert the date into a nicer format
    const dateParts = date.split("-");

    const selectedDate = new Date(
        Number(dateParts[0]),
        Number(dateParts[1]) - 1,
        Number(dateParts[2])
    );


    const prettyDate = selectedDate.toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric"
    });


    // Convert the time into AM/PM
    const timeParts = time.split(":");

    const selectedTime = new Date();

    selectedTime.setHours(
        Number(timeParts[0]),
        Number(timeParts[1]),
        0,
        0
    );


    const prettyTime = selectedTime.toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit"
    });


    // Show the final message
    document.getElementById("dateMessage").innerHTML =
        "💕 It's a date!<br><br>" +
        "<strong>Food:</strong> " + selectedRestaurant + "<br>" +
        "<strong>Date:</strong> " + prettyDate + "<br>" +
        "<strong>Time:</strong> " + prettyTime + "<br><br>" +
        "I'll handle the rest 😏";
}


// Prevent dates before today from being selected
document.addEventListener("DOMContentLoaded", function() {

    const dateInput = document.getElementById("date");

    if (dateInput) {

        const today = new Date();

        const year = today.getFullYear();

        const month =
            String(today.getMonth() + 1).padStart(2, "0");

        const day =
            String(today.getDate()).padStart(2, "0");

        dateInput.min =
            year + "-" + month + "-" + day;
    }

});
