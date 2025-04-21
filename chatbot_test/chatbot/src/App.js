import React from 'react'
import ChatbotIcon from './components/ChatbotIcon';
import Chatform from './components/Chatform';
import { useState, useEffect, useRef } from 'react';
import Chatmessage from './components/Chatmessage';

function App() {

  const [chatHistory, setChatHistory] = useState([])
  const [showChatbot, setShowChatbot] = useState(false)
  const chatBodyRef = useRef();

  const generateBotResponse = async (history) => {

    const updateHistory = (text) =>{
      setChatHistory(prev => [...prev.filter(msg => msg.text !== "Thinking..."), {role: "model", text}])
    } 

    history = history.map(({role, text}) => ({role, parts: [{text}]}));

    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({contents: history})
    }

    try{
      const response = await fetch("https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=", requestOptions);
      const data = await response.json();

      if(!response.ok) throw new Error(data.error.message || "OH NO, ERROR!");

      const apiResponseText = data.candidates[0].content.parts[0].text.replace(/\*\*(.*?)\*\*/g, "$1").trim();

      updateHistory(apiResponseText);
      console.log(data)
    }catch(err){
      console.log(err);
    }
  }

  useEffect(() =>{
    chatBodyRef.current.scrollTo({top: chatBodyRef.current.scrollHeight, behavior: "smooth" });
  }, [chatHistory])

  return (
    <div className= {`container ${showChatbot ? "show-chatbot": ""}`}>
      <button onClick = {() => setShowChatbot(prev => !prev)}id="chatbot-toggler">
        <span class="material-symbols-outlined">mode_comment</span>
        <span class='material-symbols-outlined'>close</span>
      </button>
      <div className='chatbot-popup'>
        <div className='chat-header'>
          <div className='header-info'>
              <ChatbotIcon/>
            <h2 className='logo-text'>Chatbot</h2>
            
          </div>
          <button onClick = {() => setShowChatbot((prev) => !prev)} className="material-symbols-outlined">arrow_downward</button>
        </div>

        <div ref={chatBodyRef} className='chat-body'>
          <div className='message bot-message'>
            <ChatbotIcon/>
            <p className='message-text'>
              Hey there <br/> How can I help you?
            </p>
          </div>

          {chatHistory.map((chat,index) =>(
            <Chatmessage key={index} chat={chat}/>
          ))} 
        </div>
        <div className='chat-footer'>
          <Chatform chatHistory = {chatHistory} setChatHistory={setChatHistory} generateBotResponse ={generateBotResponse}/>
        </div>
      </div>
    </div>
  );
}

export default App;
