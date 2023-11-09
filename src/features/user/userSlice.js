import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const themes = {
	winter: "winter",
	dracula: "dracula",
};

const getUserFromLocalStorage = () => {
	return JSON.parse(localStorage.getItem("user")) || null;
};

const getThemeFromLocalStorage = () => {
	const theme = localStorage.getItem("theme") || themes.winter;
	document.documentElement.setAttribute("data-theme", theme);
	return theme;
};

const initialState = {
	user: getUserFromLocalStorage(),
	theme: getThemeFromLocalStorage(),
};

const userSlice = createSlice({
	name: "user",
	initialState: initialState,
	reducers: {
		loginUser: (state, action) => {
			// console.log(action.payload);
			const user = { ...action.payload.user, token: action.payload.jwt };
			// console.log(user);
			state.user = user;
			localStorage.setItem("user", JSON.stringify(user));
		},
		logoutUser: (state) => {
			// console.log("logout");
			state.user = null;
			localStorage.removeItem("user");
			toast.success("Logged out successfully");
		},
		toggleTheme: (state) => {
			// console.log("toggle theme");
			const { dracula, winter } = themes;
			state.theme = state.theme === dracula ? winter : dracula;
			document.documentElement.setAttribute("data-theme", state.theme);
			localStorage.setItem("theme", state.theme);
		},
	},
});

export const { loginUser, logoutUser, toggleTheme } = userSlice.actions;

export default userSlice.reducer;
