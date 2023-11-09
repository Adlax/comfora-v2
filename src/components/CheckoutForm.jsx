import { Form, redirect } from "react-router-dom";
import FormInput from "../components/FormInput";
import SubmitBtn from "../components/SubmitBtn";
import { customFetch, formatPrice } from "../utils";
import { clearCart } from "../features/cart/cartSlice";
import { toast } from "react-toastify";

export const action =
	(store, queryClient) =>
	async ({ request }) => {
		const formData = await request.formData();
		const { name, address } = Object.fromEntries(formData);
		const user = store.getState().userState.user;
		const { cartItems, orderTotal, numItemsInCart } = store.getState().cartState;
		const info = {
			name,
			address,
			cartItems,
			chargeTotal: orderTotal,
			numItemsInCart,
			orderTotal: formatPrice(orderTotal),
		};
		try {
			const response = await customFetch.post("/orders", { data: info }, { headers: { Authorization: `Bearer ${user.token}` } });
			queryClient.removeQueries(["orders"]);
			store.dispatch(clearCart());
			toast.success("Your order is placed");
			return redirect("/orders");
		} catch (error) {
			const errorMessage = error?.response?.data?.error?.message || "Due to a bug, your order has not been placed";
			toast.error(errorMessage);
			if (error?.response?.status === 401 || error?.response?.status === 403) {
				return redirect("/login");
			}
			return null;
		}
	};

const CheckoutForm = () => {
	return (
		<Form method="POST" className="flex flex-col gap-y-4">
			<h4 className="font-medium text-xl capitalize">shipping information</h4>
			<FormInput label="first name" name="name" type="text" />
			<FormInput label="address" name="address" type="text" />
			<div className="mt-4">
				<SubmitBtn text="place your order" />
			</div>
		</Form>
	);
};

export default CheckoutForm;
