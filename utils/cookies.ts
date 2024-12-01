export const setCookies = (
  name: string,
  value: string,
  expireDate: string
): void => {
  document.cookie = `${name}=${value};expires=${expireDate};`;
};

export const getCookies = (name: string): string => {
  const cookieName = name + "=";
  const decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === " ") {
      c = c.substring(1);
    }
    if (c.indexOf(cookieName) === 0) {
      return c.substring(cookieName.length, c.length);
    }
  }
  return "";
};
