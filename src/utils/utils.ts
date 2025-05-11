import type { DomElementAttribute, DomElementProperties } from '../types/types';

export function createElementWithProperties<K extends keyof HTMLElementTagNameMap>(
  tagName: K,
  elementClassName: string,
  attribute?: DomElementAttribute,
  props?: DomElementProperties[]
): HTMLElementTagNameMap[K] {
  const element = document.createElement(tagName);
  element.className = elementClassName;

  if (attribute) {
    for (let i = 0; i < Object.keys(attribute).length; i += 1) {
      const key = Object.keys(attribute)[i];
      element.setAttribute(key, attribute[key]);
    }
  }

  if (props) {
    Object.assign(element, ...props);
  }

  return element;
}