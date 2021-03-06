export class Account {
    
    id:number;
    username: string;
    password: string;

    constructor(username?:string, password?:string) {
        this.username = username;
        this.password = password;
    }

    getUsername() {
        return this.username;
    }

    getPassword() {
        return this.password;
    }

}