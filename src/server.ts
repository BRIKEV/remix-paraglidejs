import type { Cookie, EntryContext } from "@remix-run/server-runtime";

export const setLangServerCookie = async (lang: string, responseHeaders: Headers, cookie: Cookie) => {
  responseHeaders.set("Set-Cookie", await cookie.serialize(lang));
};

export const getLang = async <T extends string>(request: Request, cookie: Cookie, defaultValue: T) => {
  const cookieHeader = request.headers.get("Cookie");
  const value = (await cookie.parse(cookieHeader)) ?? defaultValue;
  return value as T;
};

export const getContextLang = async <T extends string>(context: EntryContext, availableLanguageTags: readonly T[], defaultValue: T) => {
  let lang = defaultValue;
  const matches = context.staticHandlerContext.matches;
  const hasLangParamIndex = matches.findIndex(match => availableLanguageTags.includes(match.params["lang"] as T));
  if (hasLangParamIndex > -1) {
    lang = matches[hasLangParamIndex].params["lang"] as T ?? defaultValue;
  }
  return lang;
};
