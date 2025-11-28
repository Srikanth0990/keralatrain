// ---------------------------
// SAMPLE TRAIN DATA
// ---------------------------
const trainData = [
    {
        number: "16301",
        name: "Venad Express",
        from: "Trivandrum",
        to: "Ernakulam",
        departure: "06:00 AM",
        arrival: "10:20 AM"
    },
    {
        number: "16347",
        name: "Trivandrum - Mangalore Express",
        from: "Trivandrum",
        to: "Kozhikode",
        departure: "07:00 AM",
        arrival: "02:30 PM"
    },
    {
        number: "12076",
        name: "Jan Shatabdi Express",
        from: "Kozhikode",
        to: "Trivandrum",
        departure: "05:10 AM",
        arrival: "11:25 AM"
    },
    {
        number: "16310",
        name: "Malabar Express",
        from: "Kannur",
        to: "Ernakulam",
        departure: "04:45 AM",
        arrival: "09:30 AM"
    }
];

// ---------------------------
// SEARCH TRAINS (index.html)
// ---------------------------
function searchTrains() {
    const from = document.getElementById("from").value.trim().toLowerCase();
    const to = document.getElementById("to").value.trim().toLowerCase();

    const resultsDiv = document.getElementById("searchResults");
    resultsDiv.innerHTML = ""; // clear old results

    if (from === "" || to === "") {
        resultsDiv.innerHTML = "<p>Please enter both 'From' and 'To' stations.</p>";
        return;
    }

    const result = trainData.filter(
        train => train.from.toLowerCase() === from && train.to.toLowerCase() === to
    );

    if (result.length === 0) {
        resultsDiv.innerHTML = "<p>No trains found for this route.</p>";
        return;
    }

    let html = "<h3>Available Trains</h3><ul>";
    result.forEach(train => {
        html += `
            <li>
                <strong>${train.number} - ${train.name}</strong><br>
                Departure: ${train.departure} | Arrival: ${train.arrival}
            </li>
        `;
    });
    html += "</ul>";

    resultsDiv.innerHTML = html;
}

// ---------------------------
// TIMETABLE FILTER (timings.html)
// ---------------------------
function filterTimings() {
    const station = document.getElementById("filterStation").value.trim().toLowerCase();
    const tableBody = document.getElementById("timetableBody");

    tableBody.innerHTML = ""; // reset table

    const filtered = station
        ? trainData.filter(
            train =>
                train.from.toLowerCase().includes(station) ||
                train.to.toLowerCase().includes(station)
          )
        : trainData;

    filtered.forEach(train => {
        const row = `
            <tr>
                <td>${train.number}</td>
                <td>${train.name}</td>
                <td>${train.from}</td>
                <td>${train.to}</td>
                <td>${train.departure}</td>
                <td>${train.arrival}</td>
            </tr>
        `;
        tableBody.innerHTML += row;
    });
}

// ---------------------------
// BOOKING PAGE (booking.html)
// ---------------------------
function bookTicket() {
    const name = document.getElementById("passengerName").value.trim();
    const train = document.getElementById("trainSelect").value;

    if (name === "" || train === "") {
        alert("Please enter all details.");
        return;
    }

    alert(`Ticket Booked Successfully!\nPassenger: ${name}\nTrain: ${train}`);
}

// ---------------------------
// LOAD TRAIN OPTIONS IN BOOKING PAGE
// ---------------------------
function loadTrainOptions() {
    const select = document.getElementById("trainSelect");
    if (!select) return;

    trainData.forEach(train => {
        const opt = document.createElement("option");
        opt.value = `${train.number} - ${train.name}`;
        opt.textContent = `${train.number} - ${train.name}`;
        select.appendChild(opt);
    });
}

// Auto-run when page loads (for dropdowns)
window.onload = loadTrainOptions;
