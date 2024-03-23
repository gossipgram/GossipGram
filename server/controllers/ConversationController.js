const Chat = require("../models/Conversation");
const User = require("../models/User");

//@description     Create or fetch One to One Chat
//@route           POST /api/chat/
//@access          Protected
const accessChat = async (req, res) => {
  const { userId } = req.body;

  if (!userId) {
    console.log("UserId param not sent with request");
    return res.sendStatus(400);
  }

  // Check if a chat with the same users exists
  const existingChat = await Chat.findOne({
    isGroupChat: false,
    $or: [
      { users: { $all: [req.user._id, userId] } },
      { users: { $all: [userId, req.user._id] } },
    ],
  });

  if (existingChat) {
    return res.send(existingChat);
  }

  // Create a new chat if no existing chat is found
  const chatData = {
    chatName: "sender",
    isGroupChat: false,
    users: [req.user._id, userId],
  };

  try {
    const createdChat = await Chat.create(chatData);
    const FullChat = await Chat.findOne({ _id: createdChat._id }).populate(
      "users",
      "-password"
    );
    res.status(200).json(FullChat);
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
};


//@description     Fetch all chats for a user
//@route           GET /api/chat/
//@access          Protected
const fetchChats = async (req, res) => {
  try {
    Chat.find({ users: { $elemMatch: { $eq: req.user._id } } })
      .populate("users", "-password")
      .populate("groupAdmin", "-password")
      .populate("latestMessage")
      .sort({ updatedAt: -1 })
      .then(async (results) => {
        results = await User.populate(results, {
          path: "latestMessage.sender",
          select: "name pic email",
        });
        res.status(200).send(results);
      });
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
};

//@description     Create New Group Chat
//@route           POST /api/chat/group
//@access          Protected
const createGroupChat = async (req, res) => {
  if (!req.body.users || !req.body.name) {
    return res.status(400).send({ message: "Please Fill all the feilds" });
  }

  var users = JSON.parse(req.body.users);

  if (users.length < 2) {
    return res
      .status(400)
      .send("More than 2 users are required to form a group chat");
  }

  users.push(req.user);

  try {
    const groupChat = await Chat.create({
      chatName: req.body.name,
      users: users,
      isGroupChat: true,
      groupAdmin: req.user,
    });

    const fullGroupChat = await Chat.findOne({ _id: groupChat._id })
      .populate("users", "-password")
      .populate("groupAdmin", "-password");

    res.status(200).json(fullGroupChat);
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
};

// @desc    Rename Group
// @route   PUT /api/chat/rename
// @access  Protected
const renameGroup = async (req, res) => {
  const { chatId, chatName } = req.body;

  const updatedChat = await Chat.findByIdAndUpdate(
    chatId,
    {
      chatName: chatName,
    },
    {
      new: true,
    }
  )
    .populate("users", "-password")
    .populate("groupAdmin", "-password");

  if (!updatedChat) {
    res.status(404);
    throw new Error("Chat Not Found");
  } else {
    res.json(updatedChat);
  }
};

// @desc    Remove user from Group
// @route   PUT /api/chat/groupremove
// @access  Protected
const removeFromGroup = async (req, res) => {
  const { chatId, userId } = req.body;

  // check if the requester is admin

  const removed = await Chat.findByIdAndUpdate(
    chatId,
    {
      $pull: { users: userId },
    },
    {
      new: true,
    }
  )
    .populate("users", "-password")
    .populate("groupAdmin", "-password");

  if (!removed) {
    res.status(404);
    throw new Error("Chat Not Found");
  } else {
    res.json(removed);
  }
};

// @desc    Add user to Group / Leave
// @route   PUT /api/chat/groupadd
// @access  Protected
const addToGroup = async (req, res) => {
  const { chatId, userId } = req.body;

  // check if the requester is admin

  const added = await Chat.findByIdAndUpdate(
    chatId,
    {
      $push: { users: userId },
    },
    {
      new: true,
    }
  )
    .populate("users", "-password")
    .populate("groupAdmin", "-password");

  if (!added) {
    res.status(404);
    throw new Error("Chat Not Found");
  } else {
    res.json(added);
  }
};

module.exports = {
  accessChat,
  fetchChats,
  createGroupChat,
  renameGroup,
  addToGroup,
  removeFromGroup,
};







// const Conversation = require("../models/Conversation");
// const Message = require("../models/Message");
// const User = require("../models/User");

// // Create a new conversation
// exports.createConversation = async (req, res) => {
//     try {
//         const { participants, name } = req.body;

//         // Validation
//         if (!participants || participants.length < 2) {
//             return res.status(400).json({
//                 success: false,
//                 message: 'At least two participants are required for a conversation',
//             });
//         }

//         const newConversation = new Conversation({
//             participants,
//             name,
//         });

//         const savedConversation = await newConversation.save();

//         return res.status(201).json({
//             success: true,
//             message: 'Conversation created successfully',
//             conversation: savedConversation,
//         });
//     } catch (error) {
//         console.error(error);
//         return res.status(500).json({
//             success: false,
//             error: 'Internal Server Error',
//         });
//     }
// };

// // Get conversation details by ID
// exports.getConversationById = async (req, res) => {
//     try {
//         const conversationId = req.params.conversationId;
//         const conversation = await Conversation.findById(conversationId);

//         if (!conversation) {
//             return res.status(404).json({
//                 success: false,
//                 message: 'Conversation not found',
//             });
//         }

//         return res.status(200).json({
//             success: true,
//             message: 'Conversation details fetched successfully',
//             conversation,
//         });
//     } catch (error) {
//         console.error(error);
//         return res.status(500).json({
//             success: false,
//             error: 'Internal Server Error',
//         });
//     }
// };

// // Get all conversations for a specific user
// exports.getAllConversationsForUser = async (req, res) => {
//     try {
//         const userId = req.user.id;
//         const conversations = await Conversation.find({ participants: userId });

//         return res.status(200).json({
//             success: true,
//             message: 'All conversations for the user fetched successfully',
//             conversations,
//         });
//     } catch (error) {
//         console.error(error);
//         return res.status(500).json({
//             success: false,
//             error: 'Internal Server Error',
//         });
//     }
// };

// // Update conversation details by ID
// exports.updateConversationById = async (req, res) => {
//     try {
//         const conversationId = req.params.conversationId;
//         const { participants, name } = req.body;

//         const updatedConversation = await Conversation.findByIdAndUpdate(
//             conversationId,
//             { participants, name },
//             { new: true }
//         );

//         if (!updatedConversation) {
//             return res.status(404).json({
//                 success: false,
//                 message: 'Conversation not found',
//             });
//         }

//         return res.status(200).json({
//             success: true,
//             message: 'Conversation updated successfully',
//             conversation: updatedConversation,
//         });
//     } catch (error) {
//         console.error(error);
//         return res.status(500).json({
//             success: false,
//             error: 'Internal Server Error',
//         });
//     }
// };

// // Delete conversation by ID
// exports.deleteConversationById = async (req, res) => {
//     try {
//         const conversationId = req.params.conversationId;

//         const deletedConversation = await Conversation.findByIdAndDelete(conversationId);

//         if (!deletedConversation) {
//             return res.status(404).json({
//                 success: false,
//                 message: 'Conversation not found',
//             });
//         }

//         // Delete all messages associated with the conversation
//         await Message.deleteMany({ conversation: conversationId });

//         return res.status(200).json({
//             success: true,
//             message: 'Conversation deleted successfully',
//             conversation: deletedConversation,
//         });
//     } catch (error) {
//         console.error(error);
//         return res.status(500).json({
//             success: false,
//             error: 'Internal Server Error',
//         });
//     }
// };
