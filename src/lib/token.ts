export function getToken() {
    return window.sessionStorage && sessionStorage.getItem("token");
}
export function setToken(token: any) {
    return window.sessionStorage && sessionStorage.setItem("token", token);
}

export function setuseToken(token: any) {
    return window.sessionStorage && sessionStorage.setItem("usertoken", token);
}
export function getuserToken() {
    return window.sessionStorage && sessionStorage.getItem("usertoken");
}

export function delToken() {
    return window.sessionStorage && sessionStorage.clear();
}