import React, { useRef } from 'react'

const Chatform = ({chatHistory, setChatHistory, generateBotResponse}) =>{

    const inputRef = useRef();

    const handleFormSubmit = (e) =>{
        e.preventDefault();
        const userMessage = inputRef.current.value.trim();
        if (!userMessage) return;
        inputRef.current.value = "";

        //update chat history with user's message
        setChatHistory(history => [...history, {role: "user", text: userMessage}])

        //update chat history with user's message
        setTimeout(() => {
            
            setChatHistory(history => [...history, {role: "model", text: "Thinking..."}])
            
            generateBotResponse([...chatHistory, {role: "user", text: userMessage}]);
            
        }, 600)

    
    }
    return (
        <form action='#' className='chat-form' onSubmit={handleFormSubmit}>
            <input ref ={inputRef} type='text' placeholder='Message...' className='message-input'/>
            <button className="material-symbols-outlined">arrow_upward</button>
          </form>
    )
}

export default Chatform