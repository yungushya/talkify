import { useAuth } from '@/providers';

import { ChatSearch } from '@/pages/ChatPage/components/Sidebar/components';

import s from './Sidebar.module.css';

interface ISidebar {
  onCreateChat: (phone: string) => Promise<boolean>;
}

export const Sidebar = ({ onCreateChat }: ISidebar) => {
  const { logout } = useAuth();

  return (
    <div className={s.sidebar}>
      <div className={s.sidebarHeader}>Talkify</div>

      <ChatSearch onCreateChat={onCreateChat} />

      <button
        type='button'
        className={s.logoutButton}
        onClick={logout}
      >
        Выйти
      </button>
    </div>
  );
};
