import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const initialState = {
	cartItems: [],
	numItemsInCart: 0,
	cartTotal: 0,
	shipping: 500,
	tax: 0,
	orderTotal: 0,
};

const getCartFromLocalStorage = () => {
	return JSON.parse(localStorage.getItem("cart")) || initialState;
};

const cartSlice = createSlice({
	name: "cart",
	initialState: getCartFromLocalStorage(),
	reducers: {
		addItem: (state, action) => {
			console.log(action);
			const { product } = action.payload;
			const item = state.cartItems.find((item) => item.cartID === product.cartID);
			if (item) {
				item.amount += product.amount;
			} else {
				state.cartItems.push(product);
			}
			state.numItemsInCart += product.amount;
			state.cartTotal += product.price * product.amount;
			cartSlice.caseReducers.calculateTotals(state);
			toast.success("Item added to cart");
		},
		clearCart: (state) => {
			console.log("clear cart");
			localStorage.setItem("cart", JSON.stringify(initialState));
			return initialState;
		},
		removeItem: (state, action) => {
			console.log(action);
			const { cartID } = action.payload;
			// keep trace of the one you remove
			const product = state.cartItems.find((item) => item.cartID === cartID);
			// remove in the state :
			state.cartItems = state.cartItems.filter((item) => item.cartID !== cartID);
			// recalc other cart properties:
			state.numItemsInCart -= product.amount;
			state.cartTotal -= product.amount * product.price;
			cartSlice.caseReducers.calculateTotals(state);
			toast.success("Item removed from cart");
		},
		editItem: (state, action) => {
			console.log(action);
			const { cartID, amount } = action.payload;
			const product = state.cartItems.find((item) => item.cartID === cartID);
			state.numItemsInCart += amount - product.amount;
			state.cartTotal += product.price * (amount - product.amount);
			product.amount = amount;
			cartSlice.caseReducers.calculateTotals(state);
			toast.success("Cart updated");
		},
		calculateTotals: (state) => {
			state.tax = 0.1 * state.cartTotal;
			state.orderTotal = state.tax + state.cartTotal + state.shipping;
			localStorage.setItem("cart", JSON.stringify(state));
		},
	},
});

export const { addItem, clearCart, removeItem, editItem } = cartSlice.actions;

export default cartSlice.reducer;
