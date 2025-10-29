import 'http';

declare module 'http' {
  interface IncomingMessage {
    requestId?: string;
  }
}
