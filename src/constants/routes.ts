export const ROUTES = {
  LOGIN: '/login',
  CHAT: '/chat'
} as const;

export type ROUTES = (typeof ROUTES)[keyof typeof ROUTES];
