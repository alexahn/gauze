import * as React from "react";
import { useEffect, useMemo, useState } from "react";

import { ArrowDownIcon, ArrowUpIcon, BookmarkFilledIcon, BookmarkIcon, Link2Icon, Pencil2Icon, PlusCircledIcon, TrashIcon } from "@radix-ui/react-icons";

import { navigate } from "@ahn/sinew";

import Input from "./Input.jsx";
import Link from "./Link.jsx";
import CursorPagination from "./CursorPagination.jsx";
import Popover from "./Popover.jsx";
import { cursorEffectiveVariables, cursorRouteVariables } from "./../cursor.js";

function orderClausesFromVariables(variables) {
	if (!Array.isArray(variables.order)) {
		return [];
	}
	return variables.order.map(function (item) {
		return {
			column: item && item.column ? item.column : "",
			order: item && item.order ? item.order : "",
			nulls: item && item.nulls ? item.nulls : "",
		};
	});
}

function emptyOrderClause() {
	return {
		column: "",
		order: "asc",
		nulls: "",
	};
}

function cleanOrderClauses(orderClauses) {
	return orderClauses
		.filter(function (clause) {
			return clause.column;
		})
		.map(function (clause) {
			const orderItem = {
				column: clause.column,
			};
			if (clause.order) {
				orderItem.order = clause.order;
			}
			if (clause.nulls) {
				orderItem.nulls = clause.nulls;
			}
			return orderItem;
		});
}

function hasRangeBoundaryValue(value) {
	return value !== undefined && value !== null && value !== "";
}

function normalizeRangeBoundary(value) {
	return hasRangeBoundaryValue(value) ? value : null;
}

function normalizeWhereBetweenRange(range) {
	const start = Array.isArray(range) ? range[0] : undefined;
	const end = Array.isArray(range) ? range[1] : undefined;
	if (!hasRangeBoundaryValue(start) && !hasRangeBoundaryValue(end)) {
		return null;
	}
	return [normalizeRangeBoundary(start), normalizeRangeBoundary(end)];
}

function hasFilterValues(filters) {
	return filters && typeof filters === "object" && Object.keys(filters).length > 0;
}

function filterModeFromVariables(variables = {}) {
	if (hasFilterValues(variables.where_between)) {
		return "where_between";
	} else if (hasFilterValues(variables.where_like)) {
		return "where_like";
	} else if (hasFilterValues(variables.where)) {
		return "where";
	} else {
		return "where";
	}
}

