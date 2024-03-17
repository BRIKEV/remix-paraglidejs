import type { Cookie, EntryContext } from "@remix-run/server-runtime";

export const setLangServerCookie = async (lang: string, responseHeaders: Headers, cookie: Cookie) => {
  responseHeaders.set("Set-Cookie", await cookie.serialize(lang));
};

export const getLang = async <T extends string>(request: Request, cookie: Cookie, defaultValue: T) => {
  const cookieHeader = request.headers.get("Cookie");
  const value = (await cookie.parse(cookieHeader)) ?? defaultValue;
  return value as T;
};

interface Options<T> {
  availableLanguages: readonly T[];
  defaultValue: T;
  urlParam: string;
}

export const getContextLang = <T extends string>(context: EntryContext, options: Options<T>) => {
  let lang = options.defaultValue;
  const matches = context.staticHandlerContext.matches;
  const hasLangParamIndex = matches.findIndex(match => options.availableLanguages.includes(match.params[options.urlParam] as T));
  if (hasLangParamIndex > -1) {
    lang = matches[hasLangParamIndex].params[options.urlParam] as T ?? options.defaultValue;
  }
  return lang;
};
