import { addTask, sortTasksByPriority, displayTasksDueInTimeframe, sendReminders } from './taskmanager.js';

document.getElementById('addTaskBtn').addEventListener('click', async () => {
    const title = document.getElementById('taskTitle').value;
    const dueTime = parseInt(document.getElementById('taskDueTime').value);
    const priority = document.getElementById('taskPriority').value;

    if (!title || isNaN(dueTime) || !priority) {
        return alert("Please fill in all fields correctly.");
    }

    try {
        await addTask(title, dueTime, priority);
        updateTaskList();
    } catch (error) {
        console.error(error);
    }
});

document.getElementById('showDueTasksBtn').addEventListener('click', () => {
    const dueTasks = displayTasksDueInTimeframe(10);
    alert("Tasks due in the next 10 minutes:\n" + dueTasks.map(task => task.title).join("\n"));
});

document.getElementById('sendRemindersBtn').addEventListener('click', async () => {
    try {
        await sendReminders();
        alert("Reminders sent.");
    } catch (error) {
        alert("Error: " + error.message);
    }
});

function updateTaskList() {
    const sortedTasks = sortTasksByPriority();
    document.getElementById('taskList').innerHTML = sortedTasks.map(task => 
        `<li>${task.title} - Due in ${task.dueTime} minutes - Priority: ${task.priority}</li>`
    ).join('');
}