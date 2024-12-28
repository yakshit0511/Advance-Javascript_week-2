let tasks = [];

const priorityMap = { High: 3, Medium: 2, Low: 1 };

export function addTask(title, dueTime, priority) {
    if (!title || dueTime <= 0 || !priority) throw new Error("Invalid task data.");
    tasks.push({ title, dueTime, priority });
}

export function sortTasksByPriority() {
    return tasks.sort((a, b) => priorityMap[b.priority] - priorityMap[a.priority]);
}

export function displayTasksDueInTimeframe(minutes) {
    const futureTime = Date.now() + minutes * 60000;
    return tasks.filter(task => Date.now() + task.dueTime * 60000 <= futureTime);
}

export function sendReminders() {
    if (!tasks.length) throw new Error("No tasks available.");
    tasks.forEach(task => {
        setTimeout(() => console.log(`Reminder: Task "${task.title}" is due!`), task.dueTime * 60000);
    });
}