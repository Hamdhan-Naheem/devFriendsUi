import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { createSocketConnection } from '../utils/socket';

const Chat = () => {
  const { targetId } = useParams();
  const [messages, setMessages] = useState([]);
  const [newMessages, setNewMessages] = useState('');
  const user = useSelector((store) => store.user);
  const userId = user?._id;
  const socket = useRef(null);

  useEffect(() => {
    if (!userId) {
      return;
    }
    socket.current = createSocketConnection();

    socket.current.emit('joinChat', {
      firstName: user.firstName,
      userId,
      targetId,
    });

    socket.current.on('receivedMessage', ({ firstName, text }) => {
      setMessages((messages) => [...messages, { firstName, text }]);
    });

    return () => {
      socket.current.disconnect();
    };
  }, [userId, targetId]);

  const sendMessage = () => {
    socket.current = createSocketConnection();

    socket.current.emit('sendMessage', {
      firstName: user.firstName,
      userId,
      targetId,
      text: newMessages,
    });
    setNewMessages('');
  };

  return (
    <div className="flex w-1/2 mx-auto border border-gray-400 flex-col m-5 h-[70vh]">
      <div className="border-b border-gray-400 p-2">Chat</div>
      <div className="flex-1 overflow-y-scroll p-2">
        {messages.map((msg, index) => (
          <div key={index} className="chat chat-start">
            <div className="chat-header">
              {msg.firstName}
              <time className="text-xs opacity-50">2 hours ago</time>
            </div>
            <div className="chat-bubble">{msg.text}</div>
            <div className="chat-footer opacity-50">Seen</div>
          </div>
        ))}
      </div>
      <div className="border-t border-gray-400 p-2 flex items-center gap-2">
        <input
          value={newMessages}
          onChange={(e) => setNewMessages(e.target.value)}
          type="text"
          className="flex-1 border border-gray-600 p-2"
        />
        <button onClick={sendMessage} className="bg-blue-900 p-2 rounded-md">
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;
