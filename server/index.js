const express = require("express");
const app = express();

// routes declared
const userRoutes = require("./routes/User");
const chatRoutes = require("./routes/chatRoutes");
const messageRoutes = require("./routes/messageRoute");
const postRoutes = require("./routes/postRoutes");

const database = require("./config/database");
const cookieParser = require("cookie-parser");
const bodyParser = require('body-parser');
const cors = require("cors");
const {cloudinaryConnect} = require("./config/cloudinary");
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
        origin:"http://localhost:3000",
        credentials:true,
    })
)

app.use(
    fileUpload({
        useTempFiles:true,
        tempFileDir:"/tmp",
    })
)

//cloudinary connection
cloudinaryConnect();

// app.use routes 
app.use("/api/v1/auth", userRoutes);
app.use("/api/v1/chat", chatRoutes);
app.use("/api/v1/message", messageRoutes);
app.use("/api/v1/media", postRoutes);

//def route 
app.get("/", (req ,res) => {
    return res.json({
        success:true,
        message:"your server is running......"
    });
});

app.listen(PORT , () => {
    console.log(`app is running at ${PORT}`);
})