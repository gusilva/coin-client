import { createContext } from 'react';
import { makeAutoObservable } from 'mobx';

export enum MessageType {
  ERROR,
  SUCCESS,
  WARN,
}

type Message = {
  type: MessageType;
  text: string;
};

class MessageStore {
  messages: Message[] = [];

  constructor() {
    makeAutoObservable(this);
  }
}

export const messageStore = new MessageStore();
export default createContext(messageStore);
