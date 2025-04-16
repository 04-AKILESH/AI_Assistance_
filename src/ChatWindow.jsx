import React, { useState, useEffect, useRef } from "react";
import prompts from './Prompts'

const ChatWindow = ({ messages, onSend }) => {
  const [input, setInput] = useState("");
  const [selectedLang, setSelectedLang] = useState("English");
  const messagesEndRef = useRef(null);

  const send = () => {
    if (!input.trim()) return;
  
    const userMessage = input;
    const fullMessage = `${prompts[selectedLang]} ${userMessage}`;
  
    // Send only full message (with prompt) to onSend
    onSend(fullMessage, userMessage);  // <— pass both
  
    setInput("");
  };

  const handleKey = (e) => {
    if (e.key === "Enter") send();
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <>
      <div style={styles.messages}>
        {messages.map((msg, idx) => (
          <div
            key={idx}
            style={{
              ...styles.msg,
              alignSelf: msg.sender === "user" ? "flex-end" : "flex-start",
              backgroundColor: msg.sender === "user" ? "#0084ff" : "#e5e5ea",
              color: msg.sender === "user" ? "#fff" : "#000",
            }}
          >
            {msg.text}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Language Selector */}
      <div style={styles.selectWrapper}>
        <label style={styles.selectLabel}>Select Language:</label>
        <select
          value={selectedLang}
          onChange={(e) => setSelectedLang(e.target.value)}
          style={styles.select}
        >
          <option value="English">English</option>
          <option value="Tamil">Tamil</option>
          <option value="Tanglish">Tamil in English(Tanglish)</option>
          <option value="Mixed">Tamil & English</option>
        </select>
      </div>

      {/* Input + Send */}
      <div style={styles.inputBox}>
        <input
          style={styles.input}
          placeholder="Type a message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKey}
        />
        <button onClick={send} style={styles.send}>Send</button>
      </div>
    </>
  );
};

const styles = {
  messages: {
    flex: 1,
    padding: "20px",
    overflowY: "auto",
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },
  msg: {
    maxWidth: "70%",
    padding: "12px 16px",
    borderRadius: "20px",
    fontSize: "14px",
  },
  inputBox: {
    display: "flex",
    padding: "10px 20px",
    borderTop: "1px solid #ddd",
    backgroundColor: "#fff",
  },
  input: {
    flex: 1,
    padding: "10px 15px",
    borderRadius: "20px",
    border: "1px solid #ccc",
    fontSize: "14px",
    outline: "none",
  },
  send: {
    marginLeft: "10px",
    padding: "10px 20px",
    borderRadius: "20px",
    border: "none",
    backgroundColor: "#0084ff",
    color: "#fff",
    cursor: "pointer",
    fontWeight: "bold",
  },
  selectWrapper: {
    display: "flex",
    alignItems: "center",
    padding: "10px 20px 10px",
    backgroundColor: "#fff",
    gap: "10px",
  },
  selectLabel: {
    fontSize: "14px",
    fontWeight: "bold",
  },
  select: {
    padding: "6px 10px",
    borderRadius: "8px",
    border: "1px solid #ccc",
  },
};

export default ChatWindow;
