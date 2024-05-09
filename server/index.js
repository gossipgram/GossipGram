const express = require("express");
const app = express();

// routes declared
const userRoutes = require("./routes/User");
const chatRoutes = require("./routes/chatRoutes");
const messageRoutes = require("./routes/messageRoute");
const postRoutes = require("./routes/postRoutes");
const likeRoutes = require("./routes/likeRoutes");
const commentRoutes = require("./routes/commentRoutes");
const followRoutes = require("./routes/followRoutes");
const profileRoute = require("./routes/profileRoute");
const recentSearchRoute = require("./routes/recentSeachRoutes");
const kundaliRoutes = require("./routes/KundaliRoutes");
const hashtagPostsRoute = require("./routes/hashtagPostsRoutes");
const FollowRequestRoutes = require("./routes/FollowRequestRoutes")

const database = require("./config/database");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const cors = require("cors");
const { cloudinaryConnect } = require("./config/cloudinary");
const fileUpload = require("express-fileupload");
const dotenv = require("dotenv");

dotenv.config();
const PORT = process.env.PORT || 4000;

database.connect();
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);

app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp",
  })
);

//cloudinary connection
cloudinaryConnect();

// app.use routes
app.use("/api/v1/auth", userRoutes);
app.use("/api/v1/chat", chatRoutes);
app.use("/api/v1/message", messageRoutes);
app.use("/api/v1/media", postRoutes);
app.use("/api/v1/likes", likeRoutes);
app.use("/api/v1/comments", commentRoutes);
app.use("/api/v1/friends", followRoutes);
app.use("/api/v1/profile", profileRoute);
app.use("/api/v1/recents", recentSearchRoute);
app.use("/api/v1/kundali", kundaliRoutes);
app.use("/api/v1/hashtag-post", hashtagPostsRoute);
app.use("/api/v1/follow-request", FollowRequestRoutes);

//def route
app.get("/", (req, res) => {
  return res.json({
    success: true,
    message: "your server is running......",
  });
});

const server = app.listen(PORT, () => {
  console.log(`app is running at ${PORT}`);
});

const io = require("socket.io")(server, {
  pingTimeout: 60000,
  cors: {
    origin: "*",
    // credentials: true,
  },
});

io.on("connection", (socket) => {
  console.log("Connected to socket.io");

  socket.on("setup", (userData) => {
    socket.join(userData?.userDetails?._id);
    socket.emit("connected");
  });

  socket.on("join chat", (room) => {
    socket.join(room);
    console.log("User Joined Room: " + room);
  });

  // socket.on("typing", (room) => socket.in(room).emit("typing"));
  // console.log("inside the typing in index")
  // socket.on("stop typing", (room) => socket.in(room).emit("stop typing"));

  socket.on("new message", (newMessageRecieved) => {
    var chat = newMessageRecieved.chat;
    console.log("----------------", newMessageRecieved);

    if (!chat?.users) return console.log("chat.user not defined");

    chat.users.forEach((user) => {
      if (user._id == newMessageRecieved.sender._id) return;

      socket.in(user._id).emit("message recieved", newMessageRecieved);
    });
  });
});
