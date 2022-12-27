function getAuth() {
    return JSON.parse(sessionStorage.getItem('auth'));
}
export function removeItem(itemToRemove) {
    window.localStorage.removeItem(itemToRemove);
}

export function getItem(item) {
    window.localStorage.getItem(item)
}

export function setItem(localStorageName, item) {
    window.localStorage.setItem(localStorageName, JSON.stringify(item));
}

export const getUserEmail = () => {
    const auth = getAuth();
    return auth['user'];
}

export const getToken = () => {
    const auth = getAuth();
    return auth['accessToken'];
}