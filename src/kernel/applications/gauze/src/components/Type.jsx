import React from "react";
import { useState } from "react";

import { PAGINATION_PAGE_SIZE } from "./../constants.js";

import Pagination from "./Pagination.jsx";

import { FileTextIcon, TrashIcon, Pencil2Icon } from "@radix-ui/react-icons";

export default function Type({ route, router, gauze, model, where, fields }) {
	const header = model.read("HEADER", route.params.type);
	const headerFields = header.attributes.split(" ");
	const [localWhere, setLocalWhere] = useState(where);

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
		const page = pagination_set.map(function (id) {
			return model.read(header.type, id);
		});

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
						...localWhere,
						[field]: e.target.value,
					};
					setLocalWhere(updatedWhere);
				} else {
					const updatedWhere = {
						...localWhere,
					};
					delete updatedWhere[field];
					setLocalWhere(updatedWhere);
				}
			};
		}

		function applyFilter(field) {
			return function (e) {
				if (e.key === "Enter") {
					router.navigate(route.name, { ...route.params, where: encodeURIComponent(JSON.stringify(localWhere)), offset: 0 });
				}
			};
		}

		function updateFields(field) {
			return function (e) {
				console.log("field", field, e.target.checked);
				const updatedFields = {};
				headerFields.forEach(function (field) {
					updatedFields[field] = true;
				});
				fields.forEach(function (field) {
					delete updatedFields[field];
				});
				if (e.target.checked) {
					delete updatedFields[field];
				} else {
					updatedFields[field] = true;
				}
				router.navigate(route.name, { ...route.params, fields: encodeURIComponent(JSON.stringify(updatedFields)) });
			};
		}

		return (
			<div className="mw-100 fl">
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
									<a href={router.buildUrl(route.name, { ...route.params, where: encodeURIComponent(JSON.stringify(localWhere)) })}>
										<button>Filter</button>
									</a>
								</th>
								<th className="mw4 w4 pa1 relative row" tabIndex="0">
									<div>FIELDS</div>
									<span className="dn bg-white mw9 top-0 right-0 pa1 absolute f4 tooltip">
										{headerFields.map(function (field) {
											return (
												<div key={`${field}.checkbox`}>
													{field}
													<input type="checkbox" defaultChecked={fields.indexOf(field) >= 0} onChange={updateFields(field)} />
												</div>
											);
										})}
									</span>
								</th>
								{page.map(function (item) {
									return (
										<th key={item[header.primary_key]} align="left" className="mw4 w4">
											<button className="pt1 pr1 pl1">
												<FileTextIcon />
											</button>
											<button className="pt1 pr1 pl1">
												<Pencil2Icon />
											</button>
											<button className="pt1 pr1 pl1">
												<TrashIcon />
											</button>
										</th>
									);
								})}
							</tr>
						</thead>
						<tbody align="right" className="mw-100">
							{fields.map(function (field) {
								return (
									<tr align="right" key={field} className="flex flex-wrap">
										<td className="mw4 w4 overflow-x-hidden">
											<input className="mw4" onChange={updateFilter(field)} onKeyDown={applyFilter(field)} defaultValue={where[field] ? where[field] : ""} />
										</td>
										<td className="relative mw4 w4 pa1 row" tabIndex="0">
											<div className="truncate-ns field">
												<b>{field}</b>
											</div>
											<span className="dn bg-white mw9 top-0 right-0 pa1 absolute f4 tooltip">
												<b>{field}</b>
											</span>
										</td>
										{page.map(function (item) {
											return (
												<td align="left" key={`${item[header.primary_key]}.${field}`} className="relative mw4 w4 pa1 row" tabIndex="0">
													<div className="truncate-ns">{item[field]}</div>
													<span className="dn bg-white mw9 top-0 left-0 pa1 absolute f4 tooltip">{item[field]}</span>
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
												<td key={`${item[header.primary_key]}.${field}`} className="relative mw1 row" tabIndex="0">
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
