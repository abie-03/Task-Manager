const Table = [
  {
    category: "Work",
    subcategory: "Meeting",
    duration: "2 hours",
    task: "Client meeting",
  },
  {
    category: "Personal Work",
    subcategory: "Study",
    duration: "1 hour",
    task: "Book 1",
  },
  {
    category: "Work",
    subcategory: "Project 1",
    duration: "2.5 hours",
    task: "Problem Set",
  },
  {
    category: "Personal Work",
    subcategory: "Exercise",
    duration: "1.5 hours",
    task: "Weights",
  },
  {
    category: "Work",
    subcategory: "Training",
    duration: "3 hours",
    task: "Take Notes",
  },
  {
    category: "Personal Work",
    subcategory: "Shopping",
    duration: "1 hour",
    task: "Go to Store",
  },
  {
    category: "Work",
    subcategory: "Report",
    duration: "4 hours",
    task: "Data Analysis",
  },
  {
    category: "Personal Work",
    subcategory: "Hobby",
    duration: "1 hour",
    task: "Painting",
  },
  {
    category: "Work",
    subcategory: "Project B",
    duration: "3 hours",
    task: "Architecture Design",
  },
  {
    category: "Personal Work",
    subcategory: "Cooking",
    duration: "1.5 houra",
    task: "Prepare Ingredients and cook",
  },
];

// Display function
const display = (data) => {
  const task = document.getElementById("tasktable");
  task.innerHTML = ""; // Clearing existing table content

  //Iterating
  data.forEach((item, index) => {
    var row = task.insertRow();
    Object.values(item).forEach((value) => {
      const cell = row.insertCell();
      const text = document.createTextNode(value);
      cell.appendChild(text);
    });
    //update and delete button
    const updateCell = row.insertCell();
    const updateButton = document.createElement("button");
    updateButton.textContent = "Update";
    updateButton.addEventListener("click", () => {
      handleUpdate(index);
    });
    updateCell.appendChild(updateButton);
    const deleteCell = row.insertCell();
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.addEventListener("click", () => {
      handleDelete(index);
    });
    deleteCell.appendChild(deleteButton);
    row.id = `row_${index}`;
  });
};
const handleUpdate = (index) => {
  const rowData = Table[index];
  document.getElementById("category").value = rowData.category;
  console.log(document.getElementById("category").value);
  document.getElementById("subcategory").value = rowData.subcategory;
  console.log(document.getElementById("subcategory").value);
  document.getElementById("task").value = rowData.task;
  document.getElementById("timerDisplay").innerText = rowData.duration;
  // Setting a flag to indicate update mode and storing the index of the task
  document.getElementById("addUpdateButton").setAttribute("data-index", index);
};

const handleDelete = (index) => {
  // Implement your delete logic here
  // Remove item from the Table array and update the display
  Table.splice(index, 1);
  display(Table);
  console.log("Delete button clicked for index:", index);
};
// Filtering function
const filterTable = (category, data) => {
  return data.filter((item) => {
    if (category === "all") {
      return true;
    } else {
      return item.category.toLowerCase() === category.toLowerCase();
    }
  });
};

// Event listener
const handleFilterChange = () => {
  const category = document.getElementById("category-filter").value;
  const filteredData = filterTable(category, Table);
  display(filteredData);
};

document
  .getElementById("category-filter")
  .addEventListener("change", handleFilterChange);

// Initially display entire table
display(Table);
hours = 0;
minutes = 0;
seconds = 0;
isRunning = false;
function startstop() {
  if (!isRunning) {
    intervalId = setInterval(() => {
      seconds++;
      if (seconds >= 60) {
        seconds = 0;
        minutes++;
        if (minutes >= 60) {
          hours++;
          minutes = 0;
        }
      }
      isRunning = true;
      document.getElementById("startStopButton").innerText = "Stop";
      updateTimerDisplay();
    }, 1000);
  } else {
    isRunning = false;
    clearInterval(intervalId);
    document.getElementById("startStopButton").innerText = "Start";
  }
}
const reset = () => {
  clearInterval(intervalId);
  isRunning = false;
  seconds = 0;
  minutes = 0;
  hours = 0;
  let format = `${hours.toString().padStart(2, "0")}:${minutes
    .toString()
    .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  document.querySelector("#timerDisplay").innerText = format;
};
// Function to update timer display
function updateTimerDisplay() {
  let formattedTime = "";
  if (hours > 0) {
    formattedTime += hours + " hour";
    if (hours > 1) formattedTime += "s";
    formattedTime += " ";
  }
  if (minutes > 0) {
    formattedTime += minutes + " minute";
    if (minutes > 1) formattedTime += "s";
    formattedTime += " ";
  }
  if (seconds > 0) {
    formattedTime += seconds + " second";
    if (seconds > 1) formattedTime += "s";
  }
  document.querySelector("#timerDisplay").innerText = formattedTime;
}

const addTask = () => {
  const category = document.getElementById("category").value;
  const subcategory = document.getElementById("subcategory").value;
  const task = document.getElementById("task").value;
  const duration = document.getElementById("timerDisplay").textContent;
  const index = document
    .getElementById("addUpdateButton")
    .getAttribute("data-index");

  console.log(category);
  console.log(subcategory);
  console.log(task);
  console.log(duration);
  const newTask = {
    category: category,
    subcategory: subcategory,
    duration: duration,
    task: task,
  };
  if (index === null) {
    Table.push(newTask);
  } else {
    Table[index] = newTask;
    document.getElementById("addUpdateButton").removeAttribute("data-index");
  }
  document.getElementById("category").value = "";
  document.getElementById("subcategory").value = "";
  document.getElementById("task").value = "";
  document.getElementById("timerDisplay").innerText = "0 Second";
  display(Table);
};
