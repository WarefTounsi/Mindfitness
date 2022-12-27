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
    const object = JSON.parse(sessionStorage.getItem('auth'));
    return object['user'];
}