import React from 'react'
import ChatbotIcon from './ChatbotIcon'

const Chatmessage = ({chat}) =>{
    return (
        <div className={`message ${chat.role === "model" ? 'bot' : 'user'}-message`}>
            {chat.role === "model" && <ChatbotIcon/>}
            <p className='message-text'>{chat.text}</p>
        </div>
    )
}

export default Chatmessage