import { atom, selector } from "recoil";
import { checkAdmin } from "../api/account";

export const jwtToken = atom({
  key: "jwtToken",
  default: JSON.parse(localStorage.getItem("token")),
});

export const loginStatus = atom({
  key: "LoginStatus",
  default: false,
});

export const tokenState = selector({
  key: "tokenState",
  get: ({ get }) => {
    return !!get(jwtToken);
  },
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
  },
});

export const isUserAuthenticated = selector({
  key: "isUserAuthenticated",
  get: async ({ get }) => {
    const token = get(jwtToken);
    if (token) {
      const res = await checkAdmin(token);
      if (res && res.data) {
        return {
          isTokenValid: true,
          isAdmin: res.data.admin,
          userData: null,
        };
      }
    }
    return {
      isTokenValid: false,
      isAdmin: false,
      userData: null,
    };
  },
});
