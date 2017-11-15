// DOM elements
var inputInitialField = document.getElementById("inputEnterItem");
var buttonSave = document.getElementById("btnSave");
var taskListContainer = document.getElementById("task-list");
var ulTaskList = document.getElementById("taskList");

// Create array for task list if localStorage is empty
if (JSON.parse(localStorage.getItem("taskList")) === null) {
  var taskList = [];
}
// Create array for task list and populate with items from localStorage
else {
  var taskList = JSON.parse(localStorage.getItem("taskList"));
  taskListContainer.style.display = "block";
}

// Load task list from taskList array and update DOM
if (taskList.length > 0) {
  function loadListItems() {
    ulTaskList.innerHTML = taskList[0];
  }
  loadListItems();
}

// Update local storage and DOM with new task item
function saveTask() {
  if (inputInitialField.value !== "") {
            
    // Updating DOM
    // -- Add new <li>
    var ulTaskListItem = document.createElement("li"); // Creates <li>
    var ulTaskListItemValue = document.createTextNode(inputInitialField.value); // Creates variable for text entered
    
    var ulTaskListItemContainer = document.createElement("span"); // Creates <span>
    ulTaskListItemContainer.setAttribute("contenteditable", "true"); // Makes <span> editable
    ulTaskListItemContainer.appendChild(ulTaskListItemValue); // Appends value to <span>
    ulTaskListItem.appendChild(ulTaskListItemContainer); // Appends <span> to <li>
    
    ulTaskList.appendChild(ulTaskListItem); // Appends <li> and text to bottom of <ul>
    
    updateStorage(); // Update array and localStorage
    
    taskListContainer.style.display = "block"; // Set list container to be visible once first item is added
    inputInitialField.value = ""; // Remove value from input field
    inputInitialField.focus(); // Set focus back to field
  }
}
buttonSave.addEventListener("click", saveTask);

// Update array and localStorage
function updateStorage() {
  taskList.unshift(ulTaskList.innerHTML); // Update array <li>s
  localStorage.setItem("taskList", JSON.stringify(taskList)); // Update localStorage with array 
}

// I want to be able to edit list items
ulTaskList.addEventListener('keydown', function (event) {
  var esc = event.which == 27,
    nl = event.which == 13,
    el = event.target,
    input = el.nodeName != 'INPUT' && el.nodeName != 'TEXTAREA',
    data = {};

  if (input) {
  if (esc) {
    // restore state
    ulTaskList.execCommand('undo');
    el.blur();
  }
  else if (nl) {
    updateStorage(); // Update array and localStorage
    el.blur();
    event.preventDefault();
  }
  }
}, true);

