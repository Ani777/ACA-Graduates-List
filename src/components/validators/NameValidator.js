export const isValidName = name => {
    if (name.trim()) {
        return true;
    } else {
        alert('invalid name');
    }
}
