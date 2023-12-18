import { chatModel } from "../../models/chat.model.js";

class ChatDao {
    async getAllMessages() {
        return await chatModel.find();
    }

    async sendMessage(data) {
        return await chatModel.create(data);
    }
}

export default new ChatDao();
