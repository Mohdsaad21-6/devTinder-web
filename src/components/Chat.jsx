import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { createSocketConnection } from "../utils/socket";
import { useSelector } from "react-redux";
import axios from "axios";
import { BASE_URL } from "../utils/constants";

const Chat = () => {
  const { targetUserId } = useParams();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  const user = useSelector((store) => store.user);

  const userId = user?._id;

  const lastName = user?.lastName;
  const firstName = user?.firstName;

  const fetchChatMessages = async () => {
    const chat = await axios.get(BASE_URL + "/chat/" + targetUserId, {
      withCredentials: true,
    });

    const chatMessages = chat?.data?.messages.map((msg) => {
      const { firstName, lastName } = msg.senderId;
      const { text } = msg;
      return {
        firstName,
        lastName,
        text,
      };
    });

    setMessages(chatMessages);
  };

  useEffect(() => {
    fetchChatMessages();
  }, []);

  useEffect(() => {
    if (!userId) {
      return;
    }
    const socket = createSocketConnection();
    socket.emit("joinChat", { firstName, lastName, userId, targetUserId });

    socket.on("messageReceived", ({ firstName, lastName, text }) => {
      console.log("messageRecieved", { firstName, lastName, text });
      setMessages((messages) => [...messages, { firstName, lastName, text }]);
    });

    return () => {
      socket.disconnect();
    };
  }, [userId, targetUserId]);

  const sendMessage = () => {
    const socket = createSocketConnection();

    socket.emit("sendMessage", {
      firstName,
      lastName,
      userId,
      targetUserId,
      text: newMessage,
    });
    setNewMessage("");
  };

  return (
    <div className="w-full md:w-1/2 mx-auto border border-gray-600 m-5 mt-24 h-[70vh] flex flex-col">
      <h1 className="p-5 border-b border-gray-600 text-lg font-semibold text-center md:text-left">
        Chat
      </h1>
      <div className="flex-1 overflow-y-auto p-5">
        {messages.map((msg, index) => {
          return (
            <div key={index}>
              <div
                className={
                  "chat" +
                  (user.lastName === msg.lastName ? " chat-end" : " chat-start")
                }
              >
                <div className="chat-header text-sm md:text-base">
                  {msg.firstName + " " + msg.lastName}
                </div>
                <div className="chat-bubble text-sm md:text-base">
                  {msg.text}
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="p-5 border-t border-gray-600 flex items-center gap-2">
        <input
          className="flex-1 border border-gray-500 text-white rounded p-2 text-sm"
          placeholder="Type your message here..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <button
          className="btn btn-secondary px-3 py-1 text-xs"
          onClick={sendMessage}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;
