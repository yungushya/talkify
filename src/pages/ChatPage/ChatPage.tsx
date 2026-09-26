import { useState } from 'react';

import { checkAccount, sendMessage } from '@/api/chat';

import { useAuth } from '@/providers';

import { usePolling } from '@/hooks/usePolling';

import type { IChatMessage } from '@/types/message.types';

import { ChatWindow, Sidebar } from '@/pages/ChatPage/components';

import s from './ChatPage.module.css';

export const ChatPage = () => {
  const [chatId, setChatId] = useState<string | null>(null);
  const [chatName, setChatName] = useState<string | null>(null);
  const [messages, setMessages] = useState<IChatMessage[]>([]);

  const { credentials } = useAuth();

  const appendMessage = (message: IChatMessage) => {
    setMessages((prev) => [...prev, message]);
  };

  usePolling(credentials, chatId, appendMessage);

  const onCreateChat = async (phone: string) => {
    const data = await checkAccount(credentials!, phone);

    if (!data.exist) return false;

    setChatId(data.chatId);
    setChatName(phone);
    setMessages([]);

    return true;
  };

  const onSend = async (text: string) => {
    if (!chatId) return;

    try {
      const { idMessage } = await sendMessage(credentials!, chatId, text);

      appendMessage({
        id: idMessage,
        text,
        direction: 'outgoing'
      });
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  return (
    <div className={s.page}>
      <Sidebar onCreateChat={onCreateChat} />

      {chatId && (
        <ChatWindow
          chatName={chatName}
          messages={messages}
          onSend={onSend}
        />
      )}
    </div>
  );
};
