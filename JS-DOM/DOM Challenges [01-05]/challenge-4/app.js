 const addButton = document.getElementById('addButton');
 const taskInput = document.getElementById('taskInput');
 const taskListContainer = document.getElementById('taskList');
 const totalTasks = document.getElementById('totalTasks');
 const completedTasks = document.getElementById('completedTasks');

 function updateCompletedCount() {
    const checkedTasks = document.querySelectorAll('.complete-checkbox:checked');
    checkedTasks.className="completed";
    completedTasks.innerHTML = "Completed: " + checkedTasks.length;
}

 addButton.addEventListener("click", () => {
    const li = document.createElement("li");
    li.className = "task-item";
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.className = "complete-checkbox";
    checkbox.addEventListener('change', () => {
        li.classList.toggle("completed")
        updateCompletedCount()
    });

    const taskText = document.createElement("span");
    taskText.className = "task-text";
    taskText.innerText = taskInput.value;

    const delBtn = document.createElement("span");
    delBtn.className = "delete-button";
    delBtn.innerText = 'X';
    delBtn.addEventListener('click', () => li.remove());
    li.append(checkbox);
    li.append(taskText);
    li.append(delBtn);
    const emptyListMessage = document.querySelector('.empty-list');
    if (emptyListMessage) {
        emptyListMessage.remove();
    }

    taskListContainer.appendChild(li);
    taskInput.value = ''; 
    totalTasks.innerHTML="Total task: "+taskListContainer.childElementCount;
 });