import * as React from "react";

import { ChevronLeftIcon, ChevronRightIcon } from "@radix-ui/react-icons";

import { cursorCurrentPage, cursorPayloadFromPageInfo } from "./../cursor.js";

function cursorItemDisabled(item) {
	return !item.cursor || item.disabled;
}

function CursorPagination({ pageInfo, variables = {}, href, handleClick, reverse = false, buttonClass = "", showDetails = true, detailsOpen = false }) {
	const payload = cursorPayloadFromPageInfo(pageInfo, variables);
	const currentPage = cursorCurrentPage(payload);
	const items = [
		{
			type: "previous",
			label: reverse ? <ChevronRightIcon /> : <ChevronLeftIcon />,
			cursor: pageInfo && pageInfo.has_previous_page ? pageInfo.previous_cursor : null,
			disabled: !(pageInfo && pageInfo.has_previous_page && pageInfo.previous_cursor),
		},
		{
			type: "current",
			label: "Current",
			cursor: pageInfo ? pageInfo.current_cursor : null,
			disabled: true,
		},
		{
			type: "next",
			label: reverse ? <ChevronLeftIcon /> : <ChevronRightIcon />,
			cursor: pageInfo && pageInfo.has_next_page ? pageInfo.next_cursor : null,
			disabled: !(pageInfo && pageInfo.has_next_page && pageInfo.next_cursor),
		},
	];
	if (reverse) {
		items.reverse();
	}
	function renderButton(item) {
		const disabled = cursorItemDisabled(item);
		const button = (
			<button type="button" className={buttonClass} disabled={disabled} onClick={handleClick && !disabled ? handleClick(item) : undefined}>
				{item.label}
			</button>
		);
		if (href && !disabled) {
			return <a href={href(item)}>{button}</a>;
		} else {
			return button;
		}
	}
	return (
		<div className="project-cursor-pagination">
			<nav className="project-cursor-pagination-nav" aria-label="Cursor pagination">
				{items.map(function (item) {
					return <div key={item.type}>{renderButton(item)}</div>;
				})}
			</nav>
			{showDetails && payload ? (
				<details className="project-cursor-details" defaultOpen={detailsOpen}>
					<summary>Cursor</summary>
					<div className="project-cursor-detail-grid">
						<div>entity</div>
						<code>{payload.entity || ""}</code>
						<div>method</div>
						<code>{payload.method || ""}</code>
						<div>page</div>
						<code>{payload.page || ""}</code>
						<div>direction</div>
						<code>{currentPage ? currentPage.direction || "" : ""}</code>
						<div>range</div>
						<pre>{JSON.stringify(currentPage ? currentPage.cursor_where_between : null, null, 2)}</pre>
						<div>parameters</div>
						<pre>{JSON.stringify(payload.parameters || {}, null, 2)}</pre>
					</div>
				</details>
			) : null}
		</div>
	);
}

export default CursorPagination;
