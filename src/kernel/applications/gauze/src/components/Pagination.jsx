import React from "react";
import { useState } from "react";

function paginationItems({
	showFirstButton = false,
	showLastButton = false,
	hidePrevButton = false,
	hideNextButton = false,
	boundaryCount = 1,
	siblingCount = 1,
	page,
	count = 1,
	reverse = false,
}) {
	const range = (start, end) => {
		const length = end - start + 1;
		return Array.from(
			{
				length,
			},
			(_, i) => start + i,
		);
	};
	const startPages = range(1, Math.min(boundaryCount, count));
	const endPages = range(Math.max(count - boundaryCount + 1, boundaryCount + 1), count);
	const siblingsStart = Math.max(
		Math.min(
			// Natural start
			page - siblingCount,
			// Lower boundary when page is high
			count - boundaryCount - siblingCount * 2 - 1,
		),
		// Greater than startPages
		boundaryCount + 2,
	);
	const siblingsEnd = Math.min(
		Math.max(
			// Natural end
			page + siblingCount,
			// Upper boundary when page is low
			boundaryCount + siblingCount * 2 + 2,
		),
		// Less than endPages
		endPages.length > 0 ? endPages[0] - 2 : count - 1,
	);

	// Basic list of items to render
	// for example itemList = ['first', 'previous', 1, 'ellipsis', 4, 5, 6, 'ellipsis', 10, 'next', 'last']
	const itemList = [
		...(showFirstButton ? ["first"] : []),
		...(hidePrevButton ? [] : ["previous"]),
		...startPages,
		// Start ellipsis
		// eslint-disable-next-line no-nested-ternary
		...(siblingsStart > boundaryCount + 2 ? ["start-ellipsis"] : boundaryCount + 1 < count - boundaryCount ? [boundaryCount + 1] : []),
		// Sibling pages
		...range(siblingsStart, siblingsEnd),
		// End ellipsis
		// eslint-disable-next-line no-nested-ternary
		...(siblingsEnd < count - boundaryCount - 1 ? ["end-ellipsis"] : count - boundaryCount > boundaryCount ? [count - boundaryCount] : []),
		...endPages,
		...(hideNextButton ? [] : ["next"]),
		...(showLastButton ? ["last"] : []),
	];
	//return itemList

	// Map the button type to its page number
	const buttonPage = (type) => {
		switch (type) {
			case "first":
				return 1;
			case "previous":
				return page - 1;
			case "next":
				return page + 1;
			case "last":
				return count;
			default:
				return null;
		}
	};

	// Convert the basic item list to PaginationItem props objects
	const items = itemList.map((item) => {
		return typeof item === "number"
			? {
					type: "page",
					page: item,
					selected: item === page,
				}
			: {
					type: item,
					page: buttonPage(item),
					selected: false,
				};
	});
	if (reverse) {
		items.reverse();
	}
	return items;
}

export default function Pagination({ page, count, href, handleClick, reverse, buttonClass }) {
	// generate an array of items to render
	// pass the items to the renderOption function
	const items = paginationItems({
		page: page,
		count: count,
		reverse: reverse,
	});
	return (
		<nav>
			<div className="flex pa1">
				{items.map((item, index) => {
					const { page, type, selected, ...rest } = item;
					let children = null;

					if (type === "start-ellipsis" || type === "end-ellipsis") {
						children = "…";
					} else if (type === "page") {
						if (href) {
							children = (
								<a href={href(item)}>
									<button
										type="button"
										className={buttonClass}
										style={{
											fontWeight: selected ? "bold" : undefined,
										}}
										{...rest}
									>
										{page}
									</button>
								</a>
							);
						} else if (handleClick) {
							children = (
								<button
									type="button"
									className={buttonClass}
									style={{
										fontWeight: selected ? "bold" : undefined,
									}}
									onClick={handleClick(item)}
									{...rest}
								>
									{page}
								</button>
							);
						} else {
							children = (
								<button
									type="button"
									className={buttonClass}
									style={{
										fontWeight: selected ? "bold" : undefined,
									}}
									{...rest}
								>
									{page}
								</button>
							);
						}
					} else {
						if (href) {
							children = (
								<a href={href(item)}>
									<button type="button" className={buttonClass} {...rest}>
										{type === "previous" ? (reverse ? ">" : "<") : type === "next" ? (reverse ? "<" : ">") : type}
									</button>
								</a>
							);
						} else if (handleClick) {
							children = (
								<button type="button" onClick={handleClick(item)} className={buttonClass} {...rest}>
									{type === "previous" ? (reverse ? ">" : "<") : type === "next" ? (reverse ? "<" : ">") : type}
								</button>
							);
						} else {
							children = (
								<button type="button" className={buttonClass} {...rest}>
									{type === "previous" ? (reverse ? ">" : "<") : type === "next" ? (reverse ? "<" : ">") : type}
								</button>
							);
						}
					}

					return <div key={index}>{children}</div>;
				})}
			</div>
		</nav>
	);
}
