let setLocalUser = (userName) => {
    localStorage.setItem('user', userName);
}

let getLocalUser = () => {
    return localStorage.getItem('user');
}
