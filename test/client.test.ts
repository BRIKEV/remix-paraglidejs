import { hydrateLang } from '../src/client';
import { test, expect } from 'vitest';

test('hydrateLang - language from cookie is available', () => {
  // Mock document.cookie
  Object.defineProperty(document, 'cookie', {
    writable: true,
    value: 'lang=ZGVm', // 'ZGVm' is 'def' encoded in base64
  });

  const availableLanguageTags = ['abc', 'def', 'ghi'];

  // Test when the language from the cookie is available in the availableLanguageTags array
  let result = hydrateLang('lang', availableLanguageTags);
  expect(result).toBe('def');
});

test('hydrateLang - language from cookie is not available', () => {
  // Mock document.cookie
  Object.defineProperty(document, 'cookie', {
    writable: true,
    value: 'lang=Z2hp', // 'Z2hp' is 'ghi' encoded in base64
  });

  // Test when the language from the cookie is not available in the availableLanguageTags array
  let result = hydrateLang('lang', ['abc', 'def']);
  expect(result).toBe('abc');
});
