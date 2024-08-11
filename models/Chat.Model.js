import { model, Schema } from "mongoose";

const chatSchema = new Schema(
  {
    senderID: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    reciverID: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    message: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Chat = model("Chat", chatSchema);

export default Chat;
