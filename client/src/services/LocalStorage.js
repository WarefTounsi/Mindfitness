export function removeItem(itemToRemove) {
    window.localStorage.removeItem(itemToRemove);
}

export function getItem(item) {
    window.localStorage.getItem(item)
}

export function setItem(localStorageName, item) {
    window.localStorage.setItem(localStorageName, JSON.stringify(item));
}