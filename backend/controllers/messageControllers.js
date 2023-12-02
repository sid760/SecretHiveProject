const asyncHandler = require("express-async-handler");
const Message = require("../models/messageModel");
const User = require("../models/userModel");
const Chat = require("../models/chatModel");
require("dotenv").config();
const chatEncryptionKey = process.env.ENCRYPTION_KEY;
const {
  encryptMessage,
  decryptMessage,
} = require("../EncrptionUtils/Encryption");

//@description     Get all Messages
//@route           GET /api/Message/:chatId
//@access          Protected
const allMessages = asyncHandler(async (req, res) => {
  try {
    const messages = await Message.find({ chat: req.params.chatId })
      .populate("sender", "name pic username")
      .populate("chat");

    //decrypt  message
    const decryptedMessages = messages.map((message) => {
      const decryptedContent = decryptMessage(
        message.content,
        chatEncryptionKey
      );
      console.log("Decrypted content:", decryptedContent);
      return { ...message._doc, content: decryptedContent };
    });
    res.json(decryptedMessages);
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

//@description     Create New Message
//@route           POST /api/Message/
//@access          Protected
const sendMessage = asyncHandler(async (req, res) => {
  const { content, chatId } = req.body;

  if (!content || !chatId) {
    console.log("Invalid data passed into request");
    return res.sendStatus(400);
  }

  const encryptedMessage = encryptMessage(content, chatEncryptionKey);
  var newMessage = {
    sender: req.user._id,
    content: encryptedMessage.content,
    chat: chatId,
  };

  try {
    var message = await Message.create(newMessage);

    message = await message.populate("sender", "name pic").execPopulate();
    message = await message.populate("chat").execPopulate();
    message = await User.populate(message, {
      path: "chat.users",
      select: "name pic username",
    });

    await Chat.findByIdAndUpdate(req.body.chatId, { latestMessage: message });

    res.json(message);
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

module.exports = { allMessages, sendMessage };
