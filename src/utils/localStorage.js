export const setStorage = (key, value) => {

    const json = JSON.stringify(value);
    const encrypted = btoa(json);
    localStorage.setItem(key, encrypted);

}

export const getStorage = (key) => {

    const storedValue = localStorage.getItem(key);
    if (!storedValue) return false;

    const decrypted = atob(storedValue);
    return JSON.parse(decrypted);
}