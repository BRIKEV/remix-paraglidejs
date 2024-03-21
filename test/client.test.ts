import { test, expect, vitest, vi } from 'vitest';
import { useParams } from "@remix-run/react";
import { hydrateLang, useParamsLang } from '../src/client';

vi.mock("@remix-run/react");

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

test('useParamsLang - language from params is available', () => {
  // Mock useParams
  vi.mocked(useParams).mockReturnValue({ lang: 'en' });

  const availableLanguageTags = ['en', 'fr', 'de'];

  // Test when the language from the params is available in the availableLanguageTags array
  const result = useParamsLang('lang', availableLanguageTags, 'default');
  expect(result).toBe('en');
});

test('useParamsLang - language from params is not available', () => {
  // Mock useParams
  vi.mocked(useParams).mockReturnValue({});

  const availableLanguageTags = ['en', 'fr', 'de'];

  // Test when the language from the params is not available in the availableLanguageTags array
  const result = useParamsLang('lang', availableLanguageTags, 'default');
  expect(result).toBe('default');
});
