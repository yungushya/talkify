import { useState } from 'react';

import { Input } from '@/components';

import styles from './MessageInput.module.css';

interface IMessageInput {
  onSend: (text: string) => Promise<void>;
}

export const MessageInput = ({ onSend }: IMessageInput) => {
  const [text, setText] = useState('');
  const [isSending, setIsSending] = useState(false);

  const onSubmit = async () => {
    const trimmed = text.trim();

    if (!trimmed || isSending) return;

    setIsSending(true);

    try {
      await onSend(trimmed);

      setText('');
    } finally {
      setIsSending(false);
    }
  };

  return (
    <form
      className={styles.form}
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit();
      }}
    >
      <Input
        type='text'
        placeholder='Сообщение'
        className={styles.input}
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <button
        type='submit'
        className={styles.button}
        disabled={isSending}
      >
        Отправить
      </button>
    </form>
  );
};
