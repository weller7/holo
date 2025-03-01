import User from "../models/user.model.js"
import Message from "../models/message.model.js"
import cloudinary from "../lib/cloudinary.js"
import { getReceiverSocketId, io } from "../lib/socket.js"

export const getUsersForSidebar = async (req,res) => {


    try {
        const loggedInUserId = req.user._id

        //get all the users that arent the logged user, dont get passwords
        const filteredUsers = await User.find({_id: {$ne:loggedInUserId}}).select("-password")

        res.status(200).json(filteredUsers)
    } catch (error) {
        console.error("Error in getUsersFromSidebar: ", error.message)
        res.status(500).json({ error: "Internal server error"})
    }
}

export const getMessages = async (req, res) => {
    try {
        const { id:userToChatId } = req.params
        const myId = req.user._id

        //find all the messages where my user is the sender or the receiver
        const messages = await Message.find({
            $or:[
                {senderId:myId, receiverId:userToChatId},
                {senderId:userToChatId, receiverId:myId}
            ],
        })

        res.status(200).json(messages)
    } catch (error) {
        console.log("Error in getMessages controller: ", error.message)
        res.status(500).json({error: "Internal server error"})
    }
}

export const sendMessage = async (req, res) => {

    try {
        //take the text and img from the body and the receiver id and my id
        const {text, image} = req.body
        const { id: receiverId } = req.params
        const senderId = req.user._id
        
        let imageUrl
        if(image){
            //upload img to cloudinary
            const uploadResponse = await cloudinary.uploader.upload(image)
            imageUrl = uploadResponse.secure_url
        }

        //Create the message
        const newMessage = new Message({
            senderId,
            receiverId,
            text,
            image: imageUrl,
          });

        //save message to db
        await newMessage.save();

        //realtime funcionality send only to receiver id
        const receiverSocketId = getReceiverSocketId(receiverId)
        if(receiverSocketId){
            io.to(receiverSocketId).emit("newMessage", newMessage)
        }

        //send message to client
        res.status(201).json(newMessage);
  } catch (error) {
    console.log("Error in sendMessage controller: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
}