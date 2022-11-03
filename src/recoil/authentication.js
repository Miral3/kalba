import { atom, selector } from "recoil";

export const jwtToken = atom({
  key: "jwtToken",
  default: localStorage.getItem("token"),
});

export const loginStatus = atom({
  key: "LoginStatus",
  default: false,
});

export const adminState = atom({
  key: "adminState",
  default: false,
});

export const loginProcess = selector({
  key: "loginProcess",
  get: ({ get }) => {
    return get(jwtToken);
  },
  set: ({ set }, newValue) => {
    set(jwtToken, newValue);
    set(loginStatus, true);
    localStorage.setItem("token", newValue);
  },
});

export const logoutProcess = selector({
  key: "logoutProcess",
  get: ({ get }) => {
    return !get(loginStatus);
  },
  set: ({ set }) => {
    set(jwtToken, "");
    set(loginStatus, false);
    set(adminState, false);
    localStorage.removeItem("token");
  },
});
