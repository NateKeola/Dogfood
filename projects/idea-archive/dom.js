import { safeExternalUrl } from './archive.js';

// Imported prose is always text, never HTML or an instruction channel.
export function node(tag, text, className) {
  const element = document.createElement(tag);
  if (text !== undefined) element.textContent = text;
  if (className) element.className = className;
  return element;
}

export function externalLink(text, url, className) {
  const link = node('a', text, className);
  const safeUrl = safeExternalUrl(url);
  if (safeUrl) link.href = safeUrl;
  link.target = '_blank';
  link.rel = 'noopener noreferrer';
  return link;
}
