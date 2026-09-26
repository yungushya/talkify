export type IMessageDirection = 'incoming' | 'outgoing';

export interface IChatMessage {
  id: string;
  text: string;
  direction: IMessageDirection;
}
