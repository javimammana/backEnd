import { Router } from "express";
import chatDao from "../daos/dbManager/chat.dao.js";

const router = Router();


router.get ("/", async (req, res) => {
    try {
        const chats = await chatDao.getAllMessages();
        console.log(chats);
        res.render("chat", {
            title: "CHAT",
            fileCss: "chatStyle.css",
            chats,
        });
    } catch (e) {
        console.log(e);
        res.json({
            message: "Error al leer Mensajes",
            e,
        });
    }
})


export default router;