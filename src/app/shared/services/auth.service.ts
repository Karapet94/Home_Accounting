export class AuthService{

    private isAuthLoggedIn = false;
    login(){
        this.isAuthLoggedIn = true
    }
    logout(){
        this.isAuthLoggedIn = false;
        window.localStorage.clear()
    }
    isLoggedIn(): boolean{
        return this.isAuthLoggedIn
    }
}