import React, { useState } from "react";
import ChatWindow from "./ChatWindow";
import { FiShare2 } from "react-icons/fi";
import { v4 as uuidv4 } from "uuid";
import logo from './assets/white_logo.png'

const ChatLayout = () => {
  const [chats, setChats] = useState({});
  const [activeChatId, setActiveChatId] = useState(() => {
    const id = uuidv4();
    return id;
  });

  // Add new chat session
  const createNewChat = () => {
    const newId = uuidv4();
    setChats((prev) => ({ ...prev, [newId]: [] }));
    setActiveChatId(newId);
  };

  // Send message
  const handleSend = (botmsg,msg) => {
    const newMsg = { sender: "user", text: msg };
    const botReply = { sender: "bot", text: `You said: ${botmsg}` };

    setChats((prev) => ({
      ...prev,
      [activeChatId]: [...(prev[activeChatId] || []), newMsg, botReply],
    }));
  };

  // Share chat
  const handleShare = () => {
    const currentChat = chats[activeChatId] || [];
    const textToCopy = currentChat.map(m => `${m.sender}: ${m.text}`).join("\n");
    navigator.clipboard.writeText(textToCopy);
    alert("Chat copied to clipboard!");
  };

  return (
    <div style={styles.layout}>
      {/* Sidebar */}
      <div style={styles.sidebar}>
        <div style={styles.logo}>
            <img style={styles.images} src={logo} alt="" />
            <h2 style={styles.title}> interntribe</h2>
        </div>
        <button onClick={createNewChat} style={styles.newChatBtn}>+ New Chat</button>
        <div style={styles.chatList}>
          {Object.keys(chats).map((id, idx) => (
            <div
              key={id}
              onClick={() => setActiveChatId(id)}
              style={{
                ...styles.chatItem,
                backgroundColor: id === activeChatId ? "#333" : "transparent",
              }}
            >
              Chat {idx + 1}
            </div>
          ))}
        </div>
      </div>

      {/* Main Chat Window */}
      <div style={styles.chatArea}>
        {/* Header */}
        <div style={styles.header}>
          <h3>Chat Assistant</h3>
          <FiShare2 size={20} onClick={handleShare} style={{ cursor: "pointer" }} />
        </div>

        {/* Chat Window */}
        <ChatWindow
          messages={chats[activeChatId] || []}
          onSend={handleSend}
        />
      </div>
    </div>
  );
};

const styles = {
  layout: {
    display: "flex",
    height: "100vh",
    fontFamily: "Arial",
  },
  sidebar: {
    width: "250px",
    backgroundColor: "#202123",
    color: "#fff",
    padding: "21px",
    display: "flex",
    flexDirection: "column",
  },
  title: {
    margin:"10px"
  },
  newChatBtn: {
    backgroundColor: "#444",
    color: "#fff",
    padding: "10px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    marginBottom: "20px",
  },
  chatList: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    flex: 1,
    overflowY: "auto",
  },
  chatItem: {
    padding: "10px",
    borderRadius: "5px",
    cursor: "pointer",
    color: "#fff",
  },
  chatArea: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    backgroundColor: "#f4f4f4",
  },
  header: {
    height: "60px",
    backgroundColor: "#fff",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "0 20px",
    borderBottom: "1px solid #ddd",
  },
  images:{
    width:"40px",
    height:"40px",
  },
  logo:{
    display:"flex",
    marginBottom:"10px",
  }
};

export default ChatLayout;
