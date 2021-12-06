import { Injectable } from "@angular/core";
import { User, Credentials } from "@core/models/user";
import { of, Observable, throwError } from "rxjs";

export const MOCK_USER_1 = {
  name: "testUser1",
  token: "123",
  authorizations: [],
};
export const MOCK_USER_2 = {
  name: "testUser2",
  token: "456",
  authorizations: [],
};
export const MOCK_USER_3 = {
  name: "testUser3",
  token: "789",
  authorizations: [],
};

export const MOCK_USER_4 = {
  name: "admin",
  token: "0011",
  authorizations: [],
};

@Injectable({
  providedIn: "root",
})
export class UserService {
  login({ username, password }: Credentials): Observable<User> {
    if (username === "testUser1" && password === '123456') {
      return of(MOCK_USER_1);
    }
    if (username === "testUser2" && password === '123456') {
      return of(MOCK_USER_2);
    }
    if (username === "testUser3" && password === '123456') {
      return of(MOCK_USER_3);
    }
    if (username === "admin" && password === 'admin') {
      return of(MOCK_USER_4);
    }
    return throwError("Invalid username or password");
  }

  logout(): Observable<boolean> {
    return of(true);
  }
}
