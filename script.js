const date = new Date();
var containerEl = document.querySelector(".container");
if (localStorage.getItem("tasks") == null) {
    localStorage.setItem("tasks", JSON.stringify(["", "", "", "", "", "", "", "", ""]));
}
var localTasks = JSON.parse(localStorage.getItem("tasks"));

function saveTasks(event) {
    var unsavedTask = event.target.parentElement.querySelector(".col-10").value;
    var taskIndex = event.target.parentElement.getAttribute("data-id");
    localTasks[taskIndex] = unsavedTask;
    localStorage.setItem("tasks", JSON.stringify(localTasks));
}

function renderPage() {

    function renderTime() {
        var monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        var weekdayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        var dateString = `${weekdayNames[date.getDay()]}, ${monthNames[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`
        $( "#currentDay" ).text( dateString );
    }

    function renderTasks() {
        var times = ["9 AM", "10 AM", "11 AM", "12 PM", "1 PM", "2 PM", "3 PM", "4 PM", "5 PM"];
        for (let i = 0; i < 9; i++) {
            var row = document.createElement("div");
            var timeSlot = document.createElement("div");
            var hour = document.createElement("p");
            var tasksArea = document.createElement("textarea");
            var saveBtn = document.createElement("button");
            var currentHour = date.getHours();

            row.classList.add("row");
            timeSlot.classList.add("hour", "col-1", "d-flex", "align-items-center");
            tasksArea.classList.add("col-10");
            if (currentHour > (i+9)) {
                tasksArea.classList.add("past");
            } else if (currentHour === (i+9)) {
                tasksArea.classList.add("present")
            } else {
                tasksArea.classList.add("future");
            }
            saveBtn.classList.add("saveBtn", "col-1");

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
        var rowEls = document.querySelectorAll(".row");
        for (let i = 0; i < rowEls.length; i++) {
            rowEls[i].querySelector(".col-10").textContent = localTasks[i];
        }
    }

    renderTime();
    renderTasks();
    loadTasks();
}

renderPage();

$(".container").on("click", ".saveBtn", saveTasks);

// function constructPerson(one, two) {
//     if (one && two) {
//         var person = {
//             ageVal: one,
//             nameVal: two
//         }
//     } else {
//         // sdkfljlsdkfj
//     }

//     return person;
// }

// var age = 25;
// var name = "John Doe";

// console.log(new constructPerson(age, name));