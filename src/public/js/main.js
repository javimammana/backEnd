const socketClient = io();

//////////////CHAT/////////////////////

const chatbox = document.querySelector("#chatbox");
let user;

Swal.fire({
    title: "Bienvenido",
    text: "Ingrese su nombre para continuar",
    input: "text",
    inputValidator: (value) => {
        return !value && "Necesitás identificarte";
    },
    allowOutsideClick: false,
}).then((value) => {
    user = value.value;
    socketClient.emit("inicio", user);
});

chatbox.addEventListener("keyup", (e) => {
    if (e.key === "Enter") {
        socketClient.emit("message", {
            user,
            msg: e.target.value,
            created: Date(),
        });
        chatbox.value = "";
    }
});

socketClient.on("connected", (data) => {
    if (user !== undefined) {
        Swal.fire({
            text: `Nuevo usuario conectado: ${data}`,
            toast: true,
            position: "top-right",
        });
    }
});

socketClient.on("messages", (data) => {
    const logChat = document.querySelector("#messages");
    let messages = "";

    data.forEach((message) => {
        messages += `<strong>${message.user}</strong>: ${message.msg} <br />`;
    });

    logChat.innerHTML = messages;
});
