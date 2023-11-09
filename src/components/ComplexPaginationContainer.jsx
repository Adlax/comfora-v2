import React from "react";
import { useLoaderData, useLocation, useNavigate } from "react-router-dom";

const ComplexPaginationContainer = () => {
	const { meta } = useLoaderData();
	const { pageCount, page } = meta.pagination;

	const { pathname, search } = useLocation();

	const navigate = useNavigate();

	const addPageButton = ({ pageNumber, activeClass }) => {
		return (
			<button
				className={`btn btn-xs md:btn-md border-none join-item ${activeClass ? "bg-base-300 border-base-300" : ""}`}
				onClick={() => handlePageChange(pageNumber)}
				key={pageNumber}
			>
				{pageNumber}
			</button>
		);
	};

	const renderPageButtons = () => {
		const pageButtons = [];
		// first button :
		pageButtons.push(addPageButton({ pageNumber: 1, activeClass: page === 1 }));
		// dots :
		if (page > 2) {
			pageButtons.push(
				<button className={`btn btn-xs md:btn-md join-item `} key="dots-1">
					...
				</button>
			);
		}
		//active page :
		if (page !== 1 && page !== pageCount) {
			pageButtons.push(addPageButton({ pageNumber: page, activeClass: true }));
		}
		// dots :
		if (page < pageCount - 1) {
			pageButtons.push(
				<button className={`btn btn-xs md:btn-md join-item `} key="dots-2">
					...
				</button>
			);
		}
		// last button:
		pageButtons.push(addPageButton({ pageNumber: pageCount, activeClass: page === pageCount }));
		return pageButtons;
	};

	// const pages = Array.from({ length: pageCount }, (_, index) => {
	// 	return index + 1;
	// });

	const handlePageChange = (pageNumber) => {
		console.log(pathname, search);
		console.log(pageNumber);
		const searchParams = new URLSearchParams(search);
		searchParams.set("page", pageNumber);
		navigate(`${pathname}?${searchParams.toString()}`);
	};

	if (pageCount < 2) {
		return;
	}

	return (
		<div className="mt-16 flex justify-end ">
			<div className="join">
				<button
					className="btn btn-xs sm:btn-md join-item"
					onClick={() => {
						let prevPage = page - 1;
						if (prevPage < 1) prevPage = pageCount;
						handlePageChange(prevPage);
					}}
				>
					Prev
				</button>
				{renderPageButtons()}
				<button
					className="btn btn-xs sm:btn-md join-item"
					onClick={() => {
						let nextPage = page + 1;
						if (nextPage > pageCount) nextPage = 1;
						handlePageChange(nextPage);
					}}
				>
					Next
				</button>
			</div>
		</div>
	);
};

export default ComplexPaginationContainer;
