import { Schema, model } from "mongoose";

const chatSchema = new Schema ({
    user: {type:String},
    msg: {type: String},
});

const chatModel = model("message", chatSchema);


export { chatModel };