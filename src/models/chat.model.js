import { Schema, model } from "mongoose";

const chatSchema = new Schema ({
    user: {type:String},
    msg: {type: String},
    created: {type: Date},
});

const chatModel = model("message", chatSchema);


export { chatModel };