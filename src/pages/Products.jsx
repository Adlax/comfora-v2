import React from "react";
import { Filters, PaginationContainer, ProductsContainer } from "../components";
import { customFetch } from "../utils";

const url = "/products";

const allProductsQuery = (params) => {
	const { search, company, category, order, price, shipping, page } = params;
	return {
		queryKey: ["products", search ?? "", company ?? "all", category ?? "all", order ?? "a-z", price ?? 100000, shipping ?? false, page ?? 1],
		queryFn: () => customFetch(url, { params: params }),
	};
};

export const loader =
	(queryClient) =>
	async ({ request }) => {
		const params = Object.fromEntries([...new URL(request.url).searchParams.entries()]);
		console.log(params);
		const response = await queryClient.ensureQueryData(allProductsQuery(params));
		// console.log(response);
		const { data: products, meta } = response.data;
		// console.log({ products, meta });
		return { products, meta, params };
	};

const Products = () => {
	return (
		<>
			<Filters />
			<ProductsContainer />
			<PaginationContainer />
		</>
	);
};

export default Products;
