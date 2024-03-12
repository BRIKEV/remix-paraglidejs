export const hydrateLang = <T extends string>(key: string, availableLanguageTags: readonly T[]) => {
  // get cookie from the server
  const cookie = document.cookie;
  // extract the language cookie value
  const languageCookie = cookie.split(';').find(cookie => cookie.trim().startsWith(`${key}=`));
  const language = languageCookie ? languageCookie.split('=')[1] : '';
  const lang = atob(decodeURIComponent(language)).replace(/"/g, '') as T;
  if (availableLanguageTags.includes(lang)) {
    return lang;
  }
  return availableLanguageTags[0];
};
