import { useEffect, useRef } from 'react';

import { deleteNotification, receiveNotification } from '@/api/chat';

import type { ICredentials } from '@/types/credentials.types';
import type { IChatMessage } from '@/types/message.types';

const POLLING_INTERVAL_MS = 3000;

export const usePolling = (
  credentials: ICredentials | null,
  chatId: string | null,
  onMessage: (message: IChatMessage) => void
) => {
  const onMessageRef = useRef(onMessage);

  useEffect(() => {
    onMessageRef.current = onMessage;
  }, [onMessage]);

  useEffect(() => {
    if (!credentials) return;

    let isPolling = false;

    async function poll() {
      if (isPolling) return;

      isPolling = true;

      try {
        const notification = await receiveNotification(credentials!);

        if (!notification) return;

        const {
          receiptId,
          body: { typeWebhook, idMessage, messageData, senderData }
        } = notification;

        const isIncoming = typeWebhook === 'incomingMessageReceived';
        const isText = messageData.typeMessage === 'textMessage';
        const isActiveChat = senderData.chatId === chatId;

        const isMessage = isIncoming && isText && isActiveChat;

        if (isMessage) {
          onMessageRef.current({
            id: idMessage,
            text: messageData.textMessageData?.textMessage ?? '',
            direction: 'incoming'
          });
        }

        await deleteNotification(credentials!, receiptId);
      } catch (error) {
        console.error('Error checking for new messages:', error);
      } finally {
        isPolling = false;
      }
    }

    const intervalId = setInterval(poll, POLLING_INTERVAL_MS);

    return () => {
      clearInterval(intervalId);
    };
  }, [credentials, chatId]);
};
