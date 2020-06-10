const socket = io("http://localhost:3000");
const messageContainer = document.getElementById("message-container");
const messageForm = document.getElementById("send-container");
const messageInput = document.getElementById("message-input");

socket.on("chat-message", (data) => {
    appendMessage(data);
})

socket.on("database", (data) => {
    for(i = 0; i < data.length; i++) {
        appendMessage(data[i].message);
    }
})

messageForm.addEventListener("submit", e => {
    e.preventDefault();
    let message = messageInput.value;
    socket.emit("send-chat-message", message);
    appendMessage("You: " + message);
    messageInput.value = " ";
})

function appendMessage(message){
    const messageElement = document.createElement("div");
    messageElement.innerText = message;

    messageContainer.append(messageElement);
}