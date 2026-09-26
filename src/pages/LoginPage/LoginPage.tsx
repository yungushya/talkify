import { useState } from 'react';

import { useNavigate } from 'react-router-dom';

import { checkCredentials, enableIncomingWebhook } from '@/api/chat';

import { useAuth } from '@/providers';

import { ROUTES } from '@/constants/routes';

import { Input, Label } from '@/components/ui';

import s from './LoginPage.module.css';

export const LoginPage = () => {
  const [idInstance, setIdInstance] = useState('');
  const [apiTokenInstance, setApiTokenInstance] = useState('');
  const [apiUrl, setApiUrl] = useState('');
  const [isChecking, setIsChecking] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { login } = useAuth();

  const navigate = useNavigate();

  const onSubmit = async () => {
    if (!idInstance.trim() || !apiTokenInstance.trim() || isChecking) return;

    const credentials = {
      idInstance: idInstance.trim(),
      apiTokenInstance: apiTokenInstance.trim(),
      ...(apiUrl.trim() && { apiUrl: apiUrl.trim() })
    };

    setIsChecking(true);
    setError(null);

    try {
      const isValid = await checkCredentials(credentials);

      if (!isValid) {
        setError('Неверные idInstance или apiTokenInstance');

        return;
      }

      try {
        await enableIncomingWebhook(credentials);
      } catch (error) {
        console.error('Не удалось включить incomingWebhook:', error);
      }

      login(credentials);
      navigate(ROUTES.CHAT);
    } finally {
      setIsChecking(false);
    }
  };

  return (
    <div className={s.page}>
      <form
        className={s.form}
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit();
        }}
      >
        <div className={s.logo}>M</div>

        <h1 className={s.title}>Вход в аккаунт</h1>

        <Label title='idInstance'>
          <Input
            type='text'
            inputMode='numeric'
            value={idInstance}
            onChange={(e) => setIdInstance(e.target.value)}
          />
        </Label>

        <Label title='apiTokenInstance'>
          <Input
            type='password'
            value={apiTokenInstance}
            onChange={(e) => setApiTokenInstance(e.target.value)}
          />
        </Label>

        <Label title='apiUrl (необязательно)'>
          <Input
            type='text'
            placeholder='По умолчанию вычисляется автоматически'
            value={apiUrl}
            onChange={(e) => setApiUrl(e.target.value)}
          />
        </Label>

        {error && <p className={s.error}>{error}</p>}

        <button
          type='submit'
          className={s.button}
          disabled={isChecking}
        >
          {isChecking ? 'Проверка…' : 'Войти'}
        </button>
      </form>
    </div>
  );
};
