import axios from "axios";

const baseURL = "https://strapi-store-server.onrender.com/api";

export const customFetch = axios.create({
	baseURL: baseURL,
});

export const formatPrice = (price) => {
	const formattedPrice = new Intl.NumberFormat("en-US", {
		style: "currency",
		currency: "USD",
	}).format((price / 100).toFixed(2));
	return formattedPrice;
};

export const generateAmountOptions = (number) => {
	return Array.from({ length: number }, (_, index) => {
		const amount = index + 1;
		return (
			<option key={amount} value={amount}>
				{amount}
			</option>
		);
	});
};
