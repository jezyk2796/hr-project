const keyName = 'access-token';

export const tokenStorage = {
  get() {
    let response = localStorage.getItem(keyName);
    if (response) {
      return response;
    }
    response = sessionStorage.getItem(keyName);
    if (response) {
      return response;
    }
    return undefined;
  },
  set(data: string, rememberUser: boolean) {
    if (rememberUser) {
      sessionStorage.removeItem(keyName);
      return localStorage.setItem(keyName, data);
    }
    localStorage.removeItem(keyName);
    return sessionStorage.setItem(keyName, data);
  },
  clear() {
    sessionStorage.removeItem(keyName);
    localStorage.removeItem(keyName);
  },
};
