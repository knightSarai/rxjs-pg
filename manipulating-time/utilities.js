import MarkdownIt from 'markdown-it';
import { createElement } from '../utilities/dom-manpulation';

const markdown = new MarkdownIt();

export const button = document.getElementById('create-notification');
export const panicButton = document.getElementById('panic-button');
export const notificationMessages = document.getElementById(
  'notification-messages',
);
export const deepThoughtInput = document.getElementById('deep-thought');
export const deepThoughtRendered = document.getElementById(
  'deep-thought-rendered',
);
export const deepThroughtStatus = document.getElementById(
  'deep-thought-status',
);

export const addMessageToDOM = () => {
  const notification = createElement('Something happened');
  notificationMessages.appendChild(notification);
};

export const renderMarkdown = (content) => {
  deepThoughtRendered.innerHTML = markdown.render(content);
};

export const setStatus = (content) => {
  deepThroughtStatus.innerHTML = content;
};
