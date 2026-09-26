import { useState } from 'react';

import { Input } from '@/components';

import s from './ChatSearch.module.css';

interface IChatSearch {
  onCreateChat: (phone: string) => Promise<boolean>;
}

export const ChatSearch = ({ onCreateChat }: IChatSearch) => {
  const [phone, setPhone] = useState('');
  const [isChecking, setIsChecking] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async () => {
    if (!phone.trim() || isChecking) {
      return;
    }

    setIsChecking(true);
    setError(null);

    try {
      const found = await onCreateChat(phone.trim());

      if (!found) {
        setError('Аккаунт с таким номером не найден');

        return;
      }

      setPhone('');
    } catch {
      setError('Не удалось проверить номер. Попробуйте ещё раз');
    } finally {
      setIsChecking(false);
    }
  };

  return (
    <form
      className={s.form}
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit();
      }}
    >
      <div className={s.row}>
        <Input
          type='tel'
          placeholder='Введите номер телефона'
          className={s.input}
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />

        <button
          type='submit'
          className={s.button}
          disabled={isChecking}
        >
          {isChecking ? 'Проверка…' : 'Найти'}
        </button>
      </div>

      {error && <p className={s.error}>{error}</p>}
    </form>
  );
};
