import { makeAutoObservable } from "mobx";
import type { UserEntity } from "../entities/user";

class UserStore {
  user: UserEntity | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  // При логине принимаем уже готового пользователя (как будто от бэкенда)
  login = (user: UserEntity) => {
    this.user = user;
  };

  logout = () => {
    this.user = null;
  };
}

export const userStore = new UserStore();
