import React, { useEffect, useRef } from 'react';
import { Send } from 'lucide-react';
import { CardContent, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const ChatInterface = ({ messages, input, onInputChange, onSend, onKeyPress }) => {
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]); // Scroll whenever messages change

  return (
    <>
      <CardContent className="space-y-4">
        <div className="h-96 overflow-y-auto space-y-4 mb-4" id="chat-container">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`p-3 rounded-lg ${
                message.role === 'bot' 
                  ? 'bg-gray-100 mr-12'
                  : 'bg-blue-100 ml-12'
              }`}
            >
              {message.content}
            </div>
          ))}
          <div ref={messagesEndRef} /> {/* Invisible element to scroll to */}
        </div>
      </CardContent>
      <CardFooter className="space-x-2">
        <div className="flex-1">
          <Input
            placeholder="Type your message..."
            value={input}
            onChange={onInputChange}
            onKeyPress={onKeyPress}
          />
        </div>
        <Button onClick={onSend}>
          <Send className="h-4 w-4" />
        </Button>
      </CardFooter>
    </>
  );
};

export default ChatInterface;