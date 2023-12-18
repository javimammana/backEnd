
const socketClient = io();

const button = document.querySelector("#button");

////////////Vistas en timepos real/////////////
const deleteItem = (id) => {
    console.log(id);
    socketClient.emit("deleteOrden", id);

    Toastify({
        text: "Producto eliminado",
        duration: 3000,
        newWindow: true,
        close: true,
        gravity: "top", // `top` or `bottom`
        position: "right", // `left`, `center` or `right`
        style: {
            background: "linear-gradient(to right, #353434, #000)",
            color: "#ebce0f",
        },
    }).showToast();
};

button.addEventListener("click", (e) => {
    e.preventDefault();

    const form = document.getElementById("addProductForm");

    const title = document.querySelector("#title");
    const category = document.querySelector("#category");
    const description = document.querySelector("#description");
    const price = document.querySelector("#price");
    const code = document.querySelector("#code");
    const stock = document.querySelector("#stock");

    const nvoProducto = {
        title: title.value,
        category: category.value.toUpperCase(),
        description: description.value,
        price: Number(price.value),
        code: code.value.toUpperCase(),
        stock: Number(stock.value),
    };
    socketClient.emit("objetForm", nvoProducto);

    form.reset();
});

socketClient.on("resultado", (data) => {
    console.log(data);
    Toastify({
        text: data,
        duration: 2000,
        newWindow: true,
        close: true,
        gravity: "top",
        position: "right",
        style: {
            background: "linear-gradient(to right, #353434, #000)",
            color: "#ebce0f",
        },
    }).showToast();
});

socketClient.on("listProduct", (data) => {
    const log = document.querySelector("#listProducts");

    let listProducts = "";

    data.forEach((element) => {
        listProducts += `<div class="card">
                            <div class="flex">
                                <div>
                                    <img class="img" class="img" src="img/${element.thumbnail}">
                                </div>
                                <div class="info">
                                    <div class="cardInfo1">
                                        <h3>${element.title}</h3>
                                        <div>
                                            <h5>Categoria: ${element.category}</h5>
                                            <p>${element.description}</p>
                                        </div>
                                    </div>
                                    <div class="cardInfo2">
                                        <p>Codigo: ${element.code}  -  Stock: ${element.stock}</p>
                                        <h5>$ ${element.price}.-</h5>
                                    </div>
                                </div>
                            </div>
                            <div class="delete">
                                <button class="btn" onClick="deleteItem(${element._id}})">Borrar</button>
                            </div>
                        </div>`;
    });

    log.innerHTML = listProducts;
});

//////////////CHAT/////////////////////

// const chatbox = document.querySelector("#chatbox");
// let user;

// Swal.fire({
//     title: "Bienvenido",
//     text: "Ingrese su nombre para continuar",
//     input: "text",
//     inputValidator: (value) => {
//         return !value && "Necesitás identificarte";
//     },
//     allowOutsideClick: false,
// }).then((value) => {
//     user = value.value;
//     socketClient.emit("inicio", user);
// });

// chatbox.addEventListener("keyup", (e) => {
//     if (e.key === "Enter") {
//         socketClient.emit("message", {
//             user,
//             msg: e.target.value,
//         });
//         chatbox.value = "";
//     }
// });

// socketClient.on("connected", (data) => {
//     if (user !== undefined) {
//         Swal.fire({
//             text: `Nuevo usuario conectado: ${data}`,
//             toast: true,
//             position: "top-right",
//         });
//     }
// });

// socketClient.on("messages", (data) => {
//     const log = document.querySelector("#messages");
//     let messages = "";

//     data.forEach((message) => {
//         messages += `<strong>${message.user}</strong>: ${message.msg} <br />`;
//     });

//     log.innerHTML = messages;
// });