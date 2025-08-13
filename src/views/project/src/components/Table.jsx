import * as React from "react";
import { useState } from "react";

import { Pencil2Icon, Link2Icon, BookmarkIcon, BookmarkFilledIcon } from "@radix-ui/react-icons";

import { navigate } from "@ahn/sinew";

import Input from "./Input.jsx";
import Pagination from "./Pagination.jsx";

function Table({ pathfinder, services, agent, headers, header, variables = {}, items, count }) {
	const { gauze } = services;
	// note: infer the filter mode based on the structure of variables
	const defaultFilterMode = variables.where ? "where" : variables.where_like ? "where_like" : variables.where_between ? "where_between" : "where";
	const [filterMode, setFilterMode] = useState(defaultFilterMode);
	const [localVariables, setLocalVariables] = useState(variables);
	const cellClass = "relative tooltip-container ba bw1 br2 mb1 bgx2 bdx2 cx6 bgx3h bdx3h cx6h w100";
	const itemClass = "athelas f6 clouds w-100 truncate-ns mw5";
	const tooltipClass = "absolute tooltip athelas f6 dn bgx2 cx6 mw5 w5 top-0 left-0 ba bw1 br2";

	const offset = variables.offset ? Number.parseInt(variables.offset) : 0;
	const limit = variables.limit ? Number.parseInt(variables.limit) : 16;
	const pageCurrent = Math.floor(Math.max(offset / limit) + 1);
	const pageMaxNoSkew = Math.ceil(Math.max(count / limit));
	const pageMax = pageMaxNoSkew < pageCurrent ? pageCurrent : pageMaxNoSkew;
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
				offset: Math.min((pageMax - 1) * limit, offset + limit),
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
		// current state
		const state = pathfinder.URLToState(location.href);
		const url = pathfinder.stateToURL(state.name, state.pathParams, {
			variables: JSON.stringify({
				...variables,
				...paginate,
			}),
		});
		return url;
	}
	function handleFilterMode(mode) {
		return function (e) {
			setFilterMode(mode);
		};
	}
	// note: we need this function because when the input field is empty, we have where_like: { [field]: "" }, which usually returns an empty array
	// note: if there are any valid queries with null or empty values in the query fields, we would need to rethink this
	function stripVariables(variables, mode) {
		const modes = ["where", "where_like"];
		const array_modes = ["where_between"];
		const stripped = {
			...variables,
		};
		modes.forEach(function (mode) {
			if (variables[mode]) {
				Object.keys(variables[mode]).forEach(function (field) {
					if (variables[mode][field]) {
						// nothing
					} else {
						delete stripped[mode][field];
					}
				});
			}
		});
		array_modes.forEach(function (mode) {
			if (variables[mode]) {
				Object.keys(variables[mode]).forEach(function (field) {
					const every = variables[mode][field].every(function (v) {
						return v;
					});
					if (every) {
						// nothing
					} else {
						delete stripped[mode][field];
					}
				});
			}
		});
		// note: the last version of filtering was too advanced
		// note: the new version is very basic, and only the values visible on the screen apply to the filter
		if (mode === "where") {
			delete stripped.where_like;
			delete stripped.where_between;
		} else if (mode === "where_like") {
			delete stripped.where;
			delete stripped.where_between;
		} else if (mode === "where_between") {
			delete stripped.where;
			delete stripped.where_like;
		} else {
		}
		return stripped;
	}
	function handleFilterChange(field) {
		return function (e) {
			const variables = {
				...localVariables,
			};
			if (variables[filterMode]) {
				// note: should we use e.target.serialized?
				variables[filterMode][field] = e.target.serialized;
			} else {
				variables[filterMode] = {
					// note: should we use e.target.serialized?
					[field]: e.target.serialized,
				};
			}
			setLocalVariables(variables);
		};
	}
	function handleBetweenFilterChange(field, index) {
		return function (e) {
			const variables = {
				...localVariables,
			};
			if (variables[filterMode]) {
				if (variables[filterMode][field]) {
					// note: should we use e.target.serialized?
					variables[filterMode][field][index] = e.target.serialized;
				} else {
					variables[filterMode][field] = [];
					// note: should we use e.target.serialized?
					variables[filterMode][field][index] = e.target.serialized;
				}
			} else {
				variables[filterMode] = {
					[field]: [],
				};
				// note: should we use e.target.serialized?
				variables[filterMode][field][index] = e.target.serialized;
			}
			setLocalVariables(variables);
		};
	}
	function handleFilterKeyDown(field) {
		return function (e) {
			if (e.key === "Enter") {
				const state = pathfinder.URLToState(location.href);
				const url = pathfinder.stateToURL(state.name, state.pathParams, {
					...state.searchParams,
					variables: JSON.stringify(stripVariables(localVariables, filterMode)),
				});
				navigate(url, {
					push: true,
					replace: false,
					state: state,
				});
			}
		};
	}
	function renderFilters() {
		if (filterMode === "where") {
			return (
				<tr>
					<th className={cellClass} tabIndex="0">
						<button className="athelas f6" type="button">
							Match
						</button>
						<span className={tooltipClass}>
							<button type="button" onClick={handleFilterMode("where")}>
								Match
							</button>
							<button type="button" onClick={handleFilterMode("where_like")}>
								Search
							</button>
							<button type="button" onClick={handleFilterMode("where_between")}>
								Range
							</button>
						</span>
					</th>
					{header.fields.map(function (field) {
						const defaultValue = localVariables[filterMode] ? localVariables[filterMode][field.name] : undefined;
						return (
							<th key={field.name} className={cellClass} tabIndex="0">
								<div key={filterMode} className={itemClass}>
									<Input
										defaultMode={true}
										field={field}
										className="w-100 mw5"
										onChange={handleFilterChange(field.name)}
										onKeyDown={handleFilterKeyDown(field.name)}
										defaultValue={defaultValue}
									/>
								</div>
							</th>
						);
					})}
				</tr>
			);
		} else if (filterMode === "where_like") {
			return (
				<tr>
					<th className={cellClass} tabIndex="0">
						<button className="athelas f6" type="button">
							Search
						</button>
						<span className={tooltipClass}>
							<button type="button" onClick={handleFilterMode("where")}>
								Match
							</button>
							<button type="button" onClick={handleFilterMode("where_like")}>
								Search
							</button>
							<button type="button" onClick={handleFilterMode("where_between")}>
								Range
							</button>
						</span>
					</th>
					{header.fields.map(function (field) {
						const defaultValue = localVariables[filterMode] ? localVariables[filterMode][field.name] : undefined;
						return (
							<th key={field.name} className={cellClass} tabIndex="0">
								<div key={filterMode} className={itemClass}>
									<Input
										defaultMode={true}
										field={field}
										className="w-100 mw5"
										onChange={handleFilterChange(field.name)}
										onKeyDown={handleFilterKeyDown(field.name)}
										defaultValue={defaultValue}
									/>
								</div>
							</th>
						);
					})}
				</tr>
			);
		} else if (filterMode === "where_between") {
			return (
				<>
					<tr>
						<th className={cellClass} tabIndex="0">
							<button className="athelas f6" type="button">
								Start
							</button>
							<span className={tooltipClass}>
								<button type="button" onClick={handleFilterMode("where")}>
									Match
								</button>
								<button type="button" onClick={handleFilterMode("where_like")}>
									Search
								</button>
								<button type="button" onClick={handleFilterMode("where_between")}>
									Range
								</button>
							</span>
						</th>
						{header.fields.map(function (field) {
							const defaultValue0 = localVariables[filterMode] ? (localVariables[filterMode][field.name] ? localVariables[filterMode][field.name][0] : undefined) : undefined;
							return (
								<th key={field.name} className={cellClass} tabIndex="0">
									<div key={filterMode} className={itemClass}>
										<Input
											defaultMode={true}
											field={field}
											className="w-100 mw5"
											onChange={handleBetweenFilterChange(field.name, 0)}
											onKeyDown={handleFilterKeyDown(field.name)}
											defaultValue={defaultValue0}
										/>
									</div>
								</th>
							);
						})}
					</tr>
					<tr>
						<th className={cellClass} tabIndex="0">
							<button className="athelas f6" type="button">
								End
							</button>
							<span className={tooltipClass}>
								<button type="button" onClick={handleFilterMode("where")}>
									Match
								</button>
								<button type="button" onClick={handleFilterMode("where_like")}>
									Search
								</button>
								<button type="button" onClick={handleFilterMode("where_between")}>
									Range
								</button>
							</span>
						</th>
						{header.fields.map(function (field) {
							const defaultValue1 = localVariables[filterMode] ? (localVariables[filterMode][field.name] ? localVariables[filterMode][field.name][1] : undefined) : undefined;
							return (
								<th key={field.name} className={cellClass} tabIndex="0">
									<div key={filterMode} className={itemClass}>
										<Input
											defaultMode={true}
											field={field}
											className="w-100 mw5"
											onChange={handleBetweenFilterChange(field.name, 1)}
											onKeyDown={handleFilterKeyDown(field.name)}
											defaultValue={defaultValue1}
										/>
									</div>
								</th>
							);
						})}
					</tr>
				</>
			);
		} else {
		}
	}
	return (
		<div>
			<table>
				<thead>
					{renderFilters()}
					<tr>
						<th className={cellClass}>
							<button className="athelas f6" type="button">
								Fields
							</button>
						</th>
						{header.fields.map(function (field) {
							return (
								<th key={field.name} className={cellClass} tabIndex="0">
									<div className={itemClass}>{field.name}</div>
									<span className={tooltipClass}>{field.name}</span>
								</th>
							);
						})}
					</tr>
				</thead>
				<tbody>
					<tr>
						<td align="center" className={cellClass}></td>
						{header.fields.map(function (field) {
							return (
								<td key={field.name} className={cellClass} tabIndex="0" align="center">
									<a
										href={pathfinder.stateToURL(
											"project.system.headers.header.create",
											{ header: header.graphql_meta_type.toLowerCase() },
											{ variables: JSON.stringify(localVariables) },
										)}
									>
										<button className="athelas f6" type="button">
											Create
										</button>
									</a>
								</td>
							);
						})}
					</tr>
					{items.map(function (item) {
						const isGauzeEntity = ["RELATIONSHIP", "WHITELIST", "BLACKLIST"].indexOf(header.graphql_meta_type) >= 0;
						const hasWhitelist = !isGauzeEntity;
						const hasBlacklist = !isGauzeEntity;
						const hasRelationships = !isGauzeEntity;
						const whitelist = function (method) {
							return pathfinder.stateToURL(
								"project.system.headers.header.list",
								{
									header: headers
										.find(function (header) {
											return header.graphql_meta_type === "WHITELIST";
										})
										.graphql_meta_type.toLowerCase(),
								},
								{
									variables: JSON.stringify({
										where: {
											gauze__whitelist__realm: agent.aud,
											gauze__whitelist__entity_id: item._metadata.id,
											gauze__whitelist__entity_type: header.table_name,
											gauze__whitelist__method: method,
										},
									}),
								},
							);
						};
						const blacklist = function (method) {
							return pathfinder.stateToURL(
								"project.system.headers.header.list",
								{
									header: headers
										.find(function (header) {
											return header.graphql_meta_type === "BLACKLIST";
										})
										.graphql_meta_type.toLowerCase(),
								},
								{
									variables: JSON.stringify({
										where: {
											gauze__blacklist__realm: agent.aud,
											gauze__blacklist__entity_id: item._metadata.id,
											gauze__blacklist__entity_type: header.table_name,
											gauze__blacklist__method: method,
										},
									}),
								},
							);
						};
						const fromRelationships = pathfinder.stateToURL(
							"project.system.headers.header.list",
							{
								header: headers
									.find(function (header) {
										return header.graphql_meta_type === "RELATIONSHIP";
									})
									.graphql_meta_type.toLowerCase(),
							},
							{
								variables: JSON.stringify({
									where: {
										gauze__relationship__from_id: item._metadata.id,
										gauze__relationship__from_type: header.table_name,
									},
								}),
							},
						);
						const toRelationships = pathfinder.stateToURL(
							"project.system.headers.header.list",
							{
								header: headers
									.find(function (header) {
										return header.graphql_meta_type === "RELATIONSHIP";
									})
									.graphql_meta_type.toLowerCase(),
							},
							{
								variables: JSON.stringify({
									where: {
										gauze__relationship__to_id: item._metadata.id,
										gauze__relationship__to_type: header.table_name,
									},
								}),
							},
						);
						return (
							<tr key={item._metadata.id}>
								<td align="center" className={cellClass}>
									<div className="flex justify-center">
										<a href={pathfinder.stateToURL("project.system.headers.header.item", { header: header.graphql_meta_type.toLowerCase(), id: item._metadata.id }, {})}>
											<button type="button">
												<Pencil2Icon />
											</button>
										</a>
										{hasRelationships ? (
											<div className={"relative tooltip-container"} tabIndex="0">
												<div className={itemClass}>
													<button type="button">
														<Link2Icon />
													</button>
												</div>
												<span className={tooltipClass}>
													<div className={"flex flex-column mw3"}>
														<a href={toRelationships}>
															<button className="athelas f6 w3" type="button">
																To
															</button>
														</a>
														<a href={fromRelationships}>
															<button className="athelas f6 w3" type="button">
																From
															</button>
														</a>
													</div>
												</span>
											</div>
										) : null}
										{hasWhitelist ? (
											<div className={"relative tooltip-container"} tabIndex="0">
												<div className={itemClass}>
													<button type="button">
														<BookmarkIcon />
													</button>
												</div>
												<span className={tooltipClass}>
													<div className={"flex flex-column mw3"}>
														<a href={whitelist("create")}>
															<button className="athelas f6 w3" type="button">
																Create
															</button>
														</a>
														<a href={whitelist("read")}>
															<button className="athelas f6 w3" type="button">
																Read
															</button>
														</a>
														<a href={whitelist("update")}>
															<button className="athelas f6 w3" type="button">
																Update
															</button>
														</a>
														<a href={whitelist("delete")}>
															<button className="athelas f6 w3" type="button">
																Delete
															</button>
														</a>
														<a href={whitelist("count")}>
															<button className="athelas f6 w3" type="button">
																Count
															</button>
														</a>
													</div>
												</span>
											</div>
										) : null}
										{hasBlacklist ? (
											<div className={"relative tooltip-container"} tabIndex="0">
												<div className={itemClass}>
													<button type="button">
														<BookmarkFilledIcon />
													</button>
												</div>
												<span className={tooltipClass}>
													<div className={"flex flex-column mw3"}>
														<a href={blacklist("create")}>
															<button className="athelas f6 w3" type="button">
																Create
															</button>
														</a>
														<a href={blacklist("read")}>
															<button className="athelas f6 w3" type="button">
																Read
															</button>
														</a>
														<a href={blacklist("update")}>
															<button className="athelas f6 w3" type="button">
																Update
															</button>
														</a>
														<a href={blacklist("delete")}>
															<button className="athelas f6 w3" type="button">
																Delete
															</button>
														</a>
														<a href={blacklist("count")}>
															<button className="athelas f6 w3" type="button">
																Count
															</button>
														</a>
													</div>
												</span>
											</div>
										) : null}
									</div>
								</td>
								{header.fields.map(function (field) {
									return (
										<td key={field.name} className={cellClass} tabIndex="0">
											<div className={itemClass}>{item.attributes[field.name]}</div>
											<span className={tooltipClass}>{item.attributes[field.name]}</span>
										</td>
									);
								})}
							</tr>
						);
					})}
				</tbody>
			</table>
			<Pagination page={pageCurrent} count={pageMax} href={href} reverse={false} />
		</div>
	);
}

export default Table;
