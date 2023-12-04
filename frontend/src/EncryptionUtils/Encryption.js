// EncryptionUtils.js
const crypto = require("crypto");

function encryptMessage(message, chatEncryptionKey) {
  const paddingLength = 16 - (message.length % 16);
  const padding = new Array(paddingLength + 1).join("e");
  console.log("padding = ", padding);
  message += padding;
  console.log(message);
  const cipher = crypto.createCipheriv(
    "aes-256-ecb",
    Buffer.from(chatEncryptionKey, "hex"),
    null
  );
  let encryptedMessage = cipher.update(message, "utf8", "hex");

  cipher.setAutoPadding(true);
  encryptedMessage += cipher.final("hex");
  return {
    content: encryptedMessage,
  };
}

function decryptMessage(encryptedMessage, chatEncryptionKey) {
  console.log("passed", encryptedMessage);
  const decipher = crypto.createDecipheriv(
    "aes-256-ecb",
    Buffer.from(chatEncryptionKey, "hex"),
    null
  );
  let decryptedMessage = decipher.update(encryptedMessage, "hex", "utf8");
  decipher.setAutoPadding(false);
  decryptedMessage += decipher.final("utf8");
  decryptedMessage = decryptedMessage.replace(/e+$/, "");
  return decryptedMessage;
}

module.exports = {
  encryptMessage,
  decryptMessage,
};
