import { atom } from "recoil";

export const productState = atom({
  key: "Product",
  default: {
    id : -1,
    link : "",
    image : "",
    name : "",
    price : -1,
    // userData: {},
  },
});
