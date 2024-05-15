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
		function applyFilter(field) {
			return function (e) {
				if (e.key === "Enter") {
					router.navigate(route.name, { ...route.params, where: encodeURIComponent(JSON.stringify(where)), offset: 0 });
				}
			};
		}

		return (
			<div className="mw-100">
				<h1 align="right">{header.type}</h1>
				<div align="right">Type</div>
				<hr />
				<div align="right" className="cf">
					<Pagination page={page_current} count={page_max} href={href} />
				</div>
				<hr />
				{/*<div className="mw-100 overflow-x-auto"> */}
				<div className="flex mw-100 h-100">
					<table>
						<thead className="flex flex-wrap mw-100">
							<tr align="right" className="flex flex-wrap">
								<th className="mw4 w4">
									<a href={router.buildUrl(route.name, { ...route.params, where: encodeURIComponent(JSON.stringify(where)) })}>
										<button>Filter</button>
									</a>
								</th>
								<th className="mw4 w4 truncate-ns">
									<button>Fields</button>
								</th>
								{page.map(function (item) {
									return (
										<th className="mw4 w4 truncate-ns">
											<button>Edit</button>
											<button>Delete</button>
										</th>
									);
								})}
								{/*
								{fields.map(function (field) {
									return (
										<th key={`${field}:filter`}>
											<input onChange={updateFilter(field)} onKeyDown={applyFilter(field)} defaultValue={where[field] ? where[field] : ""} />
										</th>
									);
								})}
								*/}
							</tr>
							{/*
							<tr align="right">
								<th>
									<input type="checkbox" />
								</th>
								{fields.map(function (field) {
									return <th key={`${field}:name`}>{field}</th>;
								})}
							</tr>
							*/}
						</thead>
						<tbody align="right" className="mw-100">
							{fields.map(function (field) {
								return (
									<tr align="right" key={field} className="flex flex-wrap">
										<td className="mw4 w4">
											<input className="mw4" onChange={updateFilter(field)} onKeyDown={applyFilter(field)} defaultValue={where[field] ? where[field] : ""} />
										</td>
										<td className="relative mw4 w4 pa1 row" tabindex="0">
											<div className="truncate-ns">
												<b>{field}</b>
											</div>
											<span className="dn bg-white mw9 top-0 right-0 pa1 absolute f4 tooltip">
												<b>{field}</b>
											</span>
										</td>
										{page.map(function (item) {
											return (
												<td key={`${item[header.primary_key]}.${field}`} className="relative mw4 w4 pa1 row" tabindex="0">
													<div className="truncate-ns">{item[field]}</div>
													<span className="dn bg-white mw9 top-0 right-0 pa1 absolute f4 tooltip">{item[field]}</span>
												</td>
											);
										})}
									</tr>
								);
							})}
							{/*
							{page.map(function (item) {
								return (
									<tr align="right" key={item[header.primary_key]}>
										<td>
											<input type="checkbox" />
										</td>
										{fields.map(function (field) {
											return (
												<td key={`${item[header.primary_key]}.${field}`} className="relative mw1 row" tabindex="0">
													<div className="truncate-ns pl1 pr1">
														{item[field]}
													</div>
													<span className='dn bg-white top-0 right-0 pa1 absolute f4 tooltip'>{item[field]}</span>
												</td>
											);
										})}
									</tr>
								);
							})}
							*/}
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
