import React from "react";
import { useState } from "react";

import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

export default function Type({ route, router, gauze, model }) {
	const header = model.read("HEADER", route.params.type);
	// use pagination record once we implement it
	const pagination_key = router.buildUrl(route.name, route.params);
	const pagination_set = model.read("PAGINATION_SET", pagination_key);
	const pagination_count = model.read("PAGINATION_COUNT", pagination_key);

	const offset = route.params.offset ? Number.parseInt(route.params.offset) : 0;
	const limit = route.params.limit ? Number.parseInt(route.params.limit) : 128;
	const total = pagination_count[0].count;
	const page_current = Math.floor(Math.max(offset / limit) + 1);
	const page_max_no_skew = Math.floor(Math.max(total / limit) + 2);
	const page_max = page_max_no_skew < page_current ? page_current : page_max_no_skew;
	console.log("pagination_set", pagination_set);
	console.log("pagination_count", pagination_count);
	console.log("page_current", page_current);
	console.log("page_max", page_max);
	const items = model.all(header.type);
	const fields = header.attributes.split(" ");
	return (
		<div>
			<div>Type</div>
			<hr />
			<Pagination
				count={page_max}
				defaultPage={page_current}
				boundaryCount={2}
				renderItem={(item) => {
					console.log("item", item);
					var paginate;
					if (item.type === "previous") {
						paginate = {
							limit: limit,
							offset: Math.max(0, offset - limit),
						};
					} else if (item.type === "next") {
						paginate = {
							limit: limit,
							offset: Math.min(page_max * limit, offset + limit),
						};
					} else if (item.type === "page") {
						paginate = {
							limit: limit,
							offset: (item.page - 1) * limit,
						};
					} else {
						paginate = {
							limit: limit,
							offset: offset,
						};
					}
					return (
						<a
							href={router.buildUrl(route.name, {
								...route.params,
								...paginate,
							})}
						>
							<PaginationItem {...item} />
						</a>
					);
				}}
			/>
			<div>
				{items.map(function (item) {
					return (
						<div key={item[header.primary_key]}>
							{fields.map(function (field) {
								return (
									<div key={field}>
										{field}: {item[field]}
									</div>
								);
							})}
						</div>
					);
				})}
			</div>
		</div>
	);
}
