const date = new moment();
let containerEl = document.querySelector(".container");
if (localStorage.getItem("tasks") == null) {
    localStorage.setItem("tasks", JSON.stringify(["", "", "", "", "", "", "", "", ""]));
}
let localTasks = JSON.parse(localStorage.getItem("tasks"));

function saveTasks(event) {
    // Selects the value of the textarea next to the selected button
    let unsavedTask = event.target.parentElement.querySelector(".col-md-10").value;
    let taskIndex = event.target.parentElement.getAttribute("data-id");

    localTasks[taskIndex] = unsavedTask;
    localStorage.setItem("tasks", JSON.stringify(localTasks));
}

function renderPage() {

    function renderTime() {
        let monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        let weekdayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        let dateString = `${weekdayNames[date.day()]}, ${monthNames[date.month()]} ${date.format("MMM Do, YYYY")}`;
        $( "#currentDay" ).text( dateString );
    }

    function renderTasks() {
        let times = ["9 AM", "10 AM", "11 AM", "12 PM", "1 PM", "2 PM", "3 PM", "4 PM", "5 PM"];
        for (let i = 0; i < 9; i++) {
            // Creates one block per iteration
            let row = document.createElement("div");
            let timeSlot = document.createElement("div");
            let hour = document.createElement("p");
            let tasksArea = document.createElement("textarea");
            let saveBtn = document.createElement("button");
            let currentHour = date.hours();

            row.classList.add("row", "mt-2");
            timeSlot.classList.add("hour", "col-2", "col-md-1", "d-flex", "align-items-center");
            tasksArea.classList.add("col-8", "col-md-10");
            if (currentHour > (i+9)) {
                tasksArea.classList.add("past");
            } else if (currentHour === (i+9)) {
                tasksArea.classList.add("present")
            } else {
                tasksArea.classList.add("future");
            }
            saveBtn.classList.add("saveBtn", "col-2", "col-md-1");

            containerEl.appendChild(row);
            row.appendChild(timeSlot);
            timeSlot.appendChild(hour);
            row.appendChild(tasksArea);
            row.appendChild(saveBtn);

            row.setAttribute("data-id", `${i}`);

            hour.textContent = times[i];
            saveBtn.textContent = "💾";
        }
    }

    function loadTasks() {
        let rowEls = document.querySelectorAll(".row");
        for (let i = 0; i < rowEls.length; i++) {
            rowEls[i].querySelector(".col-md-10").textContent = localTasks[i];
        }
    }

    renderTime();
    renderTasks();
    loadTasks();
}

renderPage();

$(".container").on("click", ".saveBtn", saveTasks);