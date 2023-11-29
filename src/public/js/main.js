const socketClient = io();

const button = document.querySelector("#button");

button.addEventListener("click", (e) => {
    e.preventDefault();

    const title = document.querySelector("#title");
    const description = document.querySelector("#description");

    const nvoProducto ={
        title: title.value,
        // description: description.value
    }

    socketClient.emit("objetForm", nvoProducto)
})