function Table({ pathfinder, services, agent, headers, header, variables = {}, items, count, pageInfo }) {
	const appliedVariables = useMemo(
		function () {
			return cursorEffectiveVariables(variables, pageInfo);
		},
		[variables, pageInfo],
	);
	const appliedCursor = (pageInfo && pageInfo.current_cursor) || variables.cursor || "";
	const appliedVariablesKey = JSON.stringify(appliedVariables);
	// note: infer the filter mode based on the structure of variables
	const defaultFilterMode = filterModeFromVariables(appliedVariables);
	const [filterMode, setFilterMode] = useState(defaultFilterMode);
	const [localVariables, setLocalVariables] = useState(appliedVariables);
	const [orderClauses, setOrderClauses] = useState(orderClausesFromVariables(appliedVariables));
	const cellClass = "ba bw1 br2 mb1 bgx2 bdx2 cx6 bgx3h bdx3h cx6h w100";
	const itemClass = "athelas f6 clouds w-100 truncate-ns mw5";
	const textTriggerClass = "button-reset athelas f6 clouds w-100 truncate-ns mw5 tl";
	const iconTriggerClass = "button-reset flex items-center justify-center";
	const textPopoverClass = "tooltip athelas f6 bgx2 cx6 mw5 ba bw1 br2 pa1";
	const menuPopoverClass = "tooltip athelas f6 bgx2 cx6 mw5 ba bw1 br2 pa1";
	const orderPopoverClass = "tooltip project-table-order-popover bgx2 cx6 ba bw1 br2 bdx3 shadow-2";
	const appliedOrderClauses = cleanOrderClauses(orderClausesFromVariables(appliedVariables));
	const appliedOrderByColumn = appliedOrderClauses.reduce(function (index, clause, clauseIndex) {
		if (!index[clause.column]) {
			index[clause.column] = {
				...clause,
				index: clauseIndex,
			};
		}
		return index;
	}, {});

	useEffect(
		function () {
			setFilterMode(defaultFilterMode);
			setLocalVariables(appliedVariables);
			setOrderClauses(orderClausesFromVariables(appliedVariables));
		},
		[appliedVariablesKey, appliedCursor, defaultFilterMode],
	);

	function href(item) {
		// current state
		const state = pathfinder.URLToState(location.href);
		const url = pathfinder.stateToURL(state.name, state.pathParams, {
			variables: JSON.stringify(cursorRouteVariables({ cursor: item.cursor }, null)),
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
			where: variables.where ? { ...variables.where } : undefined,
			where_like: variables.where_like ? { ...variables.where_like } : undefined,
			where_between: variables.where_between ? { ...variables.where_between } : undefined,
		};
		delete stripped.cursor;
		delete stripped.offset;
		modes.forEach(function (mode) {
			if (stripped[mode]) {
				Object.keys(stripped[mode]).forEach(function (field) {
					if (stripped[mode][field]) {
						// nothing
					} else {
						delete stripped[mode][field];
					}
				});
			}
		});
		array_modes.forEach(function (mode) {
			if (stripped[mode]) {
				Object.keys(stripped[mode]).forEach(function (field) {
					const range = normalizeWhereBetweenRange(stripped[mode][field]);
					if (range) {
						stripped[mode][field] = range;
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
	function navigateWithVariables(nextVariables) {
		const state = pathfinder.URLToState(location.href);
		const url = pathfinder.stateToURL(state.name, state.pathParams, {
			...state.searchParams,
			variables: JSON.stringify(nextVariables),
		});
		navigate(url, {
			push: true,
			replace: false,
			state: state,
		});
	}
	function handleFilterChange(field) {
		return function (e) {
			const variables = {
				...localVariables,
				[filterMode]: {
					...(localVariables[filterMode] || {}),
					[field]: e.target.serialized,
				},
			};
			delete variables.cursor;
			delete variables.offset;
			setLocalVariables(variables);
		};
	}
	function handleBetweenFilterChange(field, index) {
		return function (e) {
			const range = localVariables[filterMode] && localVariables[filterMode][field] ? [...localVariables[filterMode][field]] : [];
			range[index] = e.target.serialized;
			const variables = {
				...localVariables,
				[filterMode]: {
					...(localVariables[filterMode] || {}),
					[field]: range,
				},
			};
			delete variables.cursor;
			delete variables.offset;
			setLocalVariables(variables);
		};
	}
	function handleFilterKeyDown(field) {
		return function (e) {
			if (e.key === "Enter") {
				navigateWithVariables(stripVariables(localVariables, filterMode));
			}
		};
	}
	function addOrderClause() {
		setOrderClauses(function (clauses) {
			return [...clauses, emptyOrderClause()];
		});
	}
	function updateOrderClause(index, key) {
		return function (e) {
			const value = e.target.value;
			setOrderClauses(function (clauses) {
				return clauses.map(function (clause, clauseIndex) {
					if (clauseIndex !== index) {
						return clause;
					}
					return {
						...clause,
						[key]: value,
					};
				});
			});
		};
	}
	function removeOrderClause(index) {
		return function () {
			setOrderClauses(function (clauses) {
				return clauses.filter(function (clause, clauseIndex) {
					return clauseIndex !== index;
				});
			});
		};
	}
	function moveOrderClause(index, direction) {
		return function () {
			const nextIndex = index + direction;
			setOrderClauses(function (clauses) {
				if (nextIndex < 0 || nextIndex >= clauses.length) {
					return clauses;
				}
				const nextClauses = [...clauses];
				const clause = nextClauses[index];
				nextClauses[index] = nextClauses[nextIndex];
				nextClauses[nextIndex] = clause;
				return nextClauses;
			});
		};
	}
	function applyOrder() {
		const nextVariables = {
			...appliedVariables,
		};
		delete nextVariables.cursor;
		delete nextVariables.offset;
		const order = cleanOrderClauses(orderClauses);
		if (order.length) {
			nextVariables.order = order;
		} else {
			delete nextVariables.order;
		}
		navigateWithVariables(nextVariables);
	}
	function renderFilterModePopover(label) {
		return (
			<Popover trigger={label} triggerClassName="button-reset athelas f6" popoverClassName={menuPopoverClass} popoverWidth="5rem">
				<div className="flex flex-column">
					<button type="button" onClick={handleFilterMode("where")}>
						Match
					</button>
					<button type="button" onClick={handleFilterMode("where_like")}>
						Search
					</button>
					<button type="button" onClick={handleFilterMode("where_between")}>
						Range
					</button>
				</div>
			</Popover>
		);
	}
	function renderValuePopover(value) {
		const content = value === undefined || value === null ? "" : String(value);
		return (
			<Popover trigger={content} triggerClassName={textTriggerClass} popoverClassName={textPopoverClass} triggerTitle={content} triggerAriaLabel={content}>
				{content}
			</Popover>
		);
	}
	function renderFilters() {
		if (filterMode === "where") {
			return (
				<tr>
					<th className={cellClass}>{renderFilterModePopover("Match")}</th>
					{header.fields.map(function (field) {
						const defaultValue = localVariables[filterMode] ? localVariables[filterMode][field.name] : undefined;
						return (
							<th key={field.name} className={cellClass}>
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
					<th className={cellClass}>{renderFilterModePopover("Search")}</th>
					{header.fields.map(function (field) {
						const defaultValue = localVariables[filterMode] ? localVariables[filterMode][field.name] : undefined;
						return (
							<th key={field.name} className={cellClass}>
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
						<th className={cellClass}>{renderFilterModePopover("Start")}</th>
						{header.fields.map(function (field) {
							const defaultValue0 = localVariables[filterMode] ? (localVariables[filterMode][field.name] ? localVariables[filterMode][field.name][0] : undefined) : undefined;
							return (
								<th key={field.name} className={cellClass}>
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
						<th className={cellClass}>{renderFilterModePopover("End")}</th>
						{header.fields.map(function (field) {
							const defaultValue1 = localVariables[filterMode] ? (localVariables[filterMode][field.name] ? localVariables[filterMode][field.name][1] : undefined) : undefined;
							return (
								<th key={field.name} className={cellClass}>
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
	function renderOrderPopover() {
		const orderCount = appliedOrderClauses.length;
		const trigger = (
			<span className="project-table-order-trigger">
				<span>{`Order: ${orderCount}`}</span>
			</span>
		);
		return (
			<Popover
				trigger={trigger}
				triggerClassName="button-reset athelas f6"
				popoverClassName={orderPopoverClass}
				popoverWidth="min(42rem, calc(100vw - 1rem))"
				triggerAriaLabel="Order settings"
			>
				<div className="project-table-order-panel">
					<div className="project-table-order-panel-header">
						<div className="project-table-order-heading">Order</div>
						<button type="button" className="project-table-order-action" onClick={addOrderClause}>
							<PlusCircledIcon />
							<span>Add</span>
						</button>
					</div>
					<div className="project-table-order-list">
						{orderClauses.length ? (
							orderClauses.map(function (clause, index) {
								return (
									<div key={index} className="project-table-order-row">
										<div className="project-table-order-index">{index + 1}</div>
										<label className="project-table-order-control">
											<span>column</span>
											<select className="project-table-order-select" value={clause.column} onChange={updateOrderClause(index, "column")}>
												<option value="">None</option>
												{header.fields.map(function (field) {
													return (
														<option key={field.name} value={field.name}>
															{field.name}
														</option>
													);
												})}
											</select>
										</label>
										<label className="project-table-order-control">
											<span>order</span>
											<select className="project-table-order-select" value={clause.order} onChange={updateOrderClause(index, "order")} disabled={!clause.column}>
												<option value="">Default</option>
												<option value="asc">asc</option>
												<option value="desc">desc</option>
											</select>
										</label>
										<label className="project-table-order-control">
											<span>nulls</span>
											<select className="project-table-order-select" value={clause.nulls} onChange={updateOrderClause(index, "nulls")} disabled={!clause.column}>
												<option value="">Default</option>
												<option value="first">first</option>
												<option value="last">last</option>
											</select>
										</label>
										<div className="project-table-order-row-actions">
											<button type="button" onClick={moveOrderClause(index, -1)} disabled={index === 0} title="Move up" aria-label="Move up">
												<ArrowUpIcon />
											</button>
											<button type="button" onClick={moveOrderClause(index, 1)} disabled={index === orderClauses.length - 1} title="Move down" aria-label="Move down">
												<ArrowDownIcon />
											</button>
											<button type="button" onClick={removeOrderClause(index)} title="Remove" aria-label="Remove">
												<TrashIcon />
											</button>
										</div>
									</div>
								);
							})
						) : (
							<div className="project-table-order-empty">No order</div>
						)}
					</div>
					<button type="button" className="project-table-order-apply" onClick={applyOrder}>
						Apply
					</button>
				</div>
			</Popover>
		);
	}
	function renderFieldHeader(field) {
		const appliedOrder = appliedOrderByColumn[field.name];
		const orderLabel = appliedOrder ? `${appliedOrder.index + 1} ${appliedOrder.order || "default"}` : "";
		const orderTitle = appliedOrder
			? `order[${appliedOrder.index}]: ${field.name}, order ${appliedOrder.order || "default"}${appliedOrder.nulls ? `, nulls ${appliedOrder.nulls}` : ""}`
			: field.name;
		const trigger = (
			<span className="project-table-field-heading">
				<span className="project-table-field-name">{field.name}</span>
				{appliedOrder ? <span className="project-table-order-badge">{orderLabel}</span> : null}
			</span>
		);
		return (
			<Popover
				trigger={trigger}
				triggerClassName="project-table-field-trigger athelas f6 clouds"
				popoverClassName={textPopoverClass}
				triggerTitle={orderTitle}
				triggerAriaLabel={field.name}
			>
				{field.name}
			</Popover>
		);
	}
	return (
		<div>
			<div className="project-table-footer">
				<div className="project-table-count">{count} rows</div>
				<CursorPagination pageInfo={pageInfo} variables={variables} href={href} reverse={false} buttonClass="project-table-cursor-button" detailsOpen={true} />
			</div>
			<table>
				<thead>
					{renderFilters()}
					<tr>
						<th className={cellClass}>{renderOrderPopover()}</th>
						{header.fields.map(function (field) {
							return (
								<th key={field.name} className={cellClass}>
									{renderFieldHeader(field)}
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
									<Link
										href={pathfinder.stateToURL(
											"project.system.headers.header.create",
											{ header: header.graphql_meta_type.toLowerCase() },
											{ variables: JSON.stringify(localVariables) },
										)}
										push={true}
									>
										<button className="athelas f6" type="button">
											Create
										</button>
									</Link>
								</td>
							);
						})}
					</tr>
					{items.map(function (item) {
						const isGauzeEntity = ["RELATIONSHIP", "WHITELIST", "BLACKLIST"].indexOf(header.graphql_meta_type) >= 0;
						const hasWhitelist = !isGauzeEntity;
						const hasBlacklist = !isGauzeEntity;
						const hasRelationships = !isGauzeEntity;
						const detail = pathfinder.stateToURL("project.system.headers.header.item", { header: header.graphql_meta_type.toLowerCase(), id: item._metadata.id }, {});
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
										<Link href={detail} push={true}>
											<button type="button">
												<Pencil2Icon />
											</button>
										</Link>
										{hasRelationships ? (
											<Popover
												trigger={<Link2Icon />}
												triggerClassName={iconTriggerClass}
												popoverClassName={menuPopoverClass}
												popoverWidth="5rem"
												triggerAriaLabel="Relationships"
											>
												<div className={"flex flex-column mw3"}>
													<Link href={toRelationships} push={true}>
														<button className="athelas f6 w3" type="button">
															To
														</button>
													</Link>
													<Link href={fromRelationships} push={true}>
														<button className="athelas f6 w3" type="button">
															From
														</button>
													</Link>
												</div>
											</Popover>
										) : null}
										{hasWhitelist ? (
											<Popover
												trigger={<BookmarkIcon />}
												triggerClassName={iconTriggerClass}
												popoverClassName={menuPopoverClass}
												popoverWidth="5rem"
												triggerAriaLabel="Whitelist actions"
											>
												<div className={"flex flex-column mw3"}>
													<Link href={whitelist("create")} push={true}>
														<button className="athelas f6 w3" type="button">
															Create
														</button>
													</Link>
													<Link href={whitelist("read")} push={true}>
														<button className="athelas f6 w3" type="button">
															Read
														</button>
													</Link>
													<Link href={whitelist("update")} push={true}>
														<button className="athelas f6 w3" type="button">
															Update
														</button>
													</Link>
													<Link href={whitelist("delete")} push={true}>
														<button className="athelas f6 w3" type="button">
															Delete
														</button>
													</Link>
													<Link href={whitelist("count")} push={true}>
														<button className="athelas f6 w3" type="button">
															Count
														</button>
													</Link>
												</div>
											</Popover>
										) : null}
										{hasBlacklist ? (
											<Popover
												trigger={<BookmarkFilledIcon />}
												triggerClassName={iconTriggerClass}
												popoverClassName={menuPopoverClass}
												popoverWidth="5rem"
												triggerAriaLabel="Blacklist actions"
											>
												<div className={"flex flex-column mw3"}>
													<Link href={blacklist("create")} push={true}>
														<button className="athelas f6 w3" type="button">
															Create
														</button>
													</Link>
													<Link href={blacklist("read")} push={true}>
														<button className="athelas f6 w3" type="button">
															Read
														</button>
													</Link>
													<Link href={blacklist("update")} push={true}>
														<button className="athelas f6 w3" type="button">
															Update
														</button>
													</Link>
													<Link href={blacklist("delete")} push={true}>
														<button className="athelas f6 w3" type="button">
															Delete
														</button>
													</Link>
													<Link href={blacklist("count")} push={true}>
														<button className="athelas f6 w3" type="button">
															Count
														</button>
													</Link>
												</div>
											</Popover>
										) : null}
									</div>
								</td>
								{header.fields.map(function (field) {
									return (
										<td key={field.name} className={cellClass}>
											{renderValuePopover(item.attributes[field.name])}
										</td>
									);
								})}
							</tr>
						);
					})}
				</tbody>
			</table>
		</div>
	);
}

export default Table;
