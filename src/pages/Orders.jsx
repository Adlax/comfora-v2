import React from "react";
import { ComplexPaginationContainer, OrdersList, PaginationContainer, SectionTitle } from "../components";
import { toast } from "react-toastify";
import { redirect, useLoaderData } from "react-router-dom";
import { customFetch } from "../utils";

const ordersQuery = (params, user) => {
	return {
		queryKey: ["orders", user.username, params.page ? parseInt(params.page) : 1],
		queryFn: () =>
			customFetch.get("/orders", {
				params,
				headers: {
					Authorization: `Bearer ${user.token}`,
				},
			}),
	};
};

export const loader =
	(store, queryClient) =>
	async ({ request }) => {
		// console.log(request);
		const user = store.getState().userState.user;
		if (!user) {
			toast.warn("You must be logged in to view orders");
			return redirect("/login");
		}
		const params = Object.fromEntries([...new URL(request.url).searchParams.entries()]);
		// console.log(params);
		try {
			const response = await queryClient.ensureQueryData(ordersQuery(params, user));
			return { orders: response.data.data, meta: response.data.meta };
		} catch (error) {
			const errorMessage = error?.response?.data?.error?.message || "Due to a bug, your order has not been placed";
			toast.error(errorMessage);
			if (error?.response?.status === 401 || error?.response?.status === 403) {
				return redirect("/login");
			}
			return null;
		}
	};

const Orders = () => {
	const { meta } = useLoaderData();
	if (meta.pagination.total < 1) {
		return <SectionTitle text="please make an order" />;
	}
	return (
		<>
			<SectionTitle text="Your Orders" />
			<OrdersList />
			<ComplexPaginationContainer />
		</>
	);
};

export default Orders;
