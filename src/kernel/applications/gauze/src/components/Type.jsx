import React from "react";
import { useState } from "react";

import { PAGINATION_PAGE_SIZE } from "./../constants.js";

import Pagination from "./Pagination.jsx";

export default function Type({ route, router, gauze, model }) {
	const [where, setWhere] = useState({});
	const [whereLoaded, setWhereLoaded] = useState(false);
	const header = model.read("HEADER", route.params.type);
	// use pagination record once we implement it
	const pagination_key = router.buildUrl(route.name, route.params);
	const pagination_set = model.read("PAGINATION_SET", pagination_key);
	const pagination_count = model.read("PAGINATION_COUNT", pagination_key);

	const offset = route.params.offset ? Number.parseInt(route.params.offset) : 0;
	const limit = route.params.limit ? Number.parseInt(route.params.limit) : PAGINATION_PAGE_SIZE;

	if (pagination_count && pagination_count.length && pagination_set) {
		const total = pagination_count[0].count;
		const page_current = Math.floor(Math.max(offset / limit) + 1);
		const page_max_no_skew = Math.floor(Math.max(total / limit));
		const page_max = page_max_no_skew < page_current ? page_current : page_max_no_skew;
		console.log("pagination_set", pagination_set);
		console.log("pagination_count", pagination_count);
		console.log("page_current", page_current);
		console.log("page_max", page_max);
		const fields = header.attributes.split(" ");
		const page = pagination_set.map(function (id) {
			return model.read(header.type, id);
		});

		// note: maybe break down all state to atomic primitives so change can be individually be tracked
		// note: kind of a pain though
		if (!whereLoaded && route.params.where) {
			console.log("LOADING WHERE");
			setWhere(JSON.parse(decodeURIComponent(route.params.where)));
			setWhereLoaded(true);

			//setRouteWhere(route.params.where ? (JSON.stringify(routeWhere) === decodeURIComponent(route.params.where) ? routeWhere : JSON.parse(decodeURIComponent(route.params.where))) : {})
		}

		function href(item) {
			var paginate;
			if (item.type === "previous") {
				paginate = {
					limit: limit,
					offset: Math.max(0, offset - limit),
				};
			} else if (item.type === "next") {
				paginate = {
					limit: limit,
					offset: Math.min((page_max - 1) * limit, offset + limit),
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
			return router.buildUrl(route.name, {
				...route.params,
				...paginate,
			});
		}
		function updateFilter(field) {
			return function (e) {
				console.log("e", e);
				if (e.target.value !== "") {
					const updatedWhere = {
						...where,
						[field]: e.target.value,
					};
					setWhere(updatedWhere);
				} else {
					const updatedWhere = {
						...where,
					};
					delete updatedWhere[field];
					setWhere(updatedWhere);
				}
			};
		}

		return (
			<div>
				<h1 align="right">{header.type}</h1>
				<div align="right">Type</div>
				<hr />
				<div align="right" className="cf">
					<Pagination page={page_current} count={page_max} href={href} />
				</div>
				<hr />
				<div className="mw-100 overflow-x-auto">
					<table>
						<thead>
							<tr align="right">
								<th>
									<a href={router.buildUrl(route.name, { ...route.params, where: encodeURIComponent(JSON.stringify(where)) })}>
										<button>Filter</button>
									</a>
								</th>
								{fields.map(function (field) {
									return (
										<th key={`${field}:filter`}>
											<input onChange={updateFilter(field)} defaultValue={where[field] ? where[field] : ""} />
										</th>
									);
								})}
							</tr>
							<tr align="right">
								<th>
									<input type="checkbox" />
								</th>
								{fields.map(function (field) {
									return <th key={`${field}:name`}>{field}</th>;
								})}
							</tr>
						</thead>
						<tbody align="right">
							{page.map(function (item) {
								return (
									<tr align="right" key={item[header.primary_key]}>
										<td>
											<input type="checkbox" />
										</td>
										{fields.map(function (field) {
											return <td key={`${item[header.primary_key]}.${field}`}>{item[field]}</td>;
										})}
									</tr>
								);
							})}
							{/*
							<tr>
								<td>Emil</td>
								<td>Tobias</td>
								<td>Linus</td>
							</tr>
							<tr align="right">
								<td>16</td>
								<td>14</td>
								<td>10</td>
							</tr>
							*/}
						</tbody>
					</table>
					{/*
					{page.map(function (item) {
						return (
							<div>
								<div key={item[header.primary_key]}>
									{fields.map(function (field) {
										return (
											<div key={field}>
												{field}: {item[field]}
											</div>
										);
									})}
								</div>
								<hr/>
							</div>
						);
					})}
		*/}
				</div>
			</div>
		);
	} else {
		return (
			<div>
				<h1 align="right">{header.type}</h1>
				<div align="right">Type</div>
				<hr />
			</div>
		);
	}
}
