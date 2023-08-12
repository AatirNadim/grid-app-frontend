import { atom } from "recoil";

export const authState = atom({
  key: "Auth",
  default: {
    isLoggedIn: false,
    accessToken: "",
    refreshToken: "",
    // userData: {},
  },
});
