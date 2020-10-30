export function getToken() {
    return window.sessionStorage && sessionStorage.getItem("token");
}
export function setToken(token: any) {
    return window.sessionStorage && sessionStorage.setItem("token", token);
}
