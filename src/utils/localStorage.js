export function setRatedRecipe(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
}

export function getRatedRecipe(key) {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : null;
}

export function hasRated(key) {
    return localStorage.getItem(key) !== null;
}
