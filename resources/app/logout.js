function logout() {
    sessionStorage.removeItem('loginsuccess')
    location.replace('index.html')
}