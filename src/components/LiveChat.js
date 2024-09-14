import React, { useState, useEffect } from 'react'
import ChatMessage from './ChatMessage'
import { addMessage } from "../utils/chatSlice";
import { useDispatch, useSelector } from 'react-redux';
import { generateRandomName, makeRandomMessage } from "../utils/helper";



const LiveChat = () => {

    const [liveMessage, setLiveMessage] = useState("");
    const dispatch = useDispatch();

    const chatMessages = useSelector((store) => store.chat.messages);

    useEffect(() => {
        const i = setInterval(() => {
          // API Polling
    
          dispatch(
            addMessage({
              name: generateRandomName(),
              message: makeRandomMessage(20) + " 🚀",
            })
          );
        }, 2000);
    
        return () => clearInterval(i);
      }, []);

  return (
    <>
      <div className="w-[115%] h-[355px] ml-2 p-2 border border-black bg-slate-100 rounded-lg overflow-y-scroll flex flex-col-reverse">
        <div>
          {
            // Disclaimer: Don't use indexes as keys
            chatMessages.map((c, i) => (
              <ChatMessage key={i} name={c.name} message={c.message} />
            ))
          }
        </div>
      </div>

      <form
        className="w-[115%] p-2 ml-2 mt-1 border border-black"
        onSubmit={(e) => {
          e.preventDefault();

          dispatch(
            addMessage({
              name: "Rahul Raj",
              message: liveMessage,
            })
          );
          setLiveMessage("");
        }}
      >
        <input
          className="w-[80%]"
          type="text"
          value={liveMessage}
          onChange={(e) => {
            setLiveMessage(e.target.value);
          }}
        />
        <button className="px-2 mx-2 rounded-sm bg-green-100">Send</button>
      </form>
    </>
  )
}

export default LiveChat
