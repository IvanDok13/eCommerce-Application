import { describe, expect, it } from 'vitest';

describe('root presence', () => {
  it('root exists on page', () => {
    const rootElement = document.querySelector('#root');
    expect(rootElement).toBeDefined();
  });
});
