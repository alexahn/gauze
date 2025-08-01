import React from "react";
import { useState } from "react";

import { PAGINATION_PAGE_SIZE } from "./../constants.js";

import Input from "./Input.jsx";
import Pagination from "./Pagination.jsx";

import { FileTextIcon, TrashIcon, Pencil2Icon } from "@radix-ui/react-icons";

export default function TypeList({ route, router, gauze, model, where, fields }) {
	const header = model.read("HEADER", route.params.type);
	const [localWhere, setLocalWhere] = useState(where);
	const nullItem = {};
	header.fields.forEach(function (field) {
		nullItem[field.name] = "";
	});
	const [createItem, setCreateItem] = useState({});
	const [submitCreate, setSubmitCreate] = useState(false);
	const [createError, setCreateError] = useState(null);

	// use pagination record once we implement it
	const pagination_key = router.buildUrl(route.name, route.params);
	const pagination_set = model.read("PAGINATION_SET", pagination_key);
	const pagination_count = model.read("PAGINATION_COUNT", pagination_key);

	const offset = route.params.offset ? Number.parseInt(route.params.offset) : 0;
	const limit = route.params.limit ? Number.parseInt(route.params.limit) : PAGINATION_PAGE_SIZE;

	if (pagination_count && pagination_count.length && pagination_set) {
		const total = pagination_count[0].count;
		const page_current = Math.floor(Math.max(offset / limit) + 1);
		const page_max_no_skew = Math.ceil(Math.max(total / limit));
		const page_max = page_max_no_skew < page_current ? page_current : page_max_no_skew;
		const page = pagination_set
			.map(function (id) {
				return model.read(header.graphql_meta_type, id);
			})
			.reverse();

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
				const updatedFields = {};
				header.fields.forEach(function (field) {
					updatedFields[field.name] = true;
				});
				fields.forEach(function (field) {
					delete updatedFields[field.name];
				});
				if (e.target.checked) {
					delete updatedFields[field];
				} else {
					updatedFields[field] = true;
				}
				router.navigate(route.name, { ...route.params, fields: encodeURIComponent(JSON.stringify(updatedFields)) });
			};
		}

		function updateCreateItem(field) {
			return function (e) {
				const updatedItem = { ...createItem };
				updatedItem[field] = e.target.value;
				setCreateItem(updatedItem);
			};
		}

		function handleCreate(e) {
			setSubmitCreate(true);
			const expected = "create";
			const input = prompt(`Confirm create by entering '${expected}'`, "");
			setCreateError(null);
			if (input === expected) {
				return gauze
					.create(header, {
						attributes: createItem,
					})
					.then(function (results) {
						if (results && results.length) {
							const created = results[0];
							model.create(header.graphql_meta_type, created.attributes[header.primary_key], created.attributes);
							setSubmitCreate(false);
							//page.push(created.attributes)
							setCreateItem(created.attributes);
						} else {
							// alert the user that something went wrong
							setSubmitCreate(false);
						}
					})
					.catch(function (err) {
						setSubmitCreate(false);
						if (err.extensions && err.extensions.field && err.extensions.readable) {
							// scalar error
							setCreateError(err.extensions);
						}
					});
			} else {
				setSubmitCreate(false);
			}
		}

		return (
			<div className="type-list mw-100 w-100 cf">
				<h1 align="right">{header.graphql_meta_type}</h1>
				<div align="right">Type List</div>
				<hr />
				<div align="right" className="cf">
					<div className="flex fr">
						<Pagination page={page_current} count={page_max} href={href} reverse={true} />
					</div>
				</div>
				<div align="right">
					{createError ? (
						<div>
							Create failed on field "{createError.field.name}": {createError.readable}
						</div>
					) : null}
				</div>
				<hr />
				{/*<div className="mw-100 overflow-x-auto"> */}
				<div className="flex fr">
					<table>
						<thead className="mw-100">
							<tr align="right" className="flex flex-wrap">
								<th align="center" className="mw4 w4">
									<button className="green" onClick={handleCreate} disabled={submitCreate}>
										Create
									</button>
								</th>
								{page.map(function (item) {
									return (
										<th key={item[header.primary_key]} align="left" className="mw4 w4 pt1 flex flex-wrap justify-center">
											<a href={router.buildUrl("system.types.item.type.id", { type: route.params.type, id: item[header.primary_key], mode: "view" })}>
												<button className="f5 ml1 mr1">
													<FileTextIcon />
												</button>
											</a>
											<a href={router.buildUrl("system.types.item.type.id", { type: route.params.type, id: item[header.primary_key], mode: "edit" })}>
												<button className="f5 ml1 mr1">
													<Pencil2Icon />
												</button>
											</a>
											<a href={router.buildUrl("system.types.item.type.id", { type: route.params.type, id: item[header.primary_key], mode: "remove" })}>
												<button className="f5 ml1 mr1">
													<TrashIcon />
												</button>
											</a>
										</th>
									);
								})}
								<th className="mw4 w4 pa1 relative row" tabIndex="0">
									<div>FIELDS</div>
									<span className="dn bg-light-green mw9 w5 top-0 right-0 pa1 absolute f4 tooltip">
										{header.fields.map(function (field) {
											return (
												<div key={`${field.name}.checkbox`}>
													{field.name}
													<input
														type="checkbox"
														defaultChecked={
															fields
																? fields.find(function (v) {
																		return v.name === field.name;
																	})
																: true
														}
														onChange={updateFields(field.name)}
													/>
													<a href={router.buildUrl(route.name, { ...route.params, order: field.name, order_direction: "asc" })}>
														<button className="f6" disabled={route.params.order && route.params.order === field.name && route.params.order_direction === "asc"}>
															{"<"}
														</button>
													</a>
													<a href={router.buildUrl(route.name, { ...route.params, order: field.name, order_direction: "desc" })}>
														<button className="f6" disabled={route.params.order && route.params.order === field.name && route.params.order_direction === "desc"}>
															{">"}
														</button>
													</a>
												</div>
											);
										})}
									</span>
								</th>
								<th align="center" className="mw4 w4">
									<a href={router.buildUrl(route.name, { ...route.params, where: encodeURIComponent(JSON.stringify(localWhere)) })}>
										<button>Filter</button>
									</a>
								</th>
							</tr>
						</thead>
						<tbody align="right" className="mw-100">
							{fields.map(function (field) {
								return (
									<tr align="right" key={field.name} className="flex flex-wrap">
										<td className="mw4 w4 overflow-x-hidden">
											<Input field={field} className="mw4 w4" value={createItem[field.name]} onChange={updateCreateItem(field.name)} disabled={submitCreate} />
										</td>
										{page.map(function (item) {
											return (
												<td align="left" key={`${item[header.primary_key]}.${field}`} className="relative mw4 w4 pa1 row" tabIndex="0">
													<div className="truncate-ns">{item[field.name]}</div>
													<span className="dn bg-washed-green mw9 w5 top-0 left-0 pa1 absolute f4 tooltip">{item[field.name]}</span>
												</td>
											);
										})}
										<td className="relative mw4 w4 pa1 row" tabIndex="0">
											<div className="truncate-ns field">
												<b>{field.name}</b>
											</div>
											<span className="dn bg-light-green mw9 w5 top-0 right-0 pa1 absolute f4 tooltip">
												<b>{field.name}</b>
											</span>
										</td>
										<td className="mw4 w4 overflow-x-hidden">
											<Input
												defaultMode={true}
												field={field}
												className="mw4"
												onChange={updateFilter(field.name)}
												onKeyDown={applyFilter(field.name)}
												defaultValue={where[field.name] ? where[field.name] : ""}
											/>
										</td>
									</tr>
								);
							})}
						</tbody>
					</table>
				</div>
			</div>
		);
	} else {
		return (
			<div>
				<h1 align="right">{header.graphql_meta_type}</h1>
				<div align="right">Type List</div>
				<hr />
			</div>
		);
	}
}
