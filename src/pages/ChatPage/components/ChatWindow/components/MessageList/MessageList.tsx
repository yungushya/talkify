import { useEffect, useRef } from 'react';

import type { IChatMessage } from '@/types/message.types';

import s from './MessageList.module.css';

interface IMessageList {
  messages: IChatMessage[];
}

export const MessageList = ({ messages }: IMessageList) => {
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ block: 'end' });
  }, [messages.length]);

  return (
    <div className={s.list}>
      <div className={s.spacer} />

      {messages.map((message) => (
        <div
          key={message.id}
          className={
            message.direction === 'outgoing'
              ? `${s.bubble} ${s.outgoing}`
              : `${s.bubble} ${s.incoming}`
          }
        >
          {message.text}
        </div>
      ))}

      <div ref={endRef} />
    </div>
  );
};
