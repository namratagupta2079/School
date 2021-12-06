import * as faker from "faker/locale/en_US";
import { User, Credentials } from "@core/models/user";

export const generateUser = (): User => {
  return {
    name: faker.name.firstName(),
    token: faker.random.alphaNumeric(),
  };
};

export const generateValidCredential = (): Credentials => {
  return {
    username: "admin",
    password: "admin",
  };
};

export const generateInvalidCredential = (): Credentials => {
  return {
    username: "InvalidUser",
    password: "InvalidPassword",
  };
};
