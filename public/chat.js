//socket connection
const socket = io.connect("http://localhost:4000");

const message = document.getElementById("message");
const handle = document.getElementById("handle");
const btn = document.getElementById("send");
const output = document.getElementById("output");
const feedback = document.getElementById("feedback");

btn.addEventListener("click", () => {
  socket.emit("chat", {
    message: message.value,
    name: handle.value
  });
  message.value = "";
});

message.addEventListener("input", () => {
  socket.emit("typing", handle.value);
});

socket.on("chat", data => {
  feedback.innerHTML = "";
  output.innerHTML += `<p><strong>${data.name}</strong>: ${data.message} </p>`;
});

socket.on("typing", data => {
  feedback.innerHTML = `<p><em>${data}</em> is typing...</p>`;
});
