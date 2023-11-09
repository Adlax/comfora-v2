import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { About, Cart, Checkout, Error, HomeLayout, Landing, Login, Orders, Products, Register, SingleProduct } from "./pages";
import { ErrorElement, Loading } from "./components";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
// loaders :
import { loader as landingLoader } from "./pages/Landing";
import { loader as singleProductLoader } from "./pages/SingleProduct";
import { loader as productsLoader } from "./pages/Products";
import { loader as checkoutLoader } from "./pages/Checkout";
import { loader as ordersLoader } from "./pages/Orders";
// actions:
import { action as registerAction } from "./pages/Register";
import { action as loginAction } from "./pages/Login";
import { action as checkoutFormAction } from "./components/CheckoutForm";
// import the store itself, wich is passed to actions :
import { store } from "./store";

//query client instance :
const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			staleTime: 1000 * 60 * 5,
		},
	},
});

const router = createBrowserRouter([
	{
		path: "/",
		element: <HomeLayout />,
		errorElement: <Error />,
		children: [
			{
				index: true,
				errorElement: <ErrorElement />,
				loader: landingLoader(queryClient),
				element: <Landing />,
			},
			{
				path: "products",
				loader: productsLoader(queryClient),
				errorElement: <ErrorElement />,
				element: <Products />,
			},
			{
				path: "products/:id",
				loader: singleProductLoader(queryClient),
				errorElement: <ErrorElement />,
				element: <SingleProduct />,
			},
			{
				path: "cart",
				element: <Cart />,
			},
			{
				path: "about",
				element: <About />,
			},
			{
				path: "checkout",
				loader: checkoutLoader(store),
				element: <Checkout />,
				action: checkoutFormAction(store, queryClient),
			},
			{
				path: "orders",
				loader: ordersLoader(store, queryClient),
				element: <Orders />,
			},
		],
	},
	{
		path: "/login",
		element: <Login />,
		errorElement: <Error />,
		action: loginAction(store),
	},
	{
		path: "/register",
		element: <Register />,
		errorElement: <Error />,
		action: registerAction,
	},
]);

const App = () => {
	return (
		<QueryClientProvider client={queryClient}>
			<ReactQueryDevtools />
			<RouterProvider router={router} />
		</QueryClientProvider>
	);
};

export default App;
