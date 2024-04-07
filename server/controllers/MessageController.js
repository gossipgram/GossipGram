const Message = require("../models/Message");
const User = require("../models/User");
const Chat = require("../models/Conversation");

//@description     Get all Messages
//@route           GET /api/Message/:chatId
//@access          Protected
const allMessages = async (req, res) => {
  try {
    const messages = await Message.find({ chat: req.params.chatId })
      .populate("sender", "username image email")
      .populate("chat")
      .populate({
        path: "chat",
        populate: {
          path: "users",
          select: "username image email",
        }
      });
    res.json(messages);
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
};

// const allMessages = async (req, res) => {
//   const { chatId } = req.params;
//   const page = parseInt(req.query.page) || 1; // Default to first page
//   const limit = parseInt(req.query.limit) || 20; // Default limit to 20 messages
//   const skip = (page - 1) * limit;

//   try {
//     const messages = await Message.find({ chat: chatId })
//       .populate("sender", "username image email")
//       .populate("chat")
//       .populate({
//         path: "chat",
//         populate: {
//           path: "users",
//           select: "username image email",
//         },
//       })
//       .sort({ createdAt: -1 }) // Ensure latest messages first
//       .skip(skip)
//       .limit(limit);

//     const totalCount = await Message.countDocuments({ chat: chatId });
//     const totalPages = Math.ceil(totalCount / limit);

//     res.json({ messages, totalPages, currentPage: page });
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// };


//@description     Create New Message
//@route           POST /api/Message/
//@access          Protected


const sendMessage = async (req, res) => {
  const { content, chatId } = req.body;

  if (!content || !chatId) {
    console.log("Invalid data passed into request");
    return res.sendStatus(400);
  }

  var newMessage = {
    sender: req.user._id,
    content: content,
    chat: chatId,
  };

  try {
    var message = await Message.create(newMessage);

    message = await message.populate("sender", "username image email")
    message = await message.populate("chat");
    message = await User.populate(message, {
      path: "chat.users",
      select: "username image email",
    });
    await Chat.findByIdAndUpdate(req.body.chatId, { latestMessage: message });

    res.json(message);
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
};

module.exports = { allMessages, sendMessage };





// const Message = require("../models/Message");
// const Conversation = require("../models/Conversation");

// // Send a new message in a conversation
// exports.sendMessage = async (req, res) => {
//     try {
//         const { text } = req.body;
//         const conversationId = req.params.conversationId;
//         const userId = req.user.id;

//         // Validation
//         if (!text || !conversationId || !userId) {
//             return res.status(400).json({
//                 success: false,
//                 message: 'Text, conversationId, and userId are required',
//             });
//         }

//         const newMessage = new Message({
//             text,
//             user: userId,
//             conversation: conversationId,
//         });

//         const savedMessage = await newMessage.save();

//         // Update the conversation with the new message ID
//         await Conversation.findByIdAndUpdate(conversationId, { $push: { messages: savedMessage._id } });

//         return res.status(201).json({
//             success: true,
//             message: 'Message sent successfully',
//             message: savedMessage,
//         });
//     } catch (error) {
//         console.error(error);
//         return res.status(500).json({
//             success: false,
//             error: 'Internal Server Error',
//         });
//     }
// };

// // Get message details by ID
// exports.getMessageById = async (req, res) => {
//     try {
//         const messageId = req.params.messageId;
//         const message = await Message.findById(messageId);

//         if (!message) {
//             return res.status(404).json({
//                 success: false,
//                 message: 'Message not found',
//             });
//         }

//         return res.status(200).json({
//             success: true,
//             message: 'Message details fetched successfully',
//             message,
//         });
//     } catch (error) {
//         console.error(error);
//         return res.status(500).json({
//             success: false,
//             error: 'Internal Server Error',
//         });
//     }
// };

// // Get all messages for a specific conversation
// exports.getAllMessagesForConversation = async (req, res) => {
//     try {
//         const conversationId = req.params.conversationId;
//         const messages = await Message.find({ conversation: conversationId });

//         return res.status(200).json({
//             success: true,
//             message: 'All messages for the conversation fetched successfully',
//             messages,
//         });
//     } catch (error) {
//         console.error(error);
//         return res.status(500).json({
//             success: false,
//             error: 'Internal Server Error',
//         });
//     }
// };

// // Update message details by ID
// exports.updateMessageById = async (req, res) => {
//     try {
//         const messageId = req.params.messageId;
//         const { text } = req.body;

//         const updatedMessage = await Message.findByIdAndUpdate(
//             messageId,
//             { text },
//             { new: true }
//         );

//         if (!updatedMessage) {
//             return res.status(404).json({
//                 success: false,
//                 message: 'Message not found',
//             });
//         }

//         return res.status(200).json({
//             success: true,
//             message: 'Message updated successfully',
//             message: updatedMessage,
//         });
//     } catch (error) {
//         console.error(error);
//         return res.status(500).json({
//             success: false,
//             error: 'Internal Server Error',
//         });
//     }
// };

// // Delete message by ID
// exports.deleteMessageById = async (req, res) => {
//     try {
//         const messageId = req.params.messageId;

//         const deletedMessage = await Message.findByIdAndDelete(messageId);

//         if (!deletedMessage) {
//             return res.status(404).json({
//                 success: false,
//                 message: 'Message not found',
//             });
//         }

//         // Remove the message ID from the associated conversation
//         await Conversation.findByIdAndUpdate(deletedMessage.conversation, { $pull: { messages: deletedMessage._id } });

//         return res.status(200).json({
//             success: true,
//             message: 'Message deleted successfully',
//             message: deletedMessage,
//         });
//     } catch (error) {
//         console.error(error);
//         return res.status(500).json({
//             success: false,
//             error: 'Internal Server Error',
//         });
//     }
// };
