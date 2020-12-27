export function getToken() {
    return window.localStorage.getItem("token");
    // return localStorage.getItem("token");
}
export function setToken(token: any) {
    return window.localStorage.setItem("token", token);
}
export function getidToken(){
    return window.localStorage.getItem("idToken");
}
export function setidToken(token: any) {
    return window.localStorage.setItem("idToken", token);
}
export function setuseToken(token: any) {
    return window.window.localStorage && window.localStorage.setItem("usertoken", token);
}
export function getuserToken() {
    return window.window.localStorage && window.localStorage.getItem("usertoken");
}

export function delToken() {
    return window.window.localStorage && window.localStorage.clear();
}