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

  get hasMessage(): boolean {
    return !!this.messages.length;
  }

  get message(): Message | undefined {
    const message = this.messages[this.messages.length - 1];

    return message || undefined;
  }

  addMessage = (message: string, type: MessageType) => {
    this.messages.push({ text: message, type });
  };

  removeMessage = () => {
    this.messages = this.messages.slice(0, -1);
  };
}

export const messageStore = new MessageStore();
export default createContext(messageStore);
