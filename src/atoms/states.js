import { atom } from "recoil";

/*
	DEV NOTE:
	If you're not familiar to recoil, this file
	will contain all the initial global states.
	components will import them from this file.
*/

export const menuState = atom({
  key: "menuState", // unique ID (with respect to other atoms/selectors)
  default: false, // default value (aka initial value)
});

export const cookiesState = atom({
  key: "cookiesState",
  default: false,
});

export const windowState = atom({
  key: "windowState",
  default: {
    width: 0,
    height: 0,
    scroll: 0,
  },
});
