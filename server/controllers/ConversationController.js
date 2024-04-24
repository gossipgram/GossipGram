const Chat = require("../models/Conversation");
const User = require("../models/User");
const { uploadImageToCloudinary } = require("../utils/imageUploader");

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
    return res.status(400).send({ message: "Please Fill all the fields" });
  }

  // Splitting the string by commas to get an array of user IDs
  var users = req.body.users.split(",");

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
      groupImage:
        "https://res.cloudinary.com/dmnbbtccl/image/upload/v1713170505/MajorProject/esrtxhlym4qmyabqwqeg.jpg",
    });

    const fullGroupChat = await Chat.findOne({ _id: groupChat._id })
      .populate("users", "-password")
      .populate("groupAdmin", "-password");

    res.status(200).json(fullGroupChat);
  } catch (error) {
    res.status(500).send({ message: error.message });
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
  console.log(req)
  try {
    const { chatId, userId } = req.body;
    const requesterId = req.user._id;

    // Check if the chat exists
    const chat = await Chat.findById(chatId).populate("groupAdmin").populate("users", "_id");
    if (!chat) {
      return res.status(404).json({ message: "Chat Not Found" });
    }

    // Check if the requester is the admin of the group
    // if (chat.groupAdmin._id.toString() !== requesterId.toString()) {
    //   return res.status(403).json({ message: "Only group admin can add users." });
    // }

    // Check if the user is already added to the chat
    const userExists = chat.users.some(user => user._id.toString() === userId.toString());
    if (userExists) {
      return res.status(400).json({ message: "User already added to the group." });
    }

    // Add user to the chat
    const added = await Chat.findByIdAndUpdate(
      chatId,
      {
        $push: { users: userId },
      },
      {
        new: true,
      }
    ).populate("users", "-password").populate("groupAdmin", "-password");

    res.json(added);
  } catch (error) {
    console.error("Error adding user to group:", error);
    res.status(500).json({ message: "Internal server error" , error });
  }
};

const updateGroupImage = async (req, res) => {
  try {
    const { chatId }= req.body;
    const displayPicture = req.files.displayPicture;
    console.log("displayPicture",displayPicture)
    console.log("chatId",chatId)
    const image = await uploadImageToCloudinary(
      displayPicture,
      process.env.FOLDER_NAME,
      1000,
      1000
    );
    const updatedProfile = await Chat.findByIdAndUpdate(
      chatId ,
      { groupImage: image.secure_url },
      { new: true }
    ).populate("users", "-password")
      .populate("groupAdmin", "-password")
      .populate("latestMessage")
    res.send({
      success: true,
      message: `Image Updated successfully`,
      data: updatedProfile,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const addUserAsAdmin = async (req, res) => {
  try {
    const { chatId, userId } = req.body;
    const requesterId = req.user._id;


    const chat = await Chat.findById(chatId).populate("groupAdmin", "_id");
    if (!chat) {
      return res.status(404).json({ message: "Chat Not Found" });
    }


    if (!chat.groupAdmin.some((admin) => admin._id.toString() === requesterId.toString())) {
      return res.status(403).json({ message: "Only the current group admin can perform this action." });
    }


    chat.groupAdmin.push(userId);
    

    const updatedChat = await chat.save();

    res.json(updatedChat);
  } catch (error) {
    console.error("Error adding user as group admin:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  accessChat,
  fetchChats,
  createGroupChat,
  renameGroup,
  addToGroup,
  removeFromGroup,
  updateGroupImage,
  addUserAsAdmin
};
