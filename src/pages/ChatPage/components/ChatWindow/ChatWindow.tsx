import type { IChatMessage } from '@/types/message.types';

import {
  MessageInput,
  MessageList
} from '@/pages/ChatPage/components/ChatWindow/components';

import s from './ChatWindow.module.css';

interface IChatWindow {
  chatName: string | null;
  messages: IChatMessage[];
  onSend: (text: string) => Promise<void>;
}

export const ChatWindow = ({ chatName, messages, onSend }: IChatWindow) => {
  return (
    <div className={s.chat}>
      <div className={s.chatHeader}>
        <span className={s.chatName}>{chatName}</span>
      </div>

      <MessageList messages={messages} />

      <MessageInput onSend={onSend} />
    </div>
  );
};
