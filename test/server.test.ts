import { Cookie } from '@remix-run/server-runtime';
import { setLangServerCookie, getLang, getContextLang } from '../src/server';
import { test, expect } from 'vitest';

test('setLangServerCookie', async () => {
  const responseHeaders = new Headers();
  const cookie = {
    serialize: async (value: string) => `lang=${value}; Path=/; HttpOnly`,
  } as Cookie;

  await setLangServerCookie('en', responseHeaders, cookie);

  expect(responseHeaders.get('Set-Cookie')).toBe('lang=en; Path=/; HttpOnly');
});

test('getLang', async () => {
  const request = new Request('/');
  request.headers.set('Cookie', 'lang=en');
  
  const cookie = {
    parse: async (cookieHeader: string | null) => (
      cookieHeader ? cookieHeader.split('=')[1] : null
    ),
  } as Cookie;

  const result = await getLang(request, cookie, 'default');

  expect(result).toBe('en');
});

test('getContextLang', () => {
  const context = {
    staticHandlerContext: {
      matches: [
        { params: { lang: 'en' } },
        { params: { lang: 'fr' } },
      ],
    },
  };
  const options = {
    availableLanguages: ['en', 'fr', 'de'],
    defaultValue: 'en',
    urlParam: 'lang',
  };

  const result = getContextLang(context as any, options);

  expect(result).toBe('en');
});
