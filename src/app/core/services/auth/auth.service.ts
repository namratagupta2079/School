import { Injectable } from "@angular/core";

// TODO:
// it will be replaced by a real service once security implementation approach is decided


@Injectable({
  providedIn: "root"
})
export class AuthService {
  constructor() {}

  public isAuthenticated(): boolean {
    const userData = sessionStorage.getItem("userData");
    if (userData && userData.length > 0) {
      return true;
    } else {
      return false;
    }
  }

  public async login(postData) {
    const loginApiResponce = {
      name: "Srinivas Tamada",
      uid: 1,
      token: "2323523523DFSWERWERWER"
    };
    sessionStorage.setItem("userData", JSON.stringify(loginApiResponce));
    return true;
  }

  public async logout() {
    sessionStorage.removeItem("userData");
    sessionStorage.clear();
    return true;
  }
}
