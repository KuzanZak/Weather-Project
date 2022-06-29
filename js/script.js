async function waitingForResponse() {
    const response = await fetch("");
    const todoList = await response.json();
    console.table(todoList);
}
waitingForResponse();