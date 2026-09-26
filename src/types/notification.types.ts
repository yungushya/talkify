export interface IReceiveNotificationResponse {
  receiptId: number;
  body: IIncomingNotificationBody;
}

export interface IIncomingNotificationBody {
  typeWebhook: string;
  idMessage: string;
  senderData: ISenderData;
  messageData: IMessageData;
}

export interface ISenderData {
  chatId: string;
}

export interface IMessageData {
  typeMessage: string;
  textMessageData?: ITextMessageData;
}

export interface ITextMessageData {
  textMessage: string;
}